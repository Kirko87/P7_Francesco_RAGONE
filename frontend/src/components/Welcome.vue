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
      <router-link id="sigIn" to="/signUp">Sign-up</router-link>
      <router-link id="logIn" to="/login">Login</router-link>
    </div>

  </div>
</template>

<style scoped>



h1 {
  font-weight: 500;
  font-size: 2.6rem;
  color:rgb(19, 17, 17);
  text-shadow: 1px 1px 7px rgba(255, 53, 53, 0.441);
}

h3 {
  font-size: 1.6rem;
  color:rgb(15, 12, 12);
  
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

#logSig{
    display: flex;
    justify-content: space-around;
    margin-bottom:3em
}

#sigIn, #logIn {
  display: flex;
  align-items:center;
  text-decoration: none;
  color: white;
   text-shadow: 1px 1px 7px rgb(0, 0, 0);
  font-weight: bold;
  font-size: 30px;

}
 
#sigIn:hover,#logIn:hover {
  color:rgb(246, 201, 209);
  text-shadow: 1px 1px 7px rgb(59, 59, 59);
} 
</style>


