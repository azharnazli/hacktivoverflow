<template>
  <div>
    <div style="margin-top:11px" class="left">
      <v-btn icon class>
        <v-icon>

        </v-icon>
      </v-btn>
      <p class="text-sm-center display-1" >{{data.voteUp.length - data.voteDown.length}}</p>
      <v-btn icon>
        <v-icon>

        </v-icon>
      </v-btn>
    </div>
    <div style="margin-top:35px" >
      <div>
        <h4>Author:  {{data.owner.username}}</h4>
        <v-btn :to="'myquestion/'+data._id" flat depressed style="margin-left: -20px;" class="display-1 ">{{ data.title }} </v-btn >
      </div>
      <div>
        <p class="subheading" >{{ data.question}} </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['data']
  }
</script>
<style scoped>

</style>