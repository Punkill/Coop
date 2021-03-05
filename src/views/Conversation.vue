<template>
    <div class="container" v-if="conversation">
        <h1>Topic : {{conversation.topic}}</h1>
        <h3>Sujet de la conversation: {{conversation.label}}</h3>
        <button @click="modifierConversation">Modifier Conversation</button>
        <div id="creer-conversation" v-if="editer">
        <section>
            <button @click="masquerFormulaire">x</button>
                <h3>Creer Conversations</h3>
            <form @submit.prevent="editerConversation">
            <div>
                <label>Sujet</label>
                <input v-model="conversation.topic" required type="text" placeholder="De quoi voulez-vous discuter ?">
            </div>
            <div>
                <label>Tags</label>
                <input v-model="conversation.label" required type="text" placeholder="Quels sont les concepts abordés ?">
            </div>
            <div>
                <button>Créer la Conversation</button>
                <button class="button" @click="masquerFormulaire">Annuler</button>
            </div>
            </form>
        </section>
        </div>
        <div class="message" v-for="message in messages">
            <Message :message="message"/>
        </div>
        <div ref="bottom">
            <form @submit.prevent="posterMessage" id="envoiMSG">
                <fieldset>
                    <input v-model="message" required type="text" placeholder="Votre Message">
                </fieldset>
                <button>Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>
import Message from "@/components/Message.vue"
export default {
    components:
    {
        Message
    },
    data()
    {
        return{
            editer: false,
            c: false,
            conversation:false,
            message : '',
            messages: []
        }
    },
    mounted()
    {
        if(this.$route.params.id)
        {
            api.get('channels/'+this.$route.params.id).then(response=>
            {
                this.conversation = response.data;
                this.chargerMessages();
            })
        }
    },
    methods:
    {
        chargerMessages()
        {
            api.get('channels/'+this.conversation.id+'/posts').then(response=>
            {
                //console.log(response.data);
                this.messages = response.data.reverse();
            })
        },
        posterMessage()
        {
            api.post('channels/'+this.conversation.id+'/posts',{
                message : this.message
            }).then(response=>{
                setTimeout(()=>{
                    this.$refs['bottom'].scrollIntoView();
                },500)
                this.chargerMessages();
                this.message = '';
            })
        },
        modifierConversation()
        {
            this.editer = true;
        },
        masquerFormulaire()
        {
            this.editer = false;
        },
        editerConversation()
        {

        }
    }
}
</script>
<style scoped lang="scss">
    form#envoiMSG{
        position:fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        margin:0;
    }
</style>