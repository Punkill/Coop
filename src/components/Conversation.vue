<template>
    <div class="row">
        <div class="column column-50">
            <h1>{{conversation.topic}}</h1>
            <h3>{{conversation.label}}</h3>
        </div>
        <div class="column">
        <router-link :to="{name:'Conversation',params:{id : conversation.id}}" class="button">Voir</router-link>
        <button @click="supprimerConversation">Supprimer Conversation</button>
        </div>

    </div>
</template>
<script>
export default {
    props : ['conversation'],
    data()
    {
        return{
            conversation: false,
            message :'',
            messages: []
        }
    },
    methods:
    {
        supprimerConversation()
        {
            if(confirm('Voulez-vous supprimer la conversation?'))
            {
                api.delete('channels/'+this.conversation.id).then(response=>
                {
                    this.$bus.$emit('charger-conversations')
                }).catch(error=>{
                    console.log(error.response.data.message)
                })
            }

        }
    }
}
</script>