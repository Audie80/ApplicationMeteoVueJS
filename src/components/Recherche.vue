<template>
  <div>
    <form @submit.prevent="search">
      <div class="form">
        <input type="text" v-model="cityField" />
      </div>
      <br />
      <div class="form">
        <input class="submit" type="submit" :disabled="cityField == ''" />
      </div>
    </form>
    <button @click="clear">x</button>
  </div>
</template>

<script>
export default {
  name: 'Recherche',
  props: {
    appid: String
  },
  data: function () {
    return {
      cityField: ''
    }
  },
  computed: {
    url: function () {
      return `https://api.openweathermap.org/data/2.5/forecast?q=${this.cityField},fr&units=metric&lang=fr&APPID=${this.appid}`
    }
  },
  methods: {
    search: function () {
      fetch(this.url) // La réponse d'un fetch est une promesse, il faut donc un "then" pour la promesse résolue et un "catch" pour la promesse non résolue
      .then((response) => { return response.json() }) 
      .catch((error) => { return error })
      .then((result) => { this.$emit('sendResult', result) //variable $emit native de JS, permet d'envoyer des données de l'enfant au parent, il faut créer un événement virtuel (ici, "sendResult") qui va être appelé au submit
      }) // ATTENTION !!! le "this" utilisé ici n'est pas dans le scope global, ça ne fonctionne donc pas si on utilise des fonctions normales
      .catch((error) => { return error })
    },
    clear: function () {
      this.cityField = ''
      this.$emit('destroyResult')
    }
  }
}
</script>

<style scoped>
input {
  text-align: center;
  width: 20vw;
  min-width: 150px;
  height: 5vh;
  min-height: 30px;
  padding: 5px;
  border: none;
  box-shadow: 0 0 0 3px yellow inset;
}
input.submit {
  width: 5vw;
  min-width: 100px;
  background-color: orange;
}
</style>