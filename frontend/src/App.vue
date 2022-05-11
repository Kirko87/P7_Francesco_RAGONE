<script setup>
import { RouterLink, RouterView } from "vue-router";
import Welcome from "@/components/Welcome.vue";

</script>

<template>


  <header>
    <img alt="Gruppomania logo" class="logo" src="@/assets/icon-left-font-monochrome-black.svg" width="200" height="200"
      background="transparent" />
    <Welcome msg="Welcome!" />

  </header>

  <RouterView />
  <!--carica gli input login, ovvero LogInview.vue-->
  <div id="buttonContainer"><button id="button_div">VALIDATE!</button></div>

</template>

<style>
 .logo {

 }

 body {

   background-image: url(.\assets\icon.png);
   background-repeat: no-repeat;
   background-size: cover;
 }
#buttonContainer {
  display:flex;
   justify-content: center;
}

#button_div {
  margin:5px;
  user-select:none;
}

</style>
