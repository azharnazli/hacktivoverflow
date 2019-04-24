<template>
  <v-container>
    <v-form>
      <div>
        <v-container class="container">
          <v-text-field label="answer" textarea rows="15" auto-grow counter=4000 v-model="answer"></v-text-field>
        </v-container>
      </div>
      <v-layout row wrap>
        <v-flex xs4 offset-xs2>
          <v-btn light color="red"> clear </v-btn>
        </v-flex>
        <v-flex xs4 offset-xs2>
          <v-btn light color="green" v-on:click="createAnswer"> submit </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        answer: ''
      }
    },
    methods: {
      createAnswer() {
        this.axios({
            url: 'answers/'+  this.$route.params.id,
            method: 'POST',
            data: {
              answer: this.answer,
            },
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((question) => {
            this.$router.push('/myquestion/'+ this.$route.params.id)
            console.log(question)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>
<style scoped>

</style>