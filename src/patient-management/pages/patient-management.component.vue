<script>
import PatientListComponent from "../components/patient-list.component.vue";
import {PatientApiService} from "../services/patient-api.service.js";
import {PatientAssembler} from "../services/patient.assembler.js";
import {DoctorService} from "../services/doctor.service.js";

export default {
  name: "patient-management",
  components: {PatientList: PatientListComponent},
  data() {
    return {
      patients: [],
      patientsApi: new PatientApiService(),
      doctorsApi: new DoctorService(),
      doctorId: 1
    }
  },
  methods: {
    getPatientsByActiveDoctorId(doctorId) {
      this.patientsApi.getAll()
          .then((response) => {
            console.log(response);
            this.patients = PatientAssembler.toEntitiesFromResponse(response);
          })
          .catch((error) => {
            this.errors.push(error);
          });
    }
  },
  created() {
    this.getPatientsByActiveDoctorId(this.doctorId);
  }
}
</script>

<template>
  <div class="flex flex-column gap-3 p-7">
    <p>{{ $t("patientManagement.title") }}</p>
    <div class="">
      <patient-list v-model:patients="patients"></patient-list>
    </div>
  </div>


</template>

<style scoped>

</style>