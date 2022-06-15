<template>
    <router-link class="message" :to="{name:'main', params:{parent:objectMessage.id}}">

        <MessageUserInfo :objectMessage="objectMessage"></MessageUserInfo>

        <div class="message_boxMessage">{{ objectMessage.message }}</div>

        <div class="message_comments">{{messagesCount}}</div>
    </router-link>
    <br>

</template>

<script>
import MessageUserInfo from './messageUserInfo.vue';
import MessageCreation from './messageCreation.vue';
import { computed } from '@vue/reactivity';






export default {
    props: {
        objectMessage: Object
    },

    data() {
        return {
            messagesCount:0,
        }
    },

    created() {

        this.loadMessages();
    },

    methods: {
        async loadMessages() {
           
            const response = await fetch(`http://localhost:3010/Groupomania/message/${this.objectMessage.id}/childrenCount`, {
                method: "GET", 
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"), //spazio dopo Bearer importante per il codice!
                }
            });
            console.log(response);
            this.messagesCount = await response.text();
            
        },
       

    },

    components: { MessageCreation, MessageUserInfo }
  
}

</script>

<style lang="scss">
.message {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    word-break: break-all;
    border: 3px dotted black;
    text-decoration: none;
    // align-self:center; //restringo messaggio parent
    // margin-top: 23%;

    &_boxMessage {
        height: 4.8rem;
        margin-bottom: 1.6rem;
        text-align: center;
        background-color: rgb(198, 247, 232);
        border: 3px dashed rgba(43, 222, 228, 0.492);
        border-style: solid NONE solid;

    }
    &_comments{
        display: flex;
        justify-content: center;
        align-self: center;
        justify-content: center;
        border: 3px solid rgba(68, 68, 214, 0.595);
        border-radius:1rem;
        padding: .2rem;
        margin-bottom: .2rem;
        background-color: rgb(157, 244, 218);
        width: 1.4rem;
       
    }
}
</style>