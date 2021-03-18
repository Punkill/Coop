<template>
    <div v-if="conversation">
        <h1>Topic : {{newC.topic}}</h1>
        <h3>Sujet de la conversation: {{newC.label}}</h3>
        <button @click="modifierConversation">Modifier Conversation</button>
        <div id="creer-conversation" v-if="editer">
        <section>
            <button @click="masquerFormulaire">x</button>
                <h3>Modifier Conversations</h3>
            <form @submit.prevent="editerConversation">
            <div>
                <label>Sujet</label>
                <input v-model="newC.topic" required type="text" placeholder="De quoi voulez-vous discuter ?">
            </div>
            <div>
                <label>Tags</label>
                <input v-model="newC.label" required type="text" placeholder="Quels sont les concepts abordés ?">
            </div>
            <div>
                <button @click="editerConversation">Editer la Conversation</button>
                <button class="button" @click="masquerFormulaire">Annuler</button>
            </div>
            </form>
        </section>
        </div>
        <div class="messagesContainer">
            <div class="message" v-for="message in messages">
                <Message :message="message"/>
            </div>
        </div>
        <div ref="bottom">
            <form @submit.prevent="posterMessage" id="envoiMSG">
                <div>
                    <div>
                        <input v-model="message" required type="text" placeholder="Votre Message">
                    </div>
                    <button>Envoyer</button>
                </div>
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
            newC:{topic:'',label:''},
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
                this.clonerConversation();
                this.chargerMessages();
                this.$bus.$on('charger-messages',this.chargerMessages);
            })
        }
    },
    methods:
    {
        clonerConversation()
        {
            this.newC.topic = this.conversation.topic
            this.newC.label = this.conversation.label
        },
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
            //this.editerConversation()
            //setTimeout(()=> this.$refs['topic'].focus(),500)
        },
        masquerFormulaire()
        {
            this.editer = false;
        },
        editerConversation()
        {
            api.put('channels/'+this.conversation.id, this.newC).then(response=>
            {
                this.conversation = response.data
                this.clonerConversation()
                this.editer = false
                this.masquerFormulaire()
                this.$bus.$emit('charger-conversations')
            }).catch(error=>
            {
                console.log(error.response.data.message)
            })
        }
    }
}
</script>
<style scoped lang="scss">
.messagesContainer{
    margin-bottom: 6%;
}
.message{
    margin-bottom: 2em;
    margin-left: 1em;
}

form#envoiMSG{
    background:aliceblue;
    position: fixed;
    bottom: 0;
    left: 1em;
    width: 100%;
    margin: 0;
    left: unset;
    padding: 0;
}
</style>