<script>
import { defineComponent } from 'vue';
import { PatientService } from "../services/patient.service.js";
import { DoctorService } from "../services/doctor.service.js";

export default defineComponent({
  name: 'PatientInfoComponent',
  props: {
    patientId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      patient: {
        name: '',
        email: '',
        phone: '',
        assignedDoctorId: null,
        baby: {
          name: '',
          birthDate: '',
          gender: ''
        }
      },
      doctorName: ""
    };
  },
  methods: {
    async fetchPatientData() {
      try {
        const patientService = new PatientService();
        const doctorService = new DoctorService();

        const patientResponse = await patientService.getPatientById(this.patientId);
        this.patient = patientResponse.data;

        if (this.patient.assignedDoctorId) {
          const doctorResponse = await doctorService.getDoctorById(this.patient.assignedDoctorId);
          this.doctorName = doctorResponse.data.name;
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  },
  mounted() {
    this.fetchPatientData();
  }
});
</script>

<template>
  <div class="w-full">
    <div class="grid gap-3 m-6 border">
      <div class="col-12 md:col-6">
        <label for="personal-name" class="block font-medium mb-2">Personal Name</label>
        <pv-input-text
            id="personal-name"
            v-model="patient.name"
            disabled
            placeholder="Patient Name"
            type="text"
            class="w-full"
        />
      </div>
      <div class="col-12 md:col-6">
        <label for="personal-email" class="block font-medium mb-2">Personal Email</label>
        <pv-input-text
            id="personal-email"
            v-model="patient.email"
            disabled
            placeholder="Patient Email"
            type="text"
            class="w-full"
        />
      </div>
      <div class="col-12 md:col-6">
        <label for="personal-phone" class="block font-medium mb-2">Personal Phone</label>
        <pv-input-text
            id="personal-phone"
            v-model="patient.phone"
            disabled
            placeholder="Patient Phone"
            type="text"
            class="w-full"
        />
      </div>
      <div class="col-12 md:col-6">
        <label for="baby-name" class="block font-medium mb-2">Baby Name</label>
        <pv-input-text
            id="baby-name"
            v-model="patient.baby.name"
            disabled
            placeholder="Baby's Name"
            type="text"
            class="w-full"
        />
      </div>
      <div class="col-12 md:col-6">
        <label for="baby-birth-date" class="block font-medium mb-2">Baby's Birth Date</label>
        <pv-input-text
            id="baby-birth-date"
            v-model="patient.baby.birthDate"
            disabled
            placeholder="Baby's Birth Date"
            type="text"
            class="w-full"
        />
      </div>
      <div class="col-12 md:col-6">
        <label for="assigned-doctor" class="block font-medium mb-2">Assigned Doctor</label>
        <pv-input-text
            id="assigned-doctor"
            v-model="doctorName"
            disabled
            placeholder="Assigned Doctor"
            type="text"
            class="w-full"
        />
      </div>
    </div>
    <router-link to="/patient-management/patients">
      <pv-button label="Go Back" icon="pi pi-arrow-left" class="m-6"/>
    </router-link>
  </div>
</template>

<style scoped>
/* Add your component-specific styles here */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.border {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.m-6 {
  margin: 1.5rem;
}
</style>