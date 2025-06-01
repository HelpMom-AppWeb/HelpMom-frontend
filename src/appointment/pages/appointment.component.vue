<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AppointmentCalendar from '../components/appointment-calendar.component.vue';
import AppointmentForm from '../components/appointment-form.component.vue';

const appointments = ref([]);
const showForm = ref(false);
const selectedDate = ref(new Date());
const doctors = ref([]);

const fetchAppointments = async () => {
  try {
    const response = await axios.get('http://localhost:3000/appointments');
    appointments.value = response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
  }
};

const handleDateSelect = (date) => {
  selectedDate.value = date;
  showForm.value = true;
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

    <div class="appointment-container">
      <AppointmentCalendar
          :appointments="appointments"
          :selectedDate="selectedDate"
          @date-selected="handleDateSelect"
      />
      <AppointmentForm
          v-if="showForm"
          :selectedDate="selectedDate"
          :doctors="doctors"
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