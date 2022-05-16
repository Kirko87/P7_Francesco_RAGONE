<template>

<form id="logList">
<label for="userName" class="userName">User Name:</label>
<input type="text" id="userName" placeholder="Votre nom d’utilisateur"/>
<br>
<label for="password" class="password">Password:</label>
<input id="password" placeholder=" Votre mot de passe"/>
</form>
 <div id="buttonContainer"><button id="button_div">VALIDATE!</button></div>
</template>


<style>

.userName, .password   {
     color:rgb(65, 59, 59);
    font-size:23px;
    margin-bottom:5px;
   text-shadow: 1px 1px 9px rgb(140, 140, 140);
   
}

#userName, #password {
    display: flex;
    align-items: center;
    justify-content: center;
    }

#logList {
    display: flex;
    flex-direction: column;  
    margin: 30px
}

#buttonContainer {
  display:flex;
   justify-content: center;
}

#button_div {
  margin:5px;
  user-select:none;
}
</style>