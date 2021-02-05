<template>
  <div>
    <!--<div>
      <template v-for="conversation in $store.state.conversation">
        <Conversation :conversation="conversation"/>
      </template>
    </div>-->
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Conversation from '@/components/Conversation.vue';
export default {
  name: 'Home',
  components: {
    Conversation
  }
}
</script>
