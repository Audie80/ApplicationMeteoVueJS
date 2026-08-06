<template>
  <div>
    <form @submit.prevent="search">
      <div class="form">
        <input type="text" v-model="cityField" placeholder="Entrez une ville" />
      </div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <br />
      <div class="form">
        <input class="submit" type="submit" :disabled="!cityFieldTrimmed" />
      </div>
    </form>
    <button @click="clear">x</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  appid: String
})
const emit = defineEmits(['sendResult', 'destroyResult'])

const cityField = ref('')
const errorMessage = ref('')
const cityFieldTrimmed = computed(() => cityField.value.trim())
const url = computed(() => {
  const city = encodeURIComponent(`${cityFieldTrimmed.value},fr`)
  return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=${props.appid}`
})

async function search() {
  if (!cityFieldTrimmed.value) {
    errorMessage.value = 'Veuillez saisir un nom de ville valide.'
    return
  }

  try {
    const response = await fetch(url.value)
    const result = await response.json()

    if (!response.ok) {
      errorMessage.value = result.message || 'Erreur OpenWeather'
      emit('sendResult', { cod: result.cod || response.status, message: errorMessage.value })
      return
    }

    errorMessage.value = ''
    emit('sendResult', result)
  } catch (error) {
    errorMessage.value = error?.message || 'Erreur réseau'
    emit('sendResult', { cod: 500, message: errorMessage.value })
  }
}

function clear() {
  cityField.value = ''
  errorMessage.value = ''
  emit('destroyResult')
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