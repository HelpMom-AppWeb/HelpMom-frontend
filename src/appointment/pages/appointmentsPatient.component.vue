<template>
  <div class="patient-appointments">
    <h1 class="page-title">My Medical Appointments</h1>

    <div class="controls">
      <div class="filter-controls">
        <Calendar v-model="filterDate" view="month" dateFormat="yy-mm-dd" :showIcon="true"
                  @date-select="filterByDate" placeholder="Filter by month" selectionMode="single" />
        <Button label="Show all" @click="resetFilter" class="p-button-text" />
      </div>
    </div>

    <div v-if="loading" class="loading">
      <ProgressSpinner />
    </div>

    <div v-else class="appointments-list">
      <Card v-for="appointment in filteredAppointments" :key="appointment.id" class="appointment-card">
        <template #title>
          {{ formatDate(appointment.date) }} - {{ appointment.time }}
        </template>
        <template #content>
          <div class="appointment-details">
            <div class="detail">
              <i class="pi pi-user-md"></i>
              <span>{{ appointment.doctor }} ({{ appointment.specialty }})</span>
            </div>
            <div class="detail">
              <i class="pi pi-info-circle"></i>
              <span>{{ appointment.description || 'No description' }}</span>
            </div>
          </div>
        </template>
        <template #footer>
          <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDelete(appointment)" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';

const toast = useToast();
const confirm = useConfirm();
const appointments = ref([]);
const loading = ref(true);
const filterDate = ref();
const patientId = ref(1);

const dummyAppointments = [
  {
    id: 1,
    doctor: "Dr. Smith",
    specialty: "Pediatrics",
    date: "2025-05-15",
    time: "10:00",
    description: "Annual checkup",
    patientId: 1,
    patientName: "Juan Pérez"
  },
  {
    id: 2,
    doctor: "Dr. Johnson",
    specialty: "Gynecology",
    date: "2025-05-20",
    time: "14:30",
    description: "Routine consultation",
    patientId: 1,
    patientName: "Juan Pérez"
  }
];

const fetchAppointments = async () => {
  try {
    loading.value = true;
    const response = await axios.get('http://localhost:3000/appointments', {
      params: { patientId: patientId.value }
    });

    appointments.value = response.data.length > 0
        ? response.data
        : dummyAppointments;

  } catch (error) {
    console.error('Error:', error);
    appointments.value = dummyAppointments;
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error loading appointments',
      life: 5000
    });
    appointments.value = [

    ];
  } finally {
    loading.value = false;
  }
};

const deleteAppointment = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/appointments/${id}`);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Appointment deleted successfully',
      life: 5000
    });
    fetchAppointments();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error deleting appointment',
      life: 5000
    });
  }
};

const confirmDelete = (appointment) => {
  confirm.require({
    message: `Are you sure you want to delete your appointment with ${appointment.doctor} on ${formatDate(appointment.date)}?`,
    header: 'Confirm Deletion',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      deleteAppointment(appointment.id);
    }
  });
};

const filteredAppointments = computed(() => {
  if (!filterDate.value) return appointments.value;

  const month = filterDate.value.getMonth() + 1;
  const year = filterDate.value.getFullYear();

  return appointments.value.filter(app => {
    const appDate = new Date(app.date);
    return appDate.getMonth() + 1 === month &&
        appDate.getFullYear() === year;
  });
});

const filterByDate = () => {
};

const resetFilter = () => {
  filterDate.value = null;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES');
};

onMounted(fetchAppointments);
</script>

<style scoped>
.patient-appointments {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.filter-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 50px;
}

.appointments-list {
  display: grid;
  gap: 15px;
}

.appointment-card {
  background: #FFB6C1;
  transition: transform 0.2s;
  border: 1px solid #e0e0e0;
}

.appointment-card,
.appointment-card * {
  color: #000000 !important;
}

.appointment-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.appointment-details {
  display: grid;
  gap: 8px;
}

.detail {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail i {
  color: #6c757d;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>