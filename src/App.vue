<template>
  <div v-if="apiOk">
    <Header/>
    <router-view/>
  </div>
  <div v-else>
    Impossible de joindre l'API
    </div>
</template>
<script>
import Header from '@/components/Header.vue';
export default {
  components:
  {
    Header
  },
  methods: {
  },
  data(){
    return{
      apiOk: false
    }
  },
  mounted(){
    console.log("L'app est démarée");
    //On ping l'API au lancement pour savoir si elle est disponible
    api.get('ping').then(reponse=>
    {
      this.apiOk = true;
      console.log("l'api est fonctionelle");

      //On fait les chargements de Membres + Conversation avec leur bus respectif
      this.chargerMembres();
      this.$bus.$on('chargerMembres',this.chargerMembres);
      this.chargerConversations();
      this.$bus.$on('charger-conversations',this.chargerConversations);
      /*
        Si membre est a false c'est à dire qu'on est pas connecté on affiche la page de connexion
        Sinon on déconnecte l'utilisateur
      */
      if(!this.$store.state.membre)
      {
        if(this.$route.path != "/se-connecter" && this.$route.path !="creer-compte")
          this.$router.push('/se-connecter');
      }
      else
      {
        api.get('members/'+this.$store.membre.id+'/signedin').catch(error=>{
            this.$store.commit('seDeconnecter');
            this.$router.push('/se-connecter');
        })
      }
    }).catch(error=>{
      console.log("l'api ne marche pas");
    })
  },
  methods: 
  {
    chargerMembres()
    {
      api.get('members').then(response=>
      {
        this.$store.commit('setMembres',response.data);
      });
    },
    chargerConversations()
    {
      api.get('channels').then(response =>
      {
        this.$store.commit('setConversations',response.data)
      })
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
