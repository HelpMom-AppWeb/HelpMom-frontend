<script setup>
import { ref, computed } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const emit = defineEmits(['date-selected']);
const props = defineProps({
  appointments: Array
});

// Configuración del calendario
const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,

  // Manejo del clic en fechas (nivel raíz de las opciones)
  dateClick: (arg) => {
    emit('date-selected', arg.date);
    // Asegurarse de que la fecha se emite correctamente
    console.log('Fecha seleccionada:', arg.date);
  },

  events: computed(() => {
    return props.appointments.map(appointment => ({
      id: appointment.id,
      title: `${appointment.doctorName} - ${appointment.patientName}`,
      start: `${appointment.date}T${appointment.time}:00`, // Añadir segundos para FullCalendar
      backgroundColor: '#ff98a8',
      borderColor: '#0c0c0c',
      textColor: '#ffffff',
      extendedProps: {
        description: appointment.description,
        doctor: appointment.doctorName || appointment.doctor,
        patientName: appointment.patientName
      }
    }));
  }),

  eventClick: (info) => {
    toast.add({
      severity: 'info',
      summary: 'Detalles de la cita',
      detail: `
        Doctor: ${info.event.extendedProps.doctor}
        Fecha: ${info.event.start.toLocaleDateString()}
        Hora: ${info.event.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        Paciente: ${info.event.extendedProps.patientName}
        Descripción: ${info.event.extendedProps.description || 'N/A'}
      `,
      life: 5000
    });
  }
});
</script>

<template>
  <div class="calendar-container">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<style>
.calendar-container {
  background: #ffc8da;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Estilos para los eventos del calendario */
.fc-event {
  cursor: pointer;
  border-radius: 4px;
  margin: 1px 2px;
  padding: 0 4px;
}

.fc-daygrid-event-dot {
  display: none;
}
</style>