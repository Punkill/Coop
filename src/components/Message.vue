<template>
    <div class="message">
        <header>
            <b>{{membre.fullname}}</b> <time>le {{dateMessage}}</time>
        </header>
            {{message.message}}
        <div v-if="message.conversation">
            Message posté dans <router-link :to="{Name:'Conversation',params:{id:message.conversation.id}}">{{message.conversation.topic}}</router-link>
        </div>
    </div>
</template>
<script>
export default {
    props: ['message'],
    computed:{
        membre()
        {
            return this.$store.getters.getMembre(this.$route.params.membre_id)
        },
        dateMessage()
        {
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(this.message.created_at).toLocaleDateString('fr-Fr',options)
        }
    }
}
</script>
<style lang="scss">

</style>