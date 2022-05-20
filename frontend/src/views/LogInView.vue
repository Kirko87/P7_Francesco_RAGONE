<template>
  <h1 class="logIn_title">LogIn-now!</h1>
  <div class="logIn">

    <router-link class="logIn_sigInLink" to="/signUp">Sign-up</router-link>
    <router-link class="logIn_logInLink" to="/login">Login</router-link>
  </div>

  <form class="LogInView" @submit="login">
    <label for="userName" class="LogInView_userName">User Name:<input required v-model="userName" type="text"
        placeholder="Votre nom d’utilisateur" /></label>
    <br>
    <label for="password" class="LogInView_password">Password:<input required v-model="password" type="password"
        placeholder=" Votre mot de passe" /></label>
    <div class="LogInView_button"><button type="submit">VALIDATE!</button></div>
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

  &_userName,
  &_password {
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

.logIn {
  display: flex;
  justify-content: space-around;
  margin-bottom: 3em;

  &_title {
    text-align: center;
    font-size: 3rem;
    text-shadow: 2px 2px 7px rgb(244, 81, 81);
    color: rgb(241, 245, 249);
    margin-bottom: 50px;
  }

  &_sigInLink,
  &_logInLink {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    text-shadow: 1px 1px 7px rgb(0, 0, 0);
    font-weight: bold;
    font-size: 30px;

  }

  &_sigInLink:hover {
    color: rgb(0, 0, 0);
    text-shadow: 7px 1px 14px rgb(59, 59, 59);
  }

  &_logInLink {
    pointer-events: none;
    color: rgba(251, 37, 37, 0);

  }
}
</style>