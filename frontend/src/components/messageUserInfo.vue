<template>
    <div class="msgUserInfo" v-if="user">
        <div class="msgUserInfo_photo"></div>
        <div class="msgUserInfo_info">
            <div class="msgUserInfo_info_username">{{ user.Username }}</div>
            <br>
            <!-- <div class="msgUserInfo_info_createdAt">{{msg.msgContent.createdAt}}</div> -->
        </div>
    </div>
</template>

<script>
export default {

    props: {
        objectMessage: Object
    },

    data() {
        return {
            user: null,
            msg: null
        };
    },

    created() {
        this.infoMessagesUser()
        // this.infoMessagesMsg()
    },

    methods: {
        async infoMessagesUser() {
            const response = await fetch(`http://localhost:3010/Groupomania/user/${this.objectMessage.userId}`, {
                method: "get",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
            });
            this.user = await response.json()

        },
        //   async infoMessagesMsg() {
        //         const response = await fetch(`http://localhost:3010/Groupomania/message/${this.objectMessage.userId}`, {
        //             method: "get",
        //             headers: {
        //                 authorization: "Bearer " + localStorage.getItem("token"),
        //                 "Content-Type": "application/json"
        //             },
        //         });
        //         this.msg = await response.json()

        //     },

    },
    components: {},

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
        border-right: 2px solid rgba(24, 91, 190, 0.678);
        ;
        border-radius: 50%;
        margin-left: 5%;
        width: 3rem;
    }

    &_info {
        margin-left: .5rem;

        &_username {
            font-size: 1rem;
            margin-top: 1rem;

        }

        &_createdAt {
            font-size: .7rem;
        }
    }
}
</style>