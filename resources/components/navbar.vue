<template>
  <div>
    <v-toolbar color="#000" dark>
      <v-toolbar-title>
        <img
          src="@/assets/logo.png"
          alt="Rocket meetup logo"
          width="110"
          height="55"
        />
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="showNavbarLinks">
        <v-btn depressed small color="#DADADA" light>Login</v-btn>
        <v-btn depressed small color="#FF0000">Criar Conta</v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    showNavbarLinks: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
