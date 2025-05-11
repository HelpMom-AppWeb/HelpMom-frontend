<script>
import PatientItem from "./patient-item.component.vue";

export default {
  name: "patient-list",
  components: {PatientItem},
  props: {
    patients: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div v-for="patient in patients" :key="patient.id">
    <patient-item :patient="patient"></patient-item>
  </div>
</template>

<style scoped>

</style>