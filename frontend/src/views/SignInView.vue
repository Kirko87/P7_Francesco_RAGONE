<template>
  <h1 class="signIn_title">SignIn-now!</h1>
  <div class="signIn">
    <router-link class="signIn_sigInLink" to="/signUp">Sign-up</router-link>
    <router-link class="signIn_logInLink" to="/login">Login</router-link>
  </div>
  <form class="SignInView" @submit="signIn">
    <label for="userName" class="SignInView_userName">User Name:<input required v-model="userName" type="text"
        placeholder="Insérer votre nom d’utilisateur" /></label>
    <br>
    <label for="name" class="SignInView_name"> Name:<input required v-model="name" type="text"
        placeholder="Insérer votre prénom" /></label>
    <br>
    <label for="surame" class="SignInView_surname">Surname:<input required v-model="surname" type="text"
        placeholder="Insérer votre nom de famille" /></label>
    <br>
    <label for="email" class="SignInView_email">Email:<input required v-model="email" type="email"
        placeholder="Insérer votre email" /></label>
    <br>
    <label for="email" class="SignInView_re-email"> Re-enter Email:<input required v-model="reEnterEmail" type="email"
        placeholder="Ressaisir votre email" /></label>
    <br>
    <label for="password" class="SignInView_password">Password:<input required v-model="password" type="password"
        placeholder="Introduisez votre mot de passe" /></label>
    <br>
    <label for="password" class="SignInView_re-password">Re-enter Password:<input required v-model="reEnterPassword"
        type="password" placeholder="Ressaisir votre mot de passe" /></label>

    <div class="SignInView_button"><button type="submit">VALIDATE!</button></div>
  </form>


</template>

<script>
export default {
  data() {
    return {
      userName: null,
      name: null,
      surname: null,
      email: null,
      reEnterEmail: null,
      password: null,
      reEnterPassword: null,
    }
  },
  methods: {
    signIn(event) {
      event.preventDefault()
      fetch("http://localhost:3010/Groupomania/signup", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: this.userName, name: this.name, surname: this.surname, email: this.email, reEnterEmail: this.reEnterEmail, password: this.password, reEnterPassword: this.reEnterPassword })
      })
    },
  }
}

</script>

<style lang="scss">
.SignInView {

  &_userName,
  &_name,
  &_surname,
  &_email,
  &_re-email,
  &_password,
  &_re-password {
    display: flex;
    align-items: center;
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

.signIn {
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


  &_logInLink:hover {
    color: rgb(0, 0, 0);
    text-shadow: 7px 1px 14px rgb(59, 59, 59);
  }

  &_sigInLink {
    pointer-events: none;
    color: rgba(251, 37, 37, 0);
  }
}
</style>