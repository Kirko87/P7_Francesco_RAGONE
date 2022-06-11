<template>
        <router-link class="main_logOutLink" @click="deleteToken" to="/login">Logout</router-link>
</template>

<script>
export default {
    methods:{
       async deleteToken(token){
        localStorage.removeItem("token",token)
       } 
    }
}
</script>

<style>
.main_logOutLink {
    display: flex;
    align-items: center;
    justify-content: end;
    text-decoration: none;
    color: white;
    text-shadow: 1px 1px 7px rgb(0, 0, 0);
    font-weight: bold;
    font-size: 2rem;
    margin-right: 50px;
    position: fixed;
    right: 0px;
}
</style>