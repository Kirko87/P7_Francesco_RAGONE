<template>
<form id="logList">
<label for="userName" class="userName">User Name:</label>
<input type="text" id="userName"/>
<hr>
<label for="password" class="password">Password:</label>
<input id="password"/>
</form>

</template>


<style>

#userName, #email, #password {
    display: flex;
    align-items: center;
    justify-content: center;

    }

.userName, .email, .password {
    color:red;
     
}

#logList {
    display: flex;
    flex-direction: column;
    margin:0 12em
}
</style>