<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import {PatientService} from "../services/patient.service.js";
import {Patient} from "../model/patient.entity.js";
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
  baby: {
    name: '',
    birthDate: '',
    gender: ''
  }
});
const doctorName = ref("");

onMounted(() => {
  patientService.getPatientById(patientId)
      .then(response => {
        patient.value = response.data;
        return doctorService.getDoctorById(patient.value.assignedDoctorId);
      })
      .then(response => {
        const doctor = response.data;
        doctorName.value = doctor.name;
      })
      .catch(error => {
        console.error('Error al cargar datos:', error);
      });
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
        <pv-input-text id="assigned-doctor" v-model="doctorName" disabled placeholder="Assigned Doctor" type="text" class="w-full" />
      </div>
    </div>
    <router-link to="/patient-management/patients">
      <pv-button label="Go Back" icon="pi pi-arrow-left" class="m-6"/>
    </router-link>
  </div>
</template>

<style scoped>

</style>