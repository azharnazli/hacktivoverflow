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
          <v-btn @click="clearForm" light color="red"> clear </v-btn>
        </v-flex>
        <v-flex xs4 offset-xs2>
          <v-btn light color="green"
          v-on:click="createQuestion"
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
      createQuestion() {
        this.axios({
          url: 'questions',
          method: 'POST',
          data : {
            title : this.title,
            question : this.question,
          },
          headers : {
            token : localStorage.getItem('token')
          }
        })
          .then((question)=> {
            this.$router.replace('/questions')
          })
          .catch(err => {
            console.log(err)
          })
      },
      clearForm() {
        this.title = ''
        this.question = ''
      }
    }

  }
</script>
<style scoped>

</style>