<script>
import PatientItem from "./patient-item.component.vue";
import Button from "primevue/button";

export default {
  name: "patient-list",
  components: {Button, PatientItem},
  props: {
    patients: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="flex flex-column" v-for="patient in patients" :key="patient.id">
    <patient-item :patient="patient"></patient-item>
  </div>

  <div style="position: fixed; bottom: 50px; right: 90px;">
    <router-link to="/about">
      <Button :label="$t('patientManagement.buttons.addPatient')"
              style="background-color: #BDFFB3; border-color: #000000; color: #000000;
              width: 200px; height: 80px; border-radius: 20px"
              icon="pi pi-plus" iconPos="right" />
    </router-link>
  </div>
</template>

<style scoped>

</style>