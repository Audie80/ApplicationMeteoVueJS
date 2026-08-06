<template>
  <div id="app">
    <!-- D'après le component "Recherche", on peut créer une balise Recherche -->
    <Recherche :appid="appid" @sendResult="setMeteo" @destroyResult="clearSearch" />
    <br />
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <Meteo v-if="prevMeteo && prevCity && prevList" :prevCity="prevCity" :prevList="prevList" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Recherche from './components/Recherche.vue'
import Meteo from './components/Meteo.vue'

const appid = '444c73811ab3b4ff4a67341e1974fd19'
const prevMeteo = ref(null)
const prevCity = ref(null)
const prevList = ref(null)
const errorMessage = ref('')

function setMeteo(result) {
  if (!result || typeof result !== 'object') {
    errorMessage.value = 'Résultat API invalide.'
    prevMeteo.value = null
    prevCity.value = null
    prevList.value = null
    return
  }

  if ('cod' in result && Number(result.cod) !== 200) {
    errorMessage.value = result.message || 'Ville introuvable.'
    prevMeteo.value = null
    prevCity.value = null
    prevList.value = null
    return
  }

  if (!result.city || !result.list) {
    errorMessage.value = 'Résultat API invalide.'
    prevMeteo.value = null
    prevCity.value = null
    prevList.value = null
    return
  }

  errorMessage.value = ''
  prevMeteo.value = result
  prevCity.value = result.city
  prevList.value = result.list
}

function clearSearch() {
  errorMessage.value = ''
  prevMeteo.value = null
  prevCity.value = null
  prevList.value = null
}
</script>

<style>
.error {
  color: red;
  margin-bottom: 1rem;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
