<template>
  <div id="app">
    <!-- D'après le component "Recherche", on peut créer une balise Recherche -->
    <Recherche :appid="appid" @sendResult="setMeteo" @destroyResult="prevMeteo=null" /> <!-- On a créé un événement "sendResult" dans Recherche.vue pour l'envoi des données -->
    <br />
    <meteo v-if="prevMeteo" :prevCity="prevCity" :prevList="prevList" />
  </div>
</template>

<script>
import Recherche from './components/Recherche.vue' // Permet d'importer le composant "Recherche"
import Meteo from './components/Meteo.vue'

export default { // Obligatoire d'exporter pour pouvoir l'importer dans main.js
  name: 'app', // Ce sera le name qui sera demandé pour l'import
  components: {
    Recherche, // après l'import, créer un component
    Meteo
  },
  data: function () { // les datas sont stockées dans une fonction qui retourne un objet contenant les datas
    return {
      appid: 'ede43546901b070d546c670b9b2cb824', // clé de l'API weather
      prevMeteo: null, // variable où seront stockés les results
      prevCity: null,
      prevList: null
    }
  },
  methods: {
    setMeteo: function (result) { // méthode appelée par l'événement virtuel "sendResult"
      //alert('Transmission des données')
      this.prevMeteo = result // qui affecte les données dans la variable prevMeteo
      this.prevCity = this.prevMeteo.city
      this.prevList = this.prevMeteo.list
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
