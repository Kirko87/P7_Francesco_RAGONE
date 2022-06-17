<template>
    <div class="bodyMain">
        <div>
            <router-link to="/"><img alt="Gruppomania logo" class="logoMain" src="@/assets/icon-left-font-monochrome-black.svg" width="200"
                height="40" background="transparent" /></router-link>

            <div class="logOut">
                <Logout></Logout>
            </div>

        </div>
        <h1 v-if="parent" id="parentH1">&#8673; back</h1>
        <h1 v-if="!parent" class="titreMain">Welcome to<br>Groupomania<br>chat!</h1>
          
        <MessageBox v-else-if="parentMessage" :key="parentMessage.id" :objectMessage="parentMessage"></MessageBox>
          
        <div class="messageContainer">
            
            <MessageCreation class="creationMain" :parent="parent" @messageCreated="onMessageCreated"></MessageCreation>
            <MessageBox v-for="message in reverseMessageList" :key="message.id" :objectMessage="message"></MessageBox>
        </div>

    </div>
</template>

<script>
import MessageBox from '../components/messageBox.vue';
import MessageCreation from '../components/messageCreation.vue';
import Logout from '../components/logout.vue';





export default {

    props: {
        parent: Number
    },


    data() {
        return {
            messages: [],
            parentMessage: null,
        }
    },


    created() {
        this.loadMessages();
        this.loadParent();
        this.eventBus.on("deleteMsg", this.onMessageDelete);
        this.eventBus.on("messageModified", this.onMessageModified)
    },

    methods: {
        async loadMessages() {
            let url = "http://localhost:3010/Groupomania/message"
            if (this.parent) {
                url = `http://localhost:3010/Groupomania/message/${this.parent}/children`
            }
            const response = await fetch(url, {
                method: "GET", //si puo' anche omettere perchè di default è "Get"
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token") //spazio dopo Bearer importante per il codice!
                }
            });
            this.messages = await response.json();
        },
        onMessageCreated(newMessage) { // mettere qui un async davanti alla funzione nn cambia granchè
            this.messages.push(newMessage)
            console.log("##MainPage-newMessage##", newMessage);
        },
        async loadParent() {
            if (!this.parent) { return }
            const response = await fetch(`http://localhost:3010/Groupomania/message/${this.parent}`, {
                method: "GET", //si puo' anche omettere perchè di default è "Get"
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"), //spazio dopo Bearer importante per il codice!
                }
            });
            this.parentMessage = await response.json();

        },
        onMessageDelete(messageId){
            if(this.parent === messageId){
                this.$router.push({name:"main"})
                return
            }
          this.messages = this.messages.filter(msg =>msg.id !== messageId)
          
        },
        onMessageModified(message){
           if(this.parent === message.id){
            this.parentMessage=message 
           }else{
            this.messages=this.messages.map( msg=> msg.id === message.id?message:msg)
           }
        }
    },

    components: { MessageBox, MessageCreation, Logout },
    computed:{
         reverseMessageList(){

            return [...this.messages].reverse()
         }
    },
    watch: {
        parent() {
            this.loadMessages();
            this.loadParent();
        }
    }
}


</script>

<style>
#parentH1{
    margin-left: 2.4rem;
    margin-top: 2rem;
    font-size: 2rem;
    color: rgba(18, 51, 51, 0.447);
}
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