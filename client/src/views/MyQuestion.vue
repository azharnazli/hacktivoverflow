<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div class="kartu">
        <v-card>

          <v-card-title primary-title style="border: 1px solid grey;">
            <div>
              <v-layout wrap col >
                <v-flex xs2>
                  rep:
                </v-flex>
                <v-flex xs4>
              <h1 class="" v-if="ready" >{{myData.voteUp.length - myData.voteDown.length}}</h1>
                </v-flex>
                <v-flex xs5>
              <h6 class="headline mb-0" style="display: inline" >Author: {{myData.owner.username}}</h6>
                </v-flex>
              </v-layout>
              <h1 style="margin-top: 10px;"> {{ myData.title }} </h1>
              <p style="margin-top: 10px;"> {{ myData.question }} </p>
            </div>
          </v-card-title>
          <v-btn flat v-if="!myQuestion" color="orange" @click="voteUp">upvote</v-btn>
          <v-btn flat v-if="!myQuestion" color="orange" @click="voteDown">down vote</v-btn>
          <v-btn right flat :to="'/answer/' + myData._id" color="orange">answer</v-btn>
          <v-btn right flat color="orange" v-if="myQuestion  && deleted" :to="'/editform/' +myData._id">Edit</v-btn>
          <v-btn right flat color="orange" v-if="myQuestion" @click="deleteMyQuestion(`${myData._id}`)" >DELETE</v-btn>
          <v-spacer></v-spacer>
          <div>
            <v-card-title primary-title v-for="(ans, index) in myData.answer" :key="index"
              style="border: 1px solid grey; padding: 2px;margin-top: 5px;">
              <v-card-text class="headline mb-0">Author: {{ans.owner.username}}</v-card-text>
              <v-card-text class="headline mb-0">{{ans.answer}}</v-card-text>
              <v-btn right flat color="orange" v-if="ans.owner.email ==  email" :to="'/editans/' + $route.params.id + '/' + ans._id  ">Edit
              </v-btn>
              <v-btn right flat color="orange" v-if="ans.owner.email ==  email" @click="deleteAns(`${ans._id}`)">Delete
              </v-btn>
              <v-btn flat v-if="!myQuestion" color="orange" @click="ansVoteUp(ans._id)">upvote</v-btn>
              <v-spacer></v-spacer>
              <v-btn flat v-if="!myQuestion" color="orange" @click="ansVoteDown(ans._id)">down vote</v-btn>
            </v-card-title>
          </div>

          <v-card-actions>
          </v-card-actions>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        answer: '',
        myData: {
          username: '',
          owner: {},
          answer: [{
            owner: {
              username: ''
            }
          }]
        },
        myQuestion: false,
        email: '',
        deleted: true,
        ready: false
      }
    },
    methods: {
      async fetchQuestion() {

        try {
          let { data } = await this.axios({
            method: 'GET',
            url: 'questions/' + this.$route.params.id,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          this.myData = await data
        } catch (error) {
          console.log(error)
        }

      },
      async deleteAns(id)  {
        try {
          let { data } = await this.axios({
            url: 'answers/'+id,
            method: 'delete',
            headers: {
              token: localStorage.getItem('token')
            }
          })
          this.fetchQuestion()
        } catch (error) {
          console.log(error)
        }
      },
      async voteUp() {
        try {
          let { data } = await this.axios({
            method: 'patch',
            url: 'questions/up/' + this.$route.params.id,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          this.fetchQuestion()
        } catch (error) {
          console.log(error.response)
        }
      },
      async voteDown() {
        try {
          let { data } = await this.axios({
            method: 'patch',
            url: 'questions/down/' + this.$route.params.id,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          this.fetchQuestion()
        } catch (error) {
          console.log(error)
        }
      },
      async ansVoteUp(id) {
        try {
          let { data } = await this.axios({
            method: 'patch',
            url: 'answers/up/' + id,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          this.fetchQuestion()
        } catch (error) {
          console.log(error)
        }
      },
      async ansVoteDown(id) {
        try {
          let { data } = await this.axios({
            method: 'patch',
            url: 'answers/down/' + id,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          this.fetchQuestion()
        } catch (error) {
          console.log(error)
        }
      },
      async deleteMyQuestion(id) {
       let result = await this.swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        if(result.value)  {
          try {
            let{ data } = await this.axios({
              method: 'delete',
              url: 'questions/' + id,
              headers: {
                token: localStorage.getItem('token')
              }
            })
              this.$router.replace('/questions')
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    created() {
      this.fetchQuestion()
      .then(()=> {
        this.ready = true
      })
      this.email = localStorage.getItem('email')
    },
    watch: {
      myData(val) {
        if (this.myData.owner.email === localStorage.getItem('email')) {
          this.myQuestion = true
        }
        if(this.myData.answer.length > 0) {
          this.deleted = false
        }
        this.myData.answer.forEach(el => {
          if (el.owner.email == localStorage.getItem('email')) {
            this.myAnswer = true
          }
        })
      }
    }

  };
</script>

<style scoped>
  .kartu {
    margin-top: 50px;
  }

  .v-card {
    width: 100%;
    margin: 0 auto;
  }
</style>