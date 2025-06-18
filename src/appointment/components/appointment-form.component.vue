<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  selectedDate: Date
});

const emit = defineEmits(['appointment-created', 'cancel']);

const form = ref({
  doctorId: '',
  doctorName:'',
  date: props.selectedDate.toISOString().split('T')[0],
  time: '09:00',
  description: '',
  patientId: '',
  patientName: ''
});

const doctors = ref([
  { id: 1, name: "Dr. Smith" },
  { id: 2, name: "Dr. Johnson" },
  { id: 3, name: "Dr. Williams" },
  { id: 4, name: "Dr. Brown" },
  { id: 5, name: "Dr. Garcia" }
]);

const timeSlots = ref([
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
]);

const submitAppointment = async () => {
  try {
    const selectedDoctor = doctors.value.find(d => d.id == form.value.doctorId);

    if (!selectedDoctor) {
      throw new Error('Por favor selecciona un doctor válido');
    }
    if (!form.value.patientName) {
      throw new Error('Por favor ingresa el nombre del paciente');
    }

    const appointmentData = {
      doctor: selectedDoctor.name,
      DoctorName: selectedDoctor.name, // <- Agregado para cumplir con la validación del backend
      date: form.value.date,
      time: form.value.time,
      description: form.value.description,
      doctorId: Number(form.value.doctorId),
      patientName: form.value.patientName
    };


    await axios.post('http://localhost:5128/api/v1/appointment', appointmentData);
    alert('Cita creada exitosamente');
    emit('appointment-created');
  } catch (error) {
    console.error('Error creando cita:', error);
    if (error.response && error.response.data) {
      alert('Error creando cita: ' + JSON.stringify(error.response.data));
    } else {
      alert('Error creando cita: ' + error.message);
    }
  }
};
</script>

<template>
  <div class="appointment-form">
    <h2>Schedule New Appointment</h2>
    <form @submit.prevent="submitAppointment">
      <div class="form-group">
        <label>Doctor</label>
        <select v-model="form.doctorId" required>
          <option value="">Select a doctor</option>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Patient Name</label>
        <input type="text" v-model="form.patientName" required>
      </div>
      <div class="form-group">
        <label>Date</label>
        <input type="date" v-model="form.date" required>
      </div>
      <div class="form-group">
        <label>Time</label>
        <select v-model="form.time" required>
          <option v-for="time in timeSlots" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Description</label>
        <textarea v-model="form.description" placeholder="Brief description of the reason for the appointment"></textarea>
      </div>

      <div class="form-actions">
        <button type="button" class="cancel" @click="emit('cancel')">Cancel</button>
        <button type="submit" class="submit">Schedule Appointment</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.appointment-form {
  background: #fdd5dc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2, h3 {
  margin-top: 0;
  color: #2c2a2a;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

select, input, textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

textarea {
  min-height: 80px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.cancel {
  background: #353535;
  color: #ffffff;
}

.submit {
  background: #ff98a8;
  color: white;
}

.submit:hover {
  background: #3aa876;
}

.existing-appointments {
  margin-top: 30px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
}

.existing-appointments ul {
  list-style: none;
  padding: 0;
}

.existing-appointments li {
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.appointment-info {
  flex: 1;
}

.delete-btn {
  background: #ff4d4d;
  color: white;
  margin-left: 15px;
}

.delete-btn:hover {
  background: #cc0000;
}
</style>