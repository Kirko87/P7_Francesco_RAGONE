<template>
  <img alt="Gruppomania logo" class="logoSign" src="@/assets/icon-left-font-monochrome-black.svg" width="200"
    height="40" background="transparent" />

  <h1 class="signIn_title">SignIn-now!</h1>

  <div class="transparentBox">

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
        <label for="email" class="SignInView_re-email" :data-error="emailError">Email (validation):<input required
            class="SignInView_re-email_input" v-model="reEnterEmail" type="email"
            placeholder="Ressaisir votre email" /><div class="SignInView_re-email_error">email validation error</div></label>
        <br>
        <label for="password" class="SignInView_password">Password:<input required class="SignInView_password_input"
            v-model="password" type="password" placeholder="Introduisez votre mot de passe" /></label>
        <br>
        <label for="password" class="SignInView_re-password" :data-error="passwordError">Password (validation):<input required
            class="SignInView_re-password_input" v-model="reEnterPassword" type="password"
            placeholder="Ressaisir votre mot de passe" /><div class="SignInView_re-password_error">password validation error</div></label>

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
      reEnterEmail:null,
      password: null,
      reEnterPassword: null,
      emailError: false,
      passwordError: false
    }
  },
  methods: {
    async signIn(event) {
      event.preventDefault()
      try {

       let errorCheck = false ;
       this.emailError= false;
       this.passwordError = false;
      
       if (this.reEnterEmail !== this.email){
         errorCheck = true;
         this.emailError = true;
        }

      if(this.reEnterPassword !== this.password){
        
        errorCheck = true;
        this.passwordError = true;
      }
      if (errorCheck==true){return}
        const responseSignUp = await fetch("http://localhost:3010/Groupomania/signup", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: this.userName, name: this.name,
            surname: this.surname, email: this.email, password: this.password
          }
          )
        })
        if (responseSignUp.status !== 201) throw ("error")

        const dataSignUp = await responseSignUp.json()

        //CONDIZIONE per accesso a Main page
        console.log(dataSignUp)
        setToken(dataSignUp.token)
        this.$router.push({
          name: 'main'
        })
      } catch (error) {
        alert("error de connection" )
        console.log(error);
      } 
     
//      try{
//       if (this.email !== this.re_email) throw ("error2")
//      }catch(error2){
//         alert("error mail")
//         console.log(error2);
//         return
//      }
// try{
//       if (this.password !== this.re_password) throw ("error3")
//      }catch(error3){
//         alert("error password")
//         console.log(error3);
//         return
//      }
    }

  }
}


//REGISTRO TOKEN in Local Storage
async function setToken(token) {

  localStorage.setItem("token", token);
}



</script>

<style lang="scss">
.transparentBox>div {
  background-color: #c2f4f065;
  border: 4px dotted black;
  opacity: .6;
  padding: 30px;
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
    &_error {
      display: none;
    }
    &_input {
      justify-self: center;
      margin: 20px;
      width: 100%;
      height: 26px;
    }
    $parent:&;
    &[data-error=true]{
      #{$parent}{
        &_error{
          display: block;
          color: red;
          
          }
        &_input{
          border:1px solid red;
        }
      }
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
    font-size: 2rem;
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

@media (min-width: 768px) {

  .SignInView {

    &_userName,
    &_name,
    &_surname,
    &_email,
    &_re-email,
    &_password,
    &_re-password {
      grid-template-columns: 1fr 2fr 1fr;
      align-items: center;
    }

  }
}
</style>