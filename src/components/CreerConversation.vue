<template>
    <div>
        <div id="creer-conversation" v-if="afficher">
        <section>
            <button @click="masquerFormulaire">x</button>
                <h3>Creer Conversations</h3>
            <form @submit.prevent="creerConversation">
            <div>
                <label>Sujet</label>
                <input v-model="topic" required type="text" placeholder="De quoi voulez-vous discuter ?">
            </div>
            <div>
                <label>Tags</label>
                <input v-model="label" required type="text" placeholder="Quels sont les concepts abordés ?">
            </div>
            <div>
                <button>Créer la Conversation</button>
                <button class="button" @click="masquerFormulaire">Annuler</button>
            </div>
            </form>
            </section>
        </div>
        <button @click="afficherFormulaire">Créer une nouvelle conversation</button>
    </div>
</template>
<script>
export default {
    data() 
    {
        return{
            afficher: false,
            sujet: '',
            label: ''
        }
    },
    mounted()
    {
        this.$bus.$on('afficher-creer-conversations',this.afficherFormulaire);
    },
    methods:
    {
        creerConversation()
        {
            api.post('channels',
            {
                label: this.label,
                topic: this.topic
            }).then(response=>
            {
                this.masquerFormulaire();
                this.$bus.$emit('charger-conversations');
            }).catch(error =>
            {
                alert(error.response.data.message)
            })
        },
        afficherFormulaire()
        {
            this.topic = '';
            this.label = '';
            this.afficher = true;
        },
        masquerFormulaire()
        {
            this.afficher = false;
        }
    }
}
</script>