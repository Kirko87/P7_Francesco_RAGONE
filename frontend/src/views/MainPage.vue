<template>
    <div class="bodyMain">
        <div><img alt="Gruppomania logo" class="logoMain" src="@/assets/icon-left-font-monochrome-black.svg" width="200"
                height="40" background="transparent" />
            <div class="logOut">
                <router-link class="main_logOutLink" to="/login">Logout</router-link>
            </div>
        </div>

        <h1 class="titreMain">Welcome to<br>Groupomania<br>chat!</h1>

        <!-- <MessageCreation @onMessageCreated="">
            <CommentCreation></CommentCreation>
        </MessageCreation> -->
        <div class="messageContainer">

            <!-- <Message v-for="message in messages" :key="message.id" :objectMessage="message"></Message> -->


        </div>

    </div>
</template>

<script>
import Message from '../components/message.vue';
import MessageCreation from '../components/messageCreation.vue';
import CommentCreation from '../components/commentCreation.vue';

export default {
    data() {
        return {
            messages: [],
            comments: []
        }

    },
    created() {
        // this.loadMessages();

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
            this.messages.unshift (newMessage)
        },

        async loadComment() {
            const response = await fetch("http://localhost:3010/Groupomania/message//comment", {
                method: "get",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token")

                }
            });
            this.comments = await response.json();
        },
        onCommentCreated(newComment) { // mettere qui un async davanti alla funzione nn cambia granchè
            this.comments.unshift(newComment)

        },

       
    },
     components: { Message, MessageCreation, CommentCreation }
}

</script>

<style>
html {
    margin-bottom: 15%;
    padding: 0;

}

.bodyMain {
    display: flex;
    flex-direction: column;
    align-self: center;
    background-image: none;
    background-color: rgba(146, 221, 165, 0.411);
}

.main_logOutLink {
    display: flex;
    align-items: center;
    justify-content: end;
    text-decoration: none;
    color: white;
    text-shadow: 1px 1px 7px rgb(0, 0, 0);
    font-weight: bold;
    font-size: 2rem;
    margin-right: 30px;
    position: fixed;
    right: 0px;



}

.logoMain {
    /* filter: brightness(0) saturate(100%) invert(58%) sepia(100%) saturate(2873%)
 hue-rotate(143deg) brightness(95%) contrast(104%); */
    position: fixed;
}

.titreMain {
    font-weight: 500;
    font-size: 1.9rem;
    color: rgba(17, 10, 10, 0.363);
    text-shadow: 6px 1px 7px rgba(87, 134, 236, 0.5);
    text-align: center;
    margin-top: 4rem;
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);

}

.messageContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70%;

    overflow-y: scroll;
}
</style>