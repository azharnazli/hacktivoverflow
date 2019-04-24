<template>
  <v-container>
    <v-form>
      <div>
        <v-text-field v-model="title" label="title" required>
        </v-text-field>
        <v-container class="container">
          <v-text-field label="question" textarea rows="15" auto-grow counter=4000 v-model="question"></v-text-field>
        </v-container>
      </div>
      <v-layout row wrap>
        <v-flex xs4 offset-xs2>
          <v-btn light color="red"> clear </v-btn>
        </v-flex>
        <v-flex xs4 offset-xs2>
          <v-btn light color="green"
          v-on:click="editQuestion"
          > submit </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        title: '',
        question: ''
      }
    },
    methods: {
      editQuestion() {
        this.axios({
          url: 'questions/'+ this.$route.params.id,
          method: 'PUT',
          data : {
            title : this.title,
            question : this.question,
          },
          headers : {
            token : localStorage.getItem('token')
          }
        })
          .then((question)=> {
            this.$router.push('/myquestion/' + this.$route.params.id)
          })
          .catch(err => {
            console.log(err)
          })
      },
      async fetchMyQuest() {
        try {
          let { data } = await this.axios({
            method: 'GET',
            url: '/questions/' + this.$route.params.id,
            headers: {
              token : localStorage.getItem('token')
            }
          })
          this.title = data.title
          this.question = data.question
        } catch (error) {
          console.log(error)
        }
      }
    },
    created() {
      this.fetchMyQuest()
    }
  }
</script>
<style scoped>

</style>