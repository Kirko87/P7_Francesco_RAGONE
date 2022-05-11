<template>
<form id="signList">
<label for="userName" class="userName">User Name:</label>
<input type="text" id="userName"  placeholder="Insérer votre nom d’utilisateur"/>
<br>
<label for="name" class="name"> Name:</label>
<input type="text" id="name" placeholder="Insérer votre prénom"/>
<br>
<label for="surame" class="surname">Surname:</label>
<input type="text" id="surname" placeholder="Insérer votre nom de famille"/>
<br>
<label for="email" class="email">Email:</label>
<input id="email" placeholder="Insérer votre email"/>
<br>
<label for="email" class="re-email"> Re-enter Email:</label>
<input id="re-email" placeholder="Ressaisir votre email"/>
<br>
<label for="password" class="password">Password:</label>
<input id="password" placeholder="Introduisez votre mot de passe"/>
<br>
<label for="password" class="re-password">Re-enter Password:</label>
<input id="re-password" placeholder="Ressaisir votre mot de passe"/>
</form>


</template>


<style>


#userName, #name, #surname, #email, #re-email, #password, #re-password {
    display: flex;
    align-items: center;
    justify-content: center;
}

.userName, .name, .surname, .email, .re-email, .password, .re-password {
    color:rgb(65, 59, 59);
    font-size:23px;
    margin-bottom:5px;
   text-shadow: 1px 1px 9px rgb(140, 140, 140);
   
   
}

#signList{
    display: flex;
    flex-direction:column;
    margin: 30px
}
  
</style>