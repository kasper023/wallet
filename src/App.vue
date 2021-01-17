<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-container>
        <router-link class="link" to="/">Wallets</router-link>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
}
</script>

<style scoped>
.link {
  color: #fff;
  text-decoration: none;
}
</style>
