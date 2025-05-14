<script>
import {ref} from "vue";

export default {
  name: "home.component",
  components: {},

  setup() {
    const lineChartSeries = ref([
      {
        name: "sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ]);

    const lineChartOptions = ref({
      chart: {
        id: "basic-line",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997],
      },
    });

    return {
      lineChartSeries,
      lineChartOptions,
    };
  },
}


</script>

<template>
  <div>
    <h2>
      ApexChart Example
    </h2>

    <apexchart width="500" height="300"
        type="line"
        :series="lineChartSeries"
        :options="lineChartOptions"
    />
  </div>
</template>

<style scoped>

</style>