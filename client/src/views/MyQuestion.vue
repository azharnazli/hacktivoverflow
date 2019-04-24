<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div class="kartu">
        <v-card>

          <v-card-title primary-title style="border: 1px solid grey;">
            <div>
              <h6 class="headline mb-0">Author: {{myData.owner.username}}</h6>
              <h1 style="margin-top: 10px;"> {{ myData.title }} </h1>
              <p style="margin-top: 10px;"> {{ myData.question }} </p>
            </div>
          </v-card-title>
          <v-btn flat color="orange" @click="voteUp">upvote</v-btn>
          <v-btn flat color="orange" @click="voteDown">down vote</v-btn>
          <v-btn right flat :to="'/answer/' + myData._id" color="orange">answer</v-btn>
          <v-btn right flat color="orange" v-if="myQuestion" :to="'/editform/' +myData._id">Edit</v-btn>
          <div>
            <v-card-title primary-title v-for="(ans, index) in myData.answer" :key="index"
              style="border: 1px solid grey; padding: 2px;margin-top: 5px;">
              <v-card-text class="headline mb-0">Author: {{ans.owner.username}}</v-card-text>
              <v-card-text class="headline mb-0">{{ans.answer}}</v-card-text>
              <v-btn right flat color="orange" v-if="ans.owner.email ==  email" :to="'/editans/' + $route.params.id + '/' + ans._id  ">Edit
              </v-btn>
              <v-btn flat color="orange" @click="ansVoteUp(ans._id)">upvote</v-btn>
              <v-spacer></v-spacer>
              <v-btn flat color="orange" @click="ansVoteDown(ans._id)">down vote</v-btn>
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
        email: ''
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
          this.myData = data
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
          console.log(data)
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
          console.log(data)
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
          console.log(data)
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
          console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
    },
    created() {
      this.fetchQuestion()
      this.email = localStorage.getItem('email')
    },
    watch: {
      myData(val) {
        if (this.myData.owner.email === localStorage.getItem('email')) {
          this.myQuestion = true
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