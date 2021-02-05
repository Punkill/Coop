<template>
    <div class="container">
        <h1>Liste des conversations</h1>
        <CreerConversation/>

        <div v-for="conversation in $store.state.conversations">
            <Conversation :conversation="conversation"/>
        </div>
    </div>
</template>

<script>
import Conversation from '@/components/Conversation.vue';
import CreerConversation from '@/components/CreerConversation.vue';
export default {
    components:
    {
        CreerConversation,
        Conversation
    }
}
</script>