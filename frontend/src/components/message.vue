<template>

    <div class="message">

        <MessageUserInfo :objectMessage="objectMessage"></MessageUserInfo>

        <div class="message_boxMessage">{{ objectMessage.message }}</div>

        <MessageCreation :parent="objectMessage.id" @messageCreated="onMessageCreated"></MessageCreation>
         
        <Message class="" v-for="message in messages" :key="message.id" :objectMessage="message"></Message>
    </div>
    

</template>

<script>
import MessageCreation from './messageCreation.vue';
import MessageUserInfo from './messageUserInfo.vue';



export default {
    props: {
        objectMessage: Object
    },

    data() {
        return {
            messages: [],
        }
    },

    created() {
        this.loadMessages();
    },

    methods: {
        async loadMessages() {
            const response = await fetch(`http://localhost:3010/Groupomania/message/${this.objectMessage.id}/children`, {
                method: "GET", //si puo' anche omettere perchè di default è "Get"
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token") //spazio dopo Bearer importante per il codice!
                }
            });
            this.messages = await response.json();
        },
         async onMessageCreated(newMessage) { // mettere qui un async davanti alla funzione nn cambia granchè
            this.messages.push(newMessage)
            console.log("####", newMessage);
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