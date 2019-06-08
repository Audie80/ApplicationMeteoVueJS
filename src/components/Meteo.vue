<template>
  <div>
    <div class="encartCity">
      id: {{ prevCity.id }} - {{ prevCity.name }}
      <br />
      latitude : {{ prevCity.coord.lat }} - longitude : {{ prevCity.coord.lon }}
      <br />
      pays : {{ prevCity.country }} - population : {{ prevCity.population }}
    </div>
    <br />
    <h2>Prévisions 3h par 3h :</h2>
    <ul class="encartTemp">
      <li
      v-for="(prevision, index) of prevList"
          :key="index">
        {{ prevision.dt_txt }} - {{ prevision.main.temp }}°C - {{ prevision.main.humidity }}% - {{ prevision.weather[0].description }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Meteo',
  props: {
    prevCity: Object,
    prevList: Array
  },
}
</script>

<style scoped>
  .encartCity {
    width: 50%;
    margin: 0 auto;
    border: 2px solid orange;
    padding: 10px;
  }
  ul {
    list-style: none;
  }
</style>