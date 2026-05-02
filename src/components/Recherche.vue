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

<script setup>
import { ref, computed } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  appid: String
})
const emit = defineEmits(['sendResult', 'destroyResult'])

const cityField = ref('')
const url = computed(() => `https://api.openweathermap.org/data/2.5/forecast?q=${cityField.value},fr&units=metric&lang=fr&APPID=${props.appid}`)

function search() {
  fetch(url.value)
    .then((response) => response.json())
    .catch((error) => error)
    .then((result) => {
      emit('sendResult', result)
    })
    .catch((error) => error)
}

function clear() {
  cityField.value = ''
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