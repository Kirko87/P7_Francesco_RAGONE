<template>
    <form @submit="createMessage" class="textArea" enctype="multipart/form-data" method="post">
        <textarea class="textArea_text" type="text" placeholder="write here:" v-model="newMessage"></textarea>
        <input type="file" @change="onFileChange">
        <button class="textArea_button" type="submit">send</button>
    </form>



</template>

<script>

export default {
    props: {
        parent: {}
    },
    data() {
        return {
            newMessage: [],
            image: null,
        };
    },
    methods: {
        async createMessage(event) {
            event.preventDefault();
            const formData = new FormData()
            formData.append("message", this.newMessage),
            formData.append("image", this.image),
            formData.append("parent", this.parent)
            const response = await fetch("http://localhost:3010/Groupomania/message", formData, {
                method: "post",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data",
                    "Accept": "multipart/form-data",

                },
                body: formData

            });
            console.log(this.newMessage);
            const message = await response.json();
            this.$emit("messageCreated", message);
        },
         async onFileChange(event) {

            this.image = event.target.files[0]
            console.log(this.image);
        }

    },
    components: {}
}
</script>

<style lang="scss">
.textArea {
    display: flex;
    justify-content: flex-end;

    // border: 3px dotted greenyellow;
    &_text {
        height: 1rem;
        border: none;
        width: 80%;
        background-color: rgba(240, 248, 255, 0.399);
    }

    &_button {
        width: auto;
        height: 1.2rem;
        border: none;
        color: aquamarine;
        width: 20%;
        background-color: rgba(41, 101, 153, 0.74);

    }
}
</style>