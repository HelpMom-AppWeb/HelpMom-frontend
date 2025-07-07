<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AppointmentCalendar from '../components/appointment-calendar.component.vue';
import AppointmentForm from '../components/appointment-form.component.vue';

const appointments = ref([]);
const showForm = ref(false);
const selectedDate = ref(new Date());
const backendAvailable = ref(true);

const fetchAppointments = async () => {
  try {
    // Primero intentamos con el backend real
    const response = await axios.get('https://help-mom-platform.azurewebsites.net/api/v1/appointment');
    appointments.value = response.data;
    backendAvailable.value = true;
  } catch (error) {
    console.error('Error fetching from backend, using dummy data:', error);
    backendAvailable.value = false;

    // Si falla, cargamos datos dummy del db.json
    try {
      const dummyResponse = await axios.get('/server/db.json'); // Ajusta la ruta según tu estructura
      appointments.value = dummyResponse.data.appointments || [];
      console.log('Using dummy data:', appointments.value);
    } catch (dummyError) {
      console.error('Error loading dummy data:', dummyError);
      appointments.value = [];
    }
  }
};

const handleDateSelect = (date) => {
  console.log('Fecha recibida en parent:', date); // Verificar en consola
  selectedDate.value = date;
  showForm.value = true; // Asegurarse de mostrar el formulario
};

const onDateClick = (info) => {
  emit('date-selected', info.dateStr);
};

const handleAppointmentCreated = () => {
  showForm.value = false;
  fetchAppointments();
};

onMounted(() => {
  fetchAppointments();
});
</script>

<template>
  <div class="appointment-page">
    <h1 class="page-title">Medical Appointments</h1>
    <div v-if="!backendAvailable" class="warning-banner">
      ⚠️ Currently using dummy data (backend unavailable)
    </div>

    <div class="appointment-container">
      <AppointmentCalendar
          :appointments="appointments"
          :selectedDate="selectedDate"
          @date-selected="handleDateSelect"
      />
      <AppointmentForm
          v-if="showForm"
          :selectedDate="selectedDate"
          :backendAvailable="backendAvailable"
          @appointment-created="handleAppointmentCreated"
          @cancel="showForm = false"
      />
      <fullCalendar
          :options="calendarOptions"
          @dateClick="onDateClick"
      />
    </div>
  </div>
</template>


<style scoped>


.warning-banner {
  background-color: #fff3cd;
  color: #856404;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
  border: 1px solid #ffeeba;
}
.appointment-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #dd8794;
}

.appointment-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .appointment-container {
    grid-template-columns: 1fr;
  }
}
</style>