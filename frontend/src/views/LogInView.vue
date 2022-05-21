<template>
  <img alt="Gruppomania logo" class="logoLog" src="@/assets/icon-left-font-monochrome-black.svg" width="200" height="40"
    background="transparent" />

  <h1 class="logIn_title">LogIn-now!</h1>

  <div class="transparentBoxLogin">

    <div>
      <div class="logIn">

        <router-link class="logIn_sigInLink" to="/signUp">Sign-up</router-link>
        <router-link class="logIn_logInLink" to="/login">Login</router-link>
      </div>

      <form class="LogInView" @submit="login">
        <label for="userName" class="LogInView_userName">User Name:<input required class="LogInView_userName_input"
            v-model="userName" type="text" placeholder="Votre nom d’utilisateur" /></label>
        <br>
        <label for="password" class="LogInView_password">Password:<input required class="LogInView_password_input"
            v-model="password" type="password" placeholder=" Votre mot de passe" /></label>
        <div class="LogInView_button"><button type="submit">VALIDATE!</button></div>

      </form>
    </div>
  </div>
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
body {
  margin: 10%;
  height: 1000PX;
  width: auto;
}

.transparentBoxLogin>div {
  background-color: #f4ad4939;
  border: 4px dotted black;
  opacity: .6;
  padding: 30px;
}

.transparentBoxLogin div {
  opacity: 1;
}

.LogInView {

  &_userName,
  &_password {
    display: grid;
    justify-content: center;
    color: rgb(255, 255, 255);
    font-size: 1.5rem;
    text-shadow: 4px 3px 4px rgb(0, 0, 0);

    &_input {
      justify-self: center;
      margin: 20px;
      width: 100%;
      height: 26px;
    }
  }

  &_button {
    display: flex;
    justify-content: center;
    margin-top: 70px;
    margin-bottom: 70px;
  }
}

.logIn {
  display: flex;
  justify-content: space-around;
  margin-bottom: 3em;

  &_title {
    text-align: center;
    font-size: 3.5rem;
    text-shadow: 1px 1px 7px rgb(244, 173, 73);
    color: rgb(0, 0, 0);
    margin-bottom: 5rem;
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
    left: 0;
    color: rgb(0, 0, 0);
    text-shadow: 7px 1px 14px rgb(59, 59, 59);

  }

  &_logInLink {
    pointer-events: none;
    color: rgba(251, 37, 37, 0);

  }
}
</style>