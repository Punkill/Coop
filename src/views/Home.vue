<template>
  <div class="container">
    <template v-for="conversation in $store.state.conversations">
      <Conversation :conversation="conversation"/>
    </template>
  </div>
</template>

<script>
import Conversation from '@/components/Conversation.vue';
export default {
  name: 'Home',
  components: {
    Conversation
  },
  mounted()
  {
    this.$bus.$emit('charger-conversations');
  }
}
</script>
