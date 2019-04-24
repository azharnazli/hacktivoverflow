<template>
  <v-responsive>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-4">Learn, Share, Build</h3>

          <span class="subheading">Each month, over 50 million developers come to Stack Overflow to learn, share their
            knowledge, and build their careers.

            Join the world’s largest developer community.</span>

          <v-divider class="my-3"></v-divider>

          <div class="title mb-3">Hacktiv Overflow Business Solutions: Looking to understand, engage, or hire
            developers?</div>

          <v-btn to="/questions" class="mx-0" color="black--text" large>
            See more
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
</template>

<script>
  export default {
    components: {}
  }
</script>
<style scoped>
  .v-responsive{
    margin-top: 100px;
  }
</style>
