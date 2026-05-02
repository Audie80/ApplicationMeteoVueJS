<template>
  <div id="app">
    <!-- D'après le component "Recherche", on peut créer une balise Recherche -->
    <Recherche :appid="appid" @sendResult="setMeteo" @destroyResult="prevMeteo=null" /> <!-- On a créé un événement "sendResult" dans Recherche.vue pour l'envoi des données -->
    <br />
    <meteo v-if="prevMeteo" :prevCity="prevCity" :prevList="prevList" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Recherche from './components/Recherche.vue'
import Meteo from './components/Meteo.vue'

const appid = 'ede43546901b070d546c670b9b2cb824'
const prevMeteo = ref(null)
const prevCity = ref(null)
const prevList = ref(null)

function setMeteo(result) {
  prevMeteo.value = result
  prevCity.value = result.city
  prevList.value = result.list
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
