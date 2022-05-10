<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})


</script>

<template>
  <div class="greetings">
    <h1 class="">{{ msg }}</h1>
    <h3>
      Welcome in Groupomania livechat!
    </h3>

    <div id="logSig">
      <div class="button"><router-link id="sigIn" to="/signUp">Sign-up</router-link></div>
     <div class="button"><router-link id="logIn" to="/login">Login</router-link></div>
    </div>

  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

#logSig{
    display: flex;
    justify-content: center;
    gap:50px
}
#sigIn, #logIn {
  display: flex;
  align-items:center;
  text-decoration: none;
  color: black
}

.button {
  display:flex;
  align-items:center;
  justify-content: center;
  border: 2px solid black;
  border-radius:30px;
  width:70px;
  height:40px

}

</style>


