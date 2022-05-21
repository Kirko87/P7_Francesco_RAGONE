<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView />
  <RouterLink></RouterLink>
  <!--carica gli input login, ovvero LogInview.vue-->
</template>

<style>
html {
  padding: 5%;
  
}

body {
  top:0;
  position: relative;
  background-image: url(.\assets\meeting.png);
  background-color: rgb(151, 157, 157);
  background-attachment:fixed;
  
}

/* TABLET */
@media (min-width: 768px) and (max-width: 991px) {}

/* DESKTOP */
@media (min-width: 992px) {}
</style>
