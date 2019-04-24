<template>
  <div class="my-5">
    <v-layout row wrap>
      <v-flex xs2>
        
      </v-flex>
      <v-flex xs8>
        <QuestionCard style="padding: 20px;" v-for="question in questions" :data="question" :key="question.id" />
      </v-flex>
      <v-flex xs2>
        <JobCard 
        />
      </v-flex>
    </v-layout>
    <router-view>
    </router-view>
  </div>
</template>
<script>
  import QuestionCard from '../components/QuestionCard.vue'
  import JobCard from '../components/JobCard.vue'
import { mapState } from 'vuex';

  export default {
    components: {
      QuestionCard,
      JobCard,      

    },
    data() {
      return {
        news: ''
      }
    },
    methods: {
      
      
    },
    created() {
      this.$store.dispatch('getAllQuestion')
    
    },
    computed: mapState(['questions'])
  }
</script>
<style scoped>

</style>