<template>
    <form @submit="createMessage" class="textArea"><textarea type="text" v-model="newMessage"></textarea><button
            type="submit">send</button></form>
</template>

<script>
export default {
    data() {
        return {
            newMessage:[],
            

        }
    },
    methods: {
        async createMessage() {
            const response = await fetch("http://localhost:3010/Groupomania/message", {
                method: "post",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token") //spazio dopo Bearer importante per il codice!
                },
                body: JSON.stringify({message: this.newMessage})


            });
          
            console.log(this.newMessage)
             const message = response.json();
             this.$emit("messageCreated", message)

        }

    }

}
</script>

<style>
.textArea {
    display: flex;
    justify-content: bottom;
    position: fixed;
    align-self: center;
    bottom: 3%;

}

button {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    width: fit-content;
}
</style>