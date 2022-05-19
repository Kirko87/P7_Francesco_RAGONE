<template>

  <form class="LogInView" @submit="login">
    <label for="userName" class="LogInView_userName">User Name:<input required v-model="userName" type="text"
        placeholder="Votre nom d’utilisateur" /></label>
    <br>
    <label for="password" class="LogInView_password">Password:<input required v-model="password" type="password"
        placeholder=" Votre mot de passe" /></label>
    <div class="LogInView_button"><button  type="submit">VALIDATE!</button></div>
  </form>

</template>

<script>
export default {
  data() {
    return {
      userName: null,
      password: null
    }
  },
  methods: {
    login(event) {
      event.preventDefault()
      fetch("http://localhost:3010/Groupomania/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.userName, password: this.password })
      })
    },
  }
}

</script>

<style lang="scss">

.LogInView {

  &_userName, &_password {
    display: flex;
    justify-content: center;
    color: rgb(65, 59, 59);
    font-size: 23px;
    margin-bottom: 5px;
    text-shadow: 1px 1px 9px rgb(140, 140, 140);
  }

  &_button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
 }
}
</style>