<template>
  <v-container>
    <v-form>
      <div>
        </v-text-field>
        <v-container class="container">
          <v-text-field label="question" textarea rows="15" auto-grow counter=4000 v-model="answer"></v-text-field>
        </v-container>
      </div>
      <v-layout row wrap>
        <v-flex xs4 offset-xs2>
          <v-btn light color="red"> clear </v-btn>
        </v-flex>
        <v-flex xs4 offset-xs2>
          <v-btn light color="green" v-on:click="editanswer"> submit </v-btn>
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
      editanswer() {
        this.axios({
            url: 'answers/' + this.$route.params.ansid,
            method: 'PUT',
            data: {
              title: this.title,
              answer: this.answer,
            },
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((question) => {
            this.$router.push('/myquestion/' + this.$route.params.id)
          })
          .catch(err => {
            console.log(err)
          })
      },
      async fetchMyAnsw() {
        try {
          let { data } = await this.axios({
            method: 'GET',
            url: '/answers/' + this.$route.params.ansid,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          this.answer = data.answer
        } catch (error) {
          console.log(error)
        }
      }
    },
    created() {
      this.fetchMyAnsw()
    }
  }
</script>
<style scoped>

</style>