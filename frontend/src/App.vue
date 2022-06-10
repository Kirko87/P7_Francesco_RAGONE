<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView></RouterView>         
  <!-- <RouterLink></RouterLink> creava un errore "in" "path" -->
  <!--carica gli input login, ovvero LogInview.vue-->
</template>

<style>
body {
  top:0;
  position: relative;
  background-image: url(.\assets\meeting.png);
  background-repeat: no-repeat;
  background-color: rgb(151, 157, 157);
  background-attachment:fixed;
  background-size: cover;
  
}

/* TABLET */
@media (min-width: 768px) and (max-width: 991px) {}

/* DESKTOP */
@media (min-width: 992px) {}
</style>
