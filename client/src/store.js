import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false,
    questions: [],
    drawer : null

  },
  mutations: {
    login(state) {
      state.isLogin =   true 
    },
    logout(state) {
      state.isLogin = false
    },
    addQuestion(state, payload) {
      state.questions = payload
    },
    showBar(state) {
      state.drawer = !state.drawer
    }

  },
  actions: {
    getAllQuestion({commit}) {
      axios({
        url : '/questions',
        method: 'GET',
        headers : {
          token : localStorage.getItem('token')
        }
      })
        .then(({data}) => {
         commit('addQuestion', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    
  }
})
