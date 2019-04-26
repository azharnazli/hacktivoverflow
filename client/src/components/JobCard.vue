<template>
  <v-container >
    <v-layout wrap>
      <v-card style="width: 420px;">
        <v-card-title>
          <h1 style="margin: 0 auto;">NEWS</h1>
        </v-card-title>
        <div class="content">
          <div class="inner">
            <v-card-text>
              <div style="margin-left: 85px;" >
                <img v-if="loading" src="../assets/loading2.gif" alt="">
              </div>
                <a  class="text--white" style="text-decoration: none;" :href="news.url">
                  <p v-if="!loading" style="text-decoration: none; color: white;">{{ news.description }}</p>
                </a>
            </v-card-text>
          </div>
        </div>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        socket: io('http://localhost:3000'),
        news: {
          description: '',
          url: ''
        },
        loading: true
      }
    },
    created() {
      this.socket.on('news', data => {
        this.news.description = data.description
        this.news.url = data.url
        if(this.news != '') {
          this.loading = false
        }
      })

    }
  }
</script>

<style scoped>
  .content {
    background: #eaeaea;

  }

  .inner {
    background: gray;
    margin: 10px;
  }
</style>