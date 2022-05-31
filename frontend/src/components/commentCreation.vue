<template>

<div type="text"></div>

</template>

<script>
export default {
    data() {
        return {
            newComment:[]
        }
    },
    methods: {
        async createComment() {
            const response = await fetch("http://localhost:3010/Groupomania/comment", {
                method: "post",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token") //spazio dopo Bearer importante per il codice!
                },
                body: JSON.stringify({message: this.newComment})


            });
          
            console.log(this.newComment)
             const comment = response.json();
             this.$emit("messageCreated", comment.value)

        }

    }

}
</script>


<style></style>
