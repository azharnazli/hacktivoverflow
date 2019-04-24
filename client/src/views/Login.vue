<template>
  <v-container>
    <h1 class="primary--text">Login</h1>
    <v-form ref="form" lazy-validation>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field type="password" v-model="password" label="password" required></v-text-field>

      <div style="display: flex;justify-content: space-between">
        <v-btn left color="primary" medium @click="login">
          sumbit
        </v-btn>


        <v-btn right color="warning" medium @click="reset">
          Reset Form
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        password: '',
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
      }
    },

    methods: {
      login() {
        this.axios({
            method: 'POST',
            'url': 'users/login',
            data: {
              email: this.email,
              password: this.password
            }
          })
          .then(({data}) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('email', data.email)
            localStorage.setItem('username', data.username)
            this.$store.commit('login')
            this.$store.dispatch('getAllQuestion')
            this.$router.replace('/questions')
          })
          .catch(err => {
            console.log(err.response)
          })

      },
      reset() {
        this.$refs.form.reset()
      }
    },
  }
</script>
<style scoped>
  .container {
    max-width: 420px;
    margin-top: 90px;
    border: 1px solid grey;
    border-radius: 6px;
  }
</style>