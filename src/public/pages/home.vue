<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Peso fetal
const fetalWeightSeries = ref([{ name: t("dashboard.babyWeight.weightData"), data: [1, 4, 20, 100, 300, 600, 1200, 1800, 2500, 3200] }]);
const fetalWeightOptions = ref({
  chart: { id: "fetal-growth-line" },
  xaxis: { title: { text: t("dashboard.babyWeight.weekAxis") }, categories: ["6", "8", "10", "12", "16", "20", "24", "28", "32", "36"] },
  colors: ['#8c00ff'],
  yaxis: { title: { text: t("dashboard.babyWeight.weightAxis") } }
});

// Frecuencia cardíaca
const heartRateSeries = ref([{ name: t("dashboard.babyHeartRate.heartRateData"), data: [90, 120, 140, 150, 145, 140, 135] }]);
const heartRateOptions = ref({
  chart: { id: "fetal-heart-rate" },
  xaxis: { title: { text: t("dashboard.babyHeartRate.weekAxis") }, categories: ["6", "8", "10", "12", "14", "16", "18"] },
  colors: ['#8c00ff'],
  yaxis: { title: { text: t("dashboard.babyHeartRate.heartRateAxis") } }
});

// Estadísticas
const fetalStatsSeries = ref([{ name: t("dashboard.babyParameters.parameterData"), data: [1300, 150, 25] }]);
const fetalStatsOptions = ref({
  chart: { type: "radar" },
  labels: [t("dashboard.babyParameters.weightAxis"), t("dashboard.babyParameters.heartRateAxis"), t("dashboard.babyParameters.lengthAxis")]
});
</script>



<template>
  <div>
    <h2>{{ $t("dashboard.babyWeight.label") }}</h2>
    <apexchart type="line" :options="fetalWeightOptions" :series="fetalWeightSeries" height="300" />

    <h2>{{ $t("dashboard.babyHeartRate.label")}}</h2>
    <apexchart type="line" :options="heartRateOptions" :series="heartRateSeries" height="300" />

    <h2>{{ $t("dashboard.babyParameters.label")}}</h2>
    <apexchart type="radar" :options="fetalStatsOptions" :series="fetalStatsSeries" height="300" />
  </div>
</template>

<style scoped>

</style>