<template>
    <div class="row">
        <div class="column">{{membre.fullname}} <a href="'mailto:'+membre.email">{{membre.email}}</a></div>
            <div class="column">
                <!--<button class="button button-outline">Voir conversations</button>-->
                <router-link :to="{name:'Membre',params:{membre_id : membre.id}}" class="button" title="Profil">Voir Profil</router-link></div>
                <button :disabled="membreConnecte" class="button button-outline" @click="effacerMembre(membre)">Effacer membres</button>
            </div>
    </div>
</template>

<script>
export default {
    props: ['membre'],
    computed:
    {
        membreConnecte()
        {
            return this.$store.state.membre.id == this.membre.id
        }
    },
    methods : 
    {
        effacerMembre()
        {
            //if(confirm('Voulez vous supprimer le membre'.this.membre.fullname+' ?'))
            api.delete('members/'+this.membre.id).then(response=>
            {
                this.$bus.$emit('chargerMembres');
                console.log(response.data);
            }).catch(error=>
            {
                console.log(error.response.data)
            })
        }
    }
}
</script>