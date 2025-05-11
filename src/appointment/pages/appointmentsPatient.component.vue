<template>
  <div class="patient-appointments">
    <h1 class="page-title">My Medical Appointments</h1>

    <div class="controls">
      <div class="filter-controls">
        <Calendar v-model="filterDate" view="month" dateFormat="yy-mm-dd" :showIcon="true"
                  @date-select="filterByDate" placeholder="Filter by month" selectionMode="single" />
        <Button label="Mostrar todas" @click="resetFilter" class="p-button-text" />
      </div>
      <ToggleButton v-model="calendarView" onLabel="Calendar View" offLabel="List View"
                    onIcon="pi pi-calendar" offIcon="pi pi-list" />
    </div>

    <div v-if="loading" class="loading">
      <ProgressSpinner />
    </div>

    <div v-else>
      <!-- Vista Calendario Simplificado -->
      <div v-if="calendarView" class="simple-calendar">
        <FullCalendar ref="calendar" :options="calendarOptions" />
      </div>

      <!-- Vista Lista -->
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
                <span>{{ appointment.description || 'Sin descripción' }}</span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useToast } from 'primevue/usetoast';


import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';

const toast = useToast();
const appointments = ref([]);
const loading = ref(true);
const filterDate = ref();
const calendarView = ref(true);
const patientId = ref(1); // En producción, obtener del sistema de autenticación

const fetchAppointments = async () => {
  try {

    appointments.value = [{
      id: 1,
      doctor: "Dr. Prueba",
      specialty: "Cardiología",
      date: "2025-05-25",
      time: "11:00",
      description: "Cita de prueba estática",
      start: "2025-05-25T11:00:00"
    }];

    loading.value = true;
    const response = await axios.get('http://localhost:3000/appointments', {
      params: {
        patientId: patientId.value,
        _sort: 'date,time',
        _order: 'asc'
      }
    });

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Formato de datos inválido');
    }

    appointments.value = response.data.map(app => {
      if (!app.date || !app.time) {
        console.warn('Cita con formato inválido:', app);
        return null;
      }
      return {
        ...app,
        start: `${app.date}T${app.time.includes(':') ? app.time : app.time + ':00'}`
      };
    }).filter(Boolean);

  } catch (error) {
    console.error('Error completo:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `Error al cargar citas: ${error.message}`,
      life: 5000
    });
  } finally {
    loading.value = false;
  }
};

const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: ''
  },
  events: computed(() => {
    return appointments.value.map(app => ({
      id: app.id,
      title: `${app.specialty} - Dr. ${app.doctor.split(' ')[1]}`,
      start: app.start,
      extendedProps: {
        description: app.description,
        fullDoctor: app.doctor
      }
    }));
  }),
  eventClick: (info) => {
    toast.add({
      severity: 'info',
      summary: `Cita con ${info.event.extendedProps.fullDoctor}`,
      detail: `
        Fecha: ${info.event.start.toLocaleDateString('es-ES')}
        Hora: ${info.event.start.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}
        ${info.event.extendedProps.description ? 'Motivo: ' + info.event.extendedProps.description : ''}
      `,
      life: 5000
    });
  }
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

.simple-calendar {
  background: #ffc8da;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}


:deep(.fc) {
  max-height: 600px;
}

:deep(.fc-event) {
  cursor: pointer;
  padding: 3px 5px;
  margin: 2px 0;
  border-radius: 4px;
  background-color: var(#f6b0b0);
  border-color: var(#000000);
}

:deep(.fc-event-content) {
  padding: 2px;
  font-size: 0.85em;
}

:deep(.fc-event-time) {
  font-weight: bold;
}

.appointments-list {
  display: grid;
  gap: 15px;
}

.appointment-card {
  transition: transform 0.2s;
}

.appointment-card:hover {
  transform: translateY(-3px);
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
  color: var(#fff3f3);
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