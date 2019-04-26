<template>
  <v-app>
    <Toolbar
    @searchData="searchData"/>
    <v-content>
    <router-view
    :search="search">
    </router-view>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Toolbar,
    Footer,
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    searchData(text) {
      this.search = text
    }
  }
}
</script>
