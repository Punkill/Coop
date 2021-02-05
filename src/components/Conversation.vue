<template>
    <div class="row">
        <div class="column column-50">
            <h1>{{conversation.topic}}</h1>
            <h3>{{conversation.label}}</h3>
        </div>
        <div class="column"><router-link :to="{name:'Conversation',params:{id : conversation.id}}" class="button">Voir</router-link></div>
    </div>
</template>
<script>
export default {
    data()
    {
        return{
            conversation: false,
            message :'',
            messages: []
        }
    },
    props : ['conversation']
}
</script>