<template>
  <button v-if="!isModifying" @click.stop.pevent="isModifying = true">Modifier</button>
  <form v-else @submit="createMessage" class="textArea" ref="my-component-modify">

    <textarea class="textArea_text" type="text" placeholder="write here:" v-model="newMessage"></textarea>
    <input class="textArea_input" type="file" @change="onFileChange" ref="image">
    <button class="textArea_button" type="submit" @click="createMessage">send</button>

  </form>
</template>

<script>
export default {
  props: {
    message: Object
  },


  data() {
    return {
      newMessage: [],
      image: null,
      isModifying: false
    };
  },

  created() {
    this.newMessage = this.message.message
  },

  methods: {
    async createMessage(event) {
      event.preventDefault();
      let formData = new FormData()
      formData.append("message", this.newMessage)
      formData.append("image", this.image)
      if (this.parent)
        formData.append("parent", this.parent)
      const response = await fetch(`http://localhost:3010/Groupomania/message/${this.message.id}`, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          // "Content-Type": "multipart/form-data", 
          // "Accept": "multipart/form-data",
        },
        body: formData

      });
      console.log(this.newMessage);
      const message = await response.json();


      this.eventBus.emit("messageModified", message);
      this.newMessage = "";//con "@click="createMessage"" sul button, pulisce la textarea 
      this.image = null;//non tiene in memoria il file dopo l'invio, anche se resta il nome del file inviato
      this.$refs.image.value = ""
      this.isModifying = false

    },
    async onFileChange(event) { //bottone per caricare immagini

      this.image = event.target.files[0]
      console.log(this.image);



    },

  },
  components: {}
}
</script>

<style lang="scss">
</style>