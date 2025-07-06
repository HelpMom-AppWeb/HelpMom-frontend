<script>
import PatientListComponent from "../components/patient-list.component.vue";
import {PatientService} from "../services/patient.service.js";
import {PatientAssembler} from "../services/patient.assembler.js";
import {DoctorService} from "../services/doctor.service.js";

export default {
  name: "patient-management",
  components: {PatientList: PatientListComponent},
  data() {
    return {
      patients: [
        {
          "id": "1",
          "name": "Lucia Camaro Valenzuela Ramirez",
          "email": "lcvr@hotmail.com",
          "phone": "555-1234",
          "baby": {
            "id": "1111",
            "motherId": "1",
            "name": "Andres Cardenas Valenzuela",
            "birthDate": "2025-05-01",
            "gender": "Male"
          },
          "assignedDoctor": "Maria Perez"
        },
        {
          "id": "2",
          "name": "Maria Lopez",
          "email": "marialopez@hotmail.com",
          "phone": "555-5678",
          "baby": {
            "id": "2222",
            "motherId": "2",
            "name": "Romani Ramirez Lopez",
            "birthDate": "2025-04-29",
            "gender": "Male"
          },
          "assignedDoctor": "Maria Perez"
        },
        {
          "id": "3",
          "name": "Ana Machado Navarro",
          "email": "anamachado@gmail.com",
          "phone": "555-8765",
          "baby": {
            "id": "3333",
            "motherId": "3",
            "name": "Valentina Vasquez Machado",
            "birthDate": "2025-04-29",
            "gender": "Female"
          },
          "assignedDoctor": "Maria Perez"
        },
        {
          "id": "4",
          "name": "Sofia Alvarez Oliva",
          "email": "sofiaalva@gmail.com",
          "phone": "999788888",
          "baby": {
            "id": "4444",
            "motherId": "4",
            "name": "Mateo Alvarez Oliva",
            "birthDate": "2025-04-29",
            "gender": "Male"
          },
          "assignedDoctor": "Maria Perez"
        }
      ],
      patientsApi: new PatientService(),
      doctorsApi: new DoctorService(),
      doctorId: 1
    }
  },
  methods: {
    getPatientsByActiveDoctorId(doctorId) {
      this.patientsApi.getAllPatientsByDoctorId(doctorId)
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
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getPatientsByActiveDoctorId(vm.doctorId);
    });
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
  <div style="position: fixed; bottom: 50px; right: 90px;">
    <router-link to="/doctor/add-patient">
      <pv-button label="Agregar paciente"
                 style="background-color: #BDFFB3; border-color: #000000; color: #000000;
              width: 200px; height: 80px; border-radius: 20px"
                 icon="pi pi-plus" iconPos="right" />
    </router-link>
  </div>


</template>

<style scoped>

</style>