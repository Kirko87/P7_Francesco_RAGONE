<template>
    <form @submit="createMessage" class="textArea"><textarea  class="textArea_text" type="text" v-model="newMessage"></textarea><button
            class="textArea_button" type="submit">send</button></form>
</template>

<script>
export default {

    props:{
       parent:{}
    },

    data() {
        return {
            newMessage:[],
            

        }
    },
    methods: {
        async createMessage(event) {
            event.preventDefault()
            const response = await fetch("http://localhost:3010/Groupomania/message", {
                method: "post",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"), //spazio dopo Bearer importante per il codice!
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({message: this.newMessage, parent:this.parent})


            });
          
            console.log(this.newMessage)
             const message = await response.json();
             this.$emit("messageCreated", message)

        }

    }

}
</script>

<style lang="scss">
.textArea {
    display: flex;
    justify-content: center;
    }
  

</style>