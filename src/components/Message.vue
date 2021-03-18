<template>
    <div class="message">
        <header>
            <img  class="avatar" :src=hash><b>{{membre.fullname}}</b> <time>le {{dateMessage}}</time>
            <button @click="modifierMessage" class="button-clear">Editer</button>
            <button @click="supprimerMessage" class="button-clear">Supprimer</button>
        </header>
        <div v-if="!editer">
            {{message.message}}
        </div>
        <div v-else>
            <form @submit.prevent="posterMessage">
                <div class ="row">
                    <div class="column">
                        <input v-model="messageEdit" required type="text" placeholder="Modification message ..."/>
                    </div>
                </div>
                <button class="button button-small">Enregistrer</button>
                <button type="button" @click="modifierMessage" class="button button-clear" id='yellow'>Annuler</button>
            </form>
        </div>
        <div v-if="message.conversation">
            Message posté dans <router-link :to="{Name:'Conversation',params:{id:message.conversation.id}}">{{message.conversation.topic}}</router-link>
        </div>
    </div>
</template>
<script>
export default {
    props: ['message'],
    data()
    {
        return{
            editer:false,
            messageEdit:''
        }
    },
    mounted()
    {
        this.messageEdit = this.message.message;
    },
    computed:{
        membre()
        {
            return this.$store.getters.getMembre(this.message.member_id)
        },
        hash()
        {
            var md5 = require('md5');
            return "https://avatars.dicebear.com/v2/jdenticon/"+md5(this.membre.email)+".svg";
        },
        dateMessage()
        {
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(this.message.created_at).toLocaleDateString('fr-Fr',options)
        }
    },
    methods:
    {
        supprimerMessage()
        {
            if(confirm('Voulez vous supprimer le message?'))
            {
                console.log(this.message.channel_id);
                api.delete('/channels/'+this.message.channel_id+'/posts/'+this.message.id).then(response=>{
                    this.$bus.$emit('charger-messages');
                }).catch(error=>{
                    alert(response.data.message);
                })
            }
        },
        modifierMessage()
        {
            this.editer = !this.editer;
        },
        posterMessage()
        {
            api.put('channels/'+this.message.channel_id+'/posts/'+this.message.id,
            {
                message: this.messageEdit
            }).then(response=>{
                this.editer = !this.editer;
                this.$bus.$emit('charger-messages');
            }).catch(error=>{
                alert(error.data.message);
            })
        }
    }
}
</script>
<style lang="scss">
.message{
    background-color: #d6d6d6;
    button{
        position: relative;
        top:0;
        padding:0;
        margin: 0;
        margin-right: 1em;
        right:0;
        opacity:0;
    }
    &:hover .button-clear{
        opacity:1
    }
}

</style>