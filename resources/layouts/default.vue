<template>
  <v-app>
    <Navbar :show-navbar-links="true" />
    <nuxt />
    <v-footer :relative="true" color="#FF0000" height="100" dark>
      <v-spacer></v-spacer>
      <v-col class="text-center" cols="12">
        &copy;Kill meetup
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from '@/components/navbar'
export default {
  components: { Navbar }
}
</script>

<style>
html {
  background-color: #8f8f8f;
}
.text-center {
  text-align: center !important;
}
</style>
