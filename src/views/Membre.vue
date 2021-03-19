<template>
    <div class="container">
        <div><router-link to="/membres">Membres</router-link>> {{membre.fullname}}</div>
        <h1>{{membre.fullname}}</h1>
        <ul>
            <img class="avatar" :src=hash>
            <li>Email : {{membre.email}}</li>
            <li>Inscrit depuis : {{membre.depuis}}</li>
        </ul>

        <h2>Messages</h2>
        <div v-if="loading">Chargement des messages, veuillez patienter....</div>
        <div v-for="message in messagesTries">
            <Message :message="message"/>
        </div>
    </div>
</template>
<script>
import Message from '@/components/Message.vue';
export default {
    components:{
        Message
    },
    data(){
        return{
            membre:false,
            messages : [],
            loading : true,
        }
    },
    computed:{
        messagesTries()
        {
            function compare( a, b ) {
            if ( a.created_at > b.created_at )
            {
                return -1;
            }
            if ( a.created_at < b.created_at )
            {
                return 1;
            }
            return 0;
            }

            return this.messages.sort(compare).slice(0,10)
        },
        hash()
        {
            var md5 = require('md5');
            return "https://avatars.dicebear.com/v2/jdenticon/"+md5(this.membre.email)+".svg";
        }
    },
    mounted()
    {
        if(this.$route.params.membre_id)
        {
            //On recupere le membre pour afficher son profil
            this.membre =  this.$store.getters.getMembre(this.$route.params.membre_id)
            //On gere le format de la date
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            this.membre.depuis = new Date(this.membre.created_at).toLocaleString('fr-Fr',options)
            let cpt=0;
            //On boucle sur chaque conversations pour obtenir les messages du membre en question et les afficher
            this.$store.state.conversations.forEach(conversation=>
            {
                api.get('channels/'+conversation.id+'/posts').then(response=>
                {
                    response.data.forEach(message=>
                    {
                        if(message.member_id == this.membre.id)
                        {
                            message.conversation = conversation;
                            this.messages.push(message);
                        }
                    })
                    cpt++;
                    if(this.$store.state.conversations.length == cpt)
                    {
                        this.loading=false;
                    }
                })
            })
        }
    }
}
</script>

<style scoped>
img{
    width : 9%;
}
</style>