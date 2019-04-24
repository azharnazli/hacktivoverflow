<template>
  <v-toolbar color="black">
    <v-btn small color="white" to="/" >
      <v-toolbar-title  class="grey--text">Hacktiv<span class="black--text font-weight-bold" >Overflow</span></v-toolbar-title>
    </v-btn>
    <v-btn small dark color="primary"
    to="/quesform" >
      ask question
    </v-btn>
    <v-btn small dark color="primary"
    v-if="isLogin"
    to="/questions" >
      Questions
    </v-btn>
    <v-spacer></v-spacer>

    <v-btn v-if="!isLogin" to="/login" class="primary">
      login
    </v-btn>
     <v-btn v-if="!isLogin" to="/signup" class="primary" >
      SignUp
    </v-btn>
     <v-btn v-if="isLogin"
    to="/" class="primary"
    @click="logout"
    >
      Logout
    </v-btn>
  </v-toolbar>
</template>
<script>

import {mapState} from 'vuex'

export default {
  data() {
    return {
      
    }
  } , 
  methods : {
    checkLogin() {
      if(localStorage.getItem('token')) {
        this.axios({
          'url' : 'users/verify',
          method: 'POST',
          data : {
            token : localStorage.getItem('token')
          }
        })
        .then((verified)=> {
          if(verified) {
            this.$store.commit('login')
          }
        })
        .catch(err => {
          console.log(err)
          localStorage.clear()
        })
      }
    },
    logout() {
      localStorage.clear()
      this.$store.commit('logout')
    }
  },
  created() {
    this.checkLogin()
  },
  computed: mapState(['isLogin']),
  
}
</script>