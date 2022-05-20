<template>
  <img alt="Gruppomania logo" class="logoSign" src="@/assets/icon-left-font-monochrome-black.svg" width="200"
    height="40" background="transparent" />
  <div class="transparentBox">

    <h1 class="signIn_title">SignIn-now!</h1>
    <div>
      <div class="signIn">
        <router-link class="signIn_sigInLink" to="/signUp">Sign-up</router-link>
        <router-link class="signIn_logInLink" to="/login">Login</router-link>
      </div>
      <form class="SignInView" @submit="signIn">
        <label for="userName" class="SignInView_userName">User Name:<input required class="SignInView_userName_input"
            v-model="userName" type="text" placeholder="Insérer votre nom d’utilisateur" /></label>
        <br>
        <label for="name" class="SignInView_name"> Name:<input required class="SignInView_name_input" v-model="name"
            type="text" placeholder="Insérer votre prénom" /></label>
        <br>
        <label for="surame" class="SignInView_surname">Surname:<input required class="SignInView_surname_input"
            v-model="surname" type="text" placeholder="Insérer votre nom de famille" /></label>
        <br>
        <label for="email" class="SignInView_email">Email:<input required class="SignInView_email_input" v-model="email"
            type="email" placeholder="Insérer votre email" /></label>
        <br>
        <label for="email" class="SignInView_re-email">Email (val.):<input required class="SignInView_re-email_input"
            v-model="reEnterEmail" type="email" placeholder="Ressaisir votre email" /></label>
        <br>
        <label for="password" class="SignInView_password">Password:<input required class="SignInView_password_input"
            v-model="password" type="password" placeholder="Introduisez votre mot de passe" /></label>
        <br>
        <label for="password" class="SignInView_re-password">Password (val.):<input required
            class="SignInView_re-password_input" v-model="reEnterPassword" type="password"
            placeholder="Ressaisir votre mot de passe" /></label>

        <div class="SignInView_button"><button type="submit">VALIDATE!</button></div>
      </form>
    </div>
  </div>
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
.transparentBox>div {
  background-color: #c2f4f065;
  border: 4px dotted black;
  opacity: .6;

}

.transparentBox div {
  opacity: 1;
}

.SignInView {

  &_userName,
  &_name,
  &_surname,
  &_email,
  &_re-email,
  &_password,
  &_re-password {
    display: grid;
    justify-content: center;
    color: rgb(255, 255, 255);
    font-size: 1.5rem;
    text-shadow: 4px 3px 4px rgb(0, 0, 0);

    &_input {
      justify-self: center;
      margin: 20px;
      width: 100%;
    }
  }

  &_button {
    display: flex;
    justify-content: center;
    margin-top: 70px;
    margin-bottom: 70px;
  }
}

.signIn {
  display: flex;
  justify-content: space-around;
  margin-bottom: 3em;

  &_title {
    text-align: center;
    font-size: 3.5rem;
    text-shadow: 1px 1px 7px rgb(194, 244, 240);
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