<template>
    <div class="msgUserInfo" v-if="user">
        <div class="msgUserInfo_photo"></div>
        <div class="msgUserInfo_info">
            <div class="msgUserInfo_info_username">{{ user.Username }}</div>

        </div>

        <button v-if="canBeDelete" class="msgUserInfo_messageDelete" @click.stop.prevent="deleteMsg">X</button>

    </div>
    <div class="msgUserInfo_info_createdAt">{{ objectMessage.createdAt }}</div>
</template>

<script>

// import  JWT  from 'jsonwebtoken';

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

        async deleteMsg() {
               await fetch(`http://localhost:3010/Groupomania/message/${this.objectMessage.id}`, {
                method: "DELETE",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
            });
            this.eventBus.emit("deleteMsg",this.objectMessage.id)
            
        }

    },
    components: {},
    computed: {
        canBeDelete(){
            const tokenUser = localStorage.getItem("token")
            const tokenVerify = parseJwt(tokenUser)
            console.log(tokenVerify,this.user);
            

            return(this.objectMessage.userId === tokenVerify.userId || tokenVerify.role === 'Admin')
        }
    }

}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
</script>


<style lang="scss">
.msgUserInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 2px solid rgba(75, 70, 218, 0.15);
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
        object-fit: cover;
    }

    &_info {
        margin-left: .5rem;
        flex: 1;

        &_username {
            font-size: 1rem;
            margin-top: 1rem;
        }

        &_createdAt {
            font-size: 1rem;
            margin: 1rem 0;
        }
    }

    &_messageDelete {

        background-color: rgba(255, 34, 0, 0.447);
        margin-right: 0;
        
    }
}
</style>