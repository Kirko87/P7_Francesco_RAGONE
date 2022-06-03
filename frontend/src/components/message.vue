<template>

    <div class="message">{{ objectMessage.message }}

        <Message class="" v-for="message in messages" :key="message.id" :objectMessage="message"></Message>

        <MessageCreation :parent="objectMessage.id" @messageCreated="onMessageCreated"></MessageCreation>
    </div>
    <br>

</template>

<script>
import MessageCreation from './messageCreation.vue';

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
        onMessageCreated(newMessage) { // mettere qui un async davanti alla funzione nn cambia granchè
            this.messages.push(newMessage)
            console.log("####", newMessage);
        },


    },
    components: { MessageCreation }
}

</script>

<style lang="scss">
.message {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    word-break:break-all;
    border: 2px solid black;
    width: 90%;
    padding: 0 5%;

}
</style>