<script setup>
import { ref } from 'vue';

// Peso fetal
const fetalWeightSeries = ref([{ name: "Estimated weight (g)", data: [1, 4, 20, 100, 300, 600, 1200, 1800, 2500, 3200] }]);
const fetalWeightOptions = ref({
  chart: { id: "fetal-growth-line" },
  xaxis: { title: { text: "Week of gestation" }, categories: ["6", "8", "10", "12", "16", "20", "24", "28", "32", "36"] },
  colors: ['#8c00ff'],
  yaxis: { title: { text: "Weight (g)" } }
});

// Frecuencia cardíaca
const heartRateSeries = ref([{ name: "Heart Rate", data: [90, 120, 140, 150, 145, 140, 135] }]);
const heartRateOptions = ref({
  chart: { id: "fetal-heart-rate" },
  xaxis: { title: { text: "Week of gestation" }, categories: ["6", "8", "10", "12", "14", "16", "18"] },
  colors: ['#8c00ff'],
  yaxis: { title: { text: "Beats per minute" } }
});

// Estadísticas
const fetalStatsSeries = ref([{ name: "Week 24", data: [1300, 150, 25] }]);
const fetalStatsOptions = ref({
  chart: { type: "radar" },
  labels: ["Weight (g)", "Heart Rate (bpm)", "Lenght (cm)"]
});
</script>



<template>
  <div>
    <h2>Fetal development</h2>
    <apexchart type="line" :options="fetalWeightOptions" :series="fetalWeightSeries" height="300" />

    <h2>Fetal heart rate</h2>
    <apexchart type="line" :options="heartRateOptions" :series="heartRateSeries" height="300" />

    <h2>Parameter Summary</h2>
    <apexchart type="radar" :options="fetalStatsOptions" :series="fetalStatsSeries" height="300" />
  </div>
</template>

<style scoped>

</style>