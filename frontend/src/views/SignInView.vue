<template>
<form id="signList">
<label for="userName" class="userName">User Name:</label>
<input type="text" id="userName"/>
<hr>
<label for="name" class="name"> Name:</label>
<input type="text" id="name"/>
<hr>
<label for="surame" class="surname">Surname:</label>
<input type="text" id="userName"/>
<hr>
<label for="email" class="email">Email:</label>
<input id="email"/>
<hr>
<label for="password" class="password">Password:</label>
<input id="password"/>
</form>

</template>


<style>

#userName, #name, #surname, #email, #password {
    display: flex;
    align-items: center;
    justify-content: center;

    }

.userName, .name, .surname, .email, .password {
    color:red;
     
}

#signList{
    display: flex;
    flex-direction: column;
     margin:0 12em
}
</style>