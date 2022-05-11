<template>

<form id="logList">
<label for="userName" class="userName">User Name:</label>
<input type="text" id="userName" placeholder="Votre nom d’utilisateur"/>
<br>
<label for="password" class="password">Password:</label>
<input id="password" placeholder=" Votre mot de passe"/>
</form>

</template>


<style>


.userName, .password   {
     color:rgb(255, 255, 255);
    font-size:23px;
    margin-bottom:5px;
   text-shadow: 1px 1px 2px rgb(0, 0, 0);
   
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

</style>