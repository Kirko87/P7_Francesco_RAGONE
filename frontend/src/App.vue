<script setup>
import { RouterLink, RouterView } from "vue-router";
import Welcome from "@/components/Welcome.vue";
</script>

<template>
  <header>
    
    <img
      alt="Gruppomania logo"
      class="logo"
    src="@/assets/icon-left-font.svg"
      width="100"
      height="100"
    />
     <Welcome msg="Welcome!"/> 

  </header>

  <RouterView /> <!--carica gli input login, ovvero LogInview.vue-->
</template>

