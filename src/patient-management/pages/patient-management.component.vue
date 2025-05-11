<script>
import PatientListComponent from "../components/patient-list.component.vue";
import {PatientApiService} from "../services/patient-api.service.js";
import {PatientAssembler} from "../services/patient.assembler.js";

export default {
  name: "patient-management",
  components: {PatientList: PatientListComponent},
  data() {
    return {
      patients: [],
      patientsApi: new PatientApiService()
    }
  },
  methods: {
    getPatients() {
      this.patientsApi.getAll()
        .then((response) => {
          console.log(response);
          this.patients = PatientAssembler.toEntitiesFromResponse(response);
        })
        .catch((error) => {
        this.errors.push(error);
       });
    },
    created() {
      this.getPatients();
    }
  }
}
</script>

<template>
  <div>
    <p>Patient List</p>
  </div>

  <patient-list v-model:patients="patients"></patient-list>
</template>

<style scoped>

</style>