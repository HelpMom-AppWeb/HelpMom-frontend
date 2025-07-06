<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import {PatientService} from "../services/patient.service.js";
import {DoctorService} from "../services/doctor.service.js";

const route = useRoute();
const patientId = route.params.patientId;
const patientService = new PatientService();
const doctorService = new DoctorService();
const patient = ref({
  name: '',
  email: '',
  phone: '',
  assignedDoctorId: null,
  assignedDoctor: '',
  baby: {
    name: '',
    birthDate: '',
    gender: ''
  }
});

// Datos dummy como fallback
const dummyPatients = [
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
    "assignedDoctor": "Maria Perez",
    "assignedDoctorId": "1"
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
    "assignedDoctor": "Maria Perez",
    "assignedDoctorId": "1"
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
    "assignedDoctor": "Maria Perez",
    "assignedDoctorId": "1"
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
    "assignedDoctor": "Maria Perez",
    "assignedDoctorId": "1"
  }
];

onMounted(async () => {
  try {
    // Intentar obtener datos del backend primero
    const response = await patientService.getPatientById(patientId);
    patient.value = response.data;

    // Obtener nombre del doctor
    if (patient.value.assignedDoctorId) {
      const doctorResponse = await doctorService.getDoctorById(patient.value.assignedDoctorId);
      patient.value.assignedDoctor = doctorResponse.data.name;
    }
  } catch (error) {
    console.error('Error al conectar con el backend, usando datos dummy', error);

    // Fallback a datos dummy
    const dummyPatient = dummyPatients.find(p => p.id === patientId);
    if (dummyPatient) {
      patient.value = {
        ...dummyPatient,
        assignedDoctorId: dummyPatient.assignedDoctorId,
        assignedDoctor: dummyPatient.assignedDoctor
      };
    } else {
      console.error('Paciente no encontrado en datos dummy');
    }
  }
});
</script>

<template>
  <div class="w-full">
    <div class="grid gap-3 m-6 border">
      <div class="col-12 md:col-6">
        <label for="personal-name" class="block font-medium mb-2">Personal Name</label>
        <pv-input-text id="personal-name" v-model="patient.name" disabled placeholder="Patient Name" type="text" class="w-full" />
      </div>
      <div class="col-12 md:col-6">
        <label for="personal-email" class="block font-medium mb-2">Personal Email</label>
        <pv-input-text id="personal-email" v-model="patient.email" disabled placeholder="Patient Email" type="text" class="w-full" />
      </div>
      <div class="col-12 md:col-6">
        <label for="personal-phone" class="block font-medium mb-2">Personal Phone</label>
        <pv-input-text id="personal-phone" v-model="patient.phone" disabled placeholder="Patient Phone" type="text" class="w-full" />
      </div>
      <div class="col-12 md:col-6">
        <label for="baby-name" class="block font-medium mb-2">Baby Name</label>
        <pv-input-text id="baby-name" v-model="patient.baby.name" disabled placeholder="Baby's Name" type="text" class="w-full" />
      </div>
      <div class="col-12 md:col-6">
        <label for="baby-birth-date" class="block font-medium mb-2">Baby's Birth Date</label>
        <pv-input-text id="baby-birth-date" v-model="patient.baby.birthDate" disabled placeholder="Baby's Birth Date" type="text" class="w-full" />
      </div>
      <div class="col-12 md:col-6">
        <label for="assigned-doctor" class="block font-medium mb-2">Assigned Doctor</label>
        <pv-input-text id="assigned-doctor" v-model="patient.assignedDoctor" disabled placeholder="Assigned Doctor" type="text" class="w-full" />
      </div>
    </div>
    <router-link to="/doctor/patient-management">
      <pv-button label="Go Back" icon="pi pi-arrow-left" class="m-6"/>
    </router-link>
  </div>
</template>

<style scoped>
</style>