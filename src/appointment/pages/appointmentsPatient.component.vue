<template>
  <div class="patient-appointments">
    <h1 class="page-title">My medical appointments</h1>

    <div v-if="loading" class="loading">
      <ProgressSpinner />
    </div>

    <div v-else>
      <div v-if="appointments.length === 0" class="no-appointments">
        <p>You do not have any appointments scheduled.</p>
      </div>

      <div v-else class="appointments-list">
        <Card v-for="appointment in appointments" :key="appointment.id" class="appointment-card">
          <template #title>
            {{ formatDate(appointment.date) }} - {{ appointment.time }}
          </template>
          <template #subtitle>
            {{ appointment.specialty }}
          </template>
          <template #content>
            <div class="appointment-details">
              <div class="detail">
                <span class="detail-label">Doctor:</span>
                <span>{{ appointment.doctor }}</span>
              </div>
              <div class="detail">
                <span class="detail-label">Descripción:</span>
                <span>{{ appointment.description || 'No especificada' }}</span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';

const appointments = ref([]);
const loading = ref(true);
const patientId = ref(1); // En una app real, esto vendría de la autenticación

const fetchPatientAppointments = async () => {
  try {
    loading.value = true;
    const response = await axios.get('http://localhost:3000/appointments?patientId=' + patientId.value);
    appointments.value = response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

onMounted(() => {
  fetchPatientAppointments();
});
</script>

<style scoped>
.patient-appointments {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 50px;
}

.no-appointments {
  text-align: center;
  padding: 40px;
  font-size: 1.1em;
  color: #666;
}

.appointments-list {
  display: grid;
  gap: 20px;
}

.appointment-card {
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.appointment-details {
  display: grid;
  gap: 10px;
}

.detail {
  display: flex;
}

.detail-label {
  font-weight: bold;
  min-width: 120px;
}
</style>