<template>
    <div class="msgUserInfo" v-if="user">
        <div class="msgUserInfo_photo"></div>
        <div class="msgUserInfo_info">{{user.Username}}</div>
    </div>
</template>

<script>
export default {
    props: {
        objectMessage: Object
    },
    data() {
        return {
            user:null,
        };
    },
    methods: {
        async infoMessages() {
            const response = await fetch(`http://localhost:3010/Groupomania/user/${this.objectMessage.userId}`, {
                method: "get",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
            });
           this.user=await response.json()
           
        }
    },
    components: {},
    created() {
        this.infoMessages()
    }
}
</script>


<style lang="scss">
.msgUserInfo {
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid rgba(75, 70, 218, 0.15);
    margin-bottom: 2rem;
    height: 3rem;
    background-color: rgba(184, 220, 250, 0.818);

    &_photo {
        justify-content: center;
        border-bottom: 2px solid rgba(66, 50, 191, 0.678);
        border-right: 2px solid rgba(24, 91, 190, 0.678);;
        border-radius: 50%;
        margin-left: 5%;
        width: 3rem;
    }

    &_info {
        align-self: flex-end;
        margin-left: .5rem;
        
    }
}
</style>