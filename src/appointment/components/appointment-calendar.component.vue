<script setup>
import { ref, computed } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const props = defineProps({
  appointments: Array,
  selectedDate: Date
});

const emit = defineEmits(['date-selected']);

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  initialDate: new Date(),

  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: (arg) => {
    emit('date-selected', arg.start);
  },
  events: computed(() => {
    return props.appointments.map(appointment => ({
      id: appointment.id,
      title: `${appointment.doctor} - ${appointment.specialty}`,
      start: `${appointment.date}T${appointment.time}`,
      extendedProps: {
        description: appointment.description
      }
    }));
  }),
  eventClick: (info) => {
    toast.add({
      severity: 'info',
      summary: 'Detalles de la cita',
      detail: `
        Doctor: ${info.event.extendedProps.doctor}
        Especialidad: ${info.event.extendedProps.specialty}
        Fecha: ${info.event.start.toLocaleDateString()}
        Hora: ${info.event.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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
  background: #ffe7ef;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}


</style>