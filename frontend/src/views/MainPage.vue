<template>
    <div class="bodyMain">
        <div>
            <img alt="Gruppomania logo" class="logoMain" src="@/assets/icon-left-font-monochrome-black.svg" width="200"
                height="40" background="transparent" />

            <div class="logOut">
                <Logout></Logout>
            </div>

        </div>

        <h1 class="titreMain">Welcome to<br>Groupomania<br>chat!</h1>

        <div class="messageContainer">
            <MessageCreation class="creationMain" @messageCreated="onMessageCreated"></MessageCreation>
            <MessageBox v-for="message in messages" :key="message.id" :objectMessage="message"></MessageBox>
        </div>

    </div>
</template>

<script>
import MessageBox from '../components/messageBox.vue';
import MessageCreation from '../components/messageCreation.vue';
import Logout from '../components/logout.vue';


export default {
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
            
            const response = await fetch("http://localhost:3010/Groupomania/message", {
                method: "GET", //si puo' anche omettere perchè di default è "Get"
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token") //spazio dopo Bearer importante per il codice!
                }
            });
            this.messages = await response.json();
        },
        onMessageCreated(newMessage) { // mettere qui un async davanti alla funzione nn cambia granchè
            this.messages.unshift(newMessage)
            console.log("####", newMessage);
        },


    },

    components: { MessageBox, MessageCreation, Logout }
}


</script>

<style>
.creationMain {
    position: fixed;
    align-self: center;
    bottom: 3%;
    width: 96%;
}

.bodyMain {
    display: flex;
    flex-direction: column;
    background-color: rgba(146, 221, 165, 0.411);

}

.logoMain {
    /* filter: brightness(0) saturate(100%) invert(58%) sepia(100%) saturate(2873%)
 hue-rotate(143deg) brightness(95%) contrast(104%); */
    position: fixed;
    width: 9rem;
}

.titreMain {
    font-weight: 500;
    font-size: 1.9rem;
    color: rgba(17, 10, 10, 0.363);
    text-shadow: 6px 1px 7px rgba(87, 134, 236, 0.5);
    text-align: center;
    margin-top: 9rem;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);

}

.messageContainer {
    margin-top: 70%;
   margin-bottom: 7rem;
    overflow: scroll;

}
</style>