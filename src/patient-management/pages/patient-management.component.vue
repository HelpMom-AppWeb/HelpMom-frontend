<script>
import PatientListComponent from "../components/patient-list.component.vue";
import {PatientApiService} from "../services/patient-api.service.js";
import {PatientAssembler} from "../services/patient.assembler.js";

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
      patientsApi: new PatientApiService()
    }
  },
  methods: {
    getPatients() {
      this.patientsApi.getAll()
        .then((response) => {
          console.log(response);
          //this.patients = PatientAssembler.toEntitiesFromResponse(response);
        })
        .catch((error) => {
        this.errors.push(error);
       });
    }
  },
  created() {
    this.getPatients();
  }
}
</script>

<template>
  <div class="flex flex-column gap-3 p-7">
    <p>Patient List</p>
    <div class="">
      <patient-list v-model:patients="patients"></patient-list>
    </div>
  </div>


</template>

<style scoped>

</style>