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
const patientId = ref(1);

const dummyAppointments = [
  {
    id: 1,
    doctor: "Dr. Smith",
    specialty: "Pediatría",
    date: "2025-05-15",
    time: "10:00",
    description: "Control anual",
    patientId: 1,
    patientName: "Juan Pérez"
  },
  {
    id: 2,
    doctor: "Dr. Johnson",
    specialty: "Ginecología",
    date: "2025-05-20",
    time: "14:30",
    description: "Consulta de rutina",
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
        ? response.data.map(app => ({
          ...app,
          start: `${app.date}T${app.time}:00`
        }))
        : dummyAppointments;

  } catch (error) {
    console.error('Error:', error);
    appointments.value = dummyAppointments;
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al cargar citas',
      life: 5000
    });
    appointments.value = [
      {
        "id": 1,
        "doctor": "Dr. Smith",
        "specialty": "Pediatrics",
        "date": "2025-05-15",
        "time": "10:00",
        "description": "Anual control",
        "patientId": 1,
        "patientName": "Juan Pérez"
      },
      {
        "id": 1,
        "doctor": "Dr. Johnson",
        "specialty": "Gynecology",
        "date": "2025-05-20",
        "time": "14:30",
        "description": "Consulta de rutina",
        "patientId": 1,
        "patientName": "Juan Pérez"
      },
      {
        "id": 1,
        "doctor": "Dr. Williams",
        "specialty": "Cardiology",
        "date": "2025-06-10",
        "time": "11:00",
        "description": "Electrocardiograma",
        "patientId": 1,
        "patientName": "Juan Pérez"
      }
    ];
  } finally {
    loading.value = false;
  }
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

const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: ''
  },
  events: computed(() => {
    return filteredAppointments.value.map(app => ({
      id: app.id,
      title: `${app.specialty} - ${app.doctor}`,
      start: app.start,
      extendedProps: {
        description: app.description,
        doctor: app.doctor
      }
    }));
  }),
  eventClick: (info) => {
    toast.add({
      severity: 'info',
      summary: `Cita con ${info.event.extendedProps.doctor}`,
      detail: `
        Fecha: ${info.event.start.toLocaleDateString('es-ES')}
        Hora: ${info.event.start.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}
        ${info.event.extendedProps.description ? 'Motivo: ' + info.event.extendedProps.description : ''}
      `,
      life: 5000
    });
  }
};

const filterByDate = () => {
  // El filtrado ya se maneja en la computed property filteredAppointments
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
  background: #ff98a8;
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
  color: var(#070707);
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