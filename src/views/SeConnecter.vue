<template>
<div class="container">
    <h1>Se Connecter</h1>
    <div>
        mettre ici un lien vers la page de création de compte
    </div>
    <form @submit.prevent="connexion">
    <fieldset>
        <div>
            <label>Email</label>
            <input v-model="email" required type="email" placeholder="email">
        </div>
        <div>
            <label>Mot de passe</label>
            <input v-model="password" required type="password" placeholder="Mot de passe">
        </div>
        <button>Se connecter</button>
        <p><router-link to="/creer-compte">Créer un compte</router-link></p>   
    </fieldset> 
    </form>
</div>
</template>

<script>
export default {
    data(){
        return{
            email: 'thomas@vue.js',
            password: 'mdr'
        }
    },
    methods:
    {
        connexion()
        {
            api.post('members/signin',
            {
                email: this.email,
                password: this.password
            }).then(response =>
            {
                this.$store.commit('setMembre',response.data.member);
                this.$store.commit('setToken',response.data.token);
                alert('Vous êtes maintenant connecté');
                console.log(response.data); //contenu des data
                this.$router.push('/');
            }).catch(error=>
            {
                alert(error.response.data.message); //Contenu de de l'erreur
            })
        }
    }
}
</script>