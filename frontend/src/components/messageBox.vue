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
            console.log(this.objectMessage)
            //previene creazioneinfinita messaggi della pagina Main, quando l'utente non è loggato
            const response = await fetch(`http://localhost:3010/Groupomania/message/${this.objectMessage.id}/children`, {
                method: "HEAD", 
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"), //spazio dopo Bearer importante per il codice!
                }
            });
            console.log(...response.headers);
            this.messagesCount = response.headers.count;
            
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

    &_boxMessage {
        height: 4.8rem;
        margin-bottom: 1.6rem;
        text-align: center;
        background-color: rgb(198, 247, 232);
        border: 3px dashed rgba(43, 222, 228, 0.492);
        border-style: solid NONE solid;

    }

}
</style>