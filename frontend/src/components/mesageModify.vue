<template>
  <button v-if="!isModifying" @click.stop.pevent="isModifying = true" class="buttonModify">Modify</button>
  <form v-else @submit="createMessage" class="textAreaM" ref="my-component-modify">

    <textarea class="textAreaM_text" type="text" placeholder="write here:" v-model="newMessage"></textarea>
    <input class="textAreaM_input" type="file" @change="onFileChange" ref="image">
    <button class="textAreaM_button" type="submit" @click="modifyMessage">send</button>

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
    async modifyMessage(event) {
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

.buttonModify{
width:100%;
background-color:rgb(252, 252, 109)

}

.textAreaM {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &_text {
        height: 1rem;
        border: none;
        width: 100%;
        background-color: rgba(240, 248, 255, 0.399);
    }

    &_input {
        height: 1.6rem;

    }

    &_button {
        align-self: center;
        width: auto;
        height: 1.2rem;
        border: 1px solid black;
        border-style:inset;
        color: rgb(0, 0, 0);
        width: 20%;
        background-color: rgb(252, 252, 109);
        margin-bottom: 1rem;
        flex: 1;

    }
}



</style>