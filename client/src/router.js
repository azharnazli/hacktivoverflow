import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'
import Questions from './views/Questions.vue'
import MyQuestion from './views/MyQuestion.vue'
import QuesForm from './views/QuesForm.vue'
import AnsForm from './views/AnsForm.vue'
import EditForm from './views/EditForm.vue'
import EditAns from './views/EditAns.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/editans/:id/:ansid',
      name: EditAns,
      component: EditAns,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/questions',
      name: 'Questions',
      component: Questions,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/myquestion/:id',
      name: MyQuestion,
      component: MyQuestion,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/quesform',
      name: QuesForm,
      component: QuesForm,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/answer/:id',
      name: 'AnsForm',
      component: AnsForm,
      meta: {
        requiredAuth: true
      }
    }, {
      path: '/editform/:id',
      name: EditForm,
      component: EditForm,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next)=> {
  if(to.matched.some(record => record.meta.requiredAuth)){
    if(!localStorage.getItem('token')) {
      next({
        path:  '/login'
      })
    } else {
      next()
    }
  }else {
    next()
  }
})

export default router