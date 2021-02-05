<template>
    <div class="container" v-if="conversation">
        <h1>Topic : {{conversation.topic}}</h1>
        <h3>Sujet de la conversation: {{conversation.label}}</h3>
        <div class="message" v-for="message in messages">
            <blockquote>
                {{message.message}}
            </blockquote>
        </div>
        <div ref="bottom">
            <form @submit.prevent="posterMessage">
                <fieldset>
                    <input v-model="message" required type="text" placeholder="Votre Message">
                </fieldset>
                <button>Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data()
    {
        return{
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
        }
    }
}
</script>
<style scoped lang="scss">
    form{
        position:fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        margin:0;
    }
</style>