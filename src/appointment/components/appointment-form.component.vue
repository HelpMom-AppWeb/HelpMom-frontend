<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  selectedDate: Date
});

const emit = defineEmits(['appointment-created', 'cancel']);

const form = ref({
  doctorId: '',
  specialty: '',
  date: props.selectedDate.toISOString().split('T')[0],
  time: '09:00',
  description: ''
});

const doctors = ref([]);
const loading = ref(false);
const error = ref(null);

// Cargar doctores desde db.json
const fetchDoctors = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await axios.get('http://localhost:3000/doctors');
    doctors.value = response.data;
  } catch (err) {
    console.error('Error al cargar doctores:', err);
    error.value = 'Failed to load doctors. Please try again later.';
    // Datos de prueba por si falla la API
    doctors.value = [
      { id: 1, name: "Dr. Smith", specialty: "Pediatría" },
      { id: 2, name: "Dr. Johnson", specialty: "Ginecología" },
      { id: 3, name: "Dr. Williams", specialty: "Cardiología" }
    ];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDoctors();
});

const specialties = computed(() => {
  const uniqueSpecialties = new Set();
  doctors.value.forEach(doctor => uniqueSpecialties.add(doctor.specialty));
  return Array.from(uniqueSpecialties);
});

const filteredDoctors = computed(() => {
  if (!form.value.specialty) return doctors.value;
  return doctors.value.filter(doctor => doctor.specialty === form.value.specialty);
});

const timeSlots = ref([
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
]);

const submitAppointment = async () => {
  try {
    const selectedDoctor = doctors.value.find(d => d.id == form.value.doctorId);

    if (!selectedDoctor) {
      throw new Error('Please select a valid doctor');
    }

    const appointmentData = {
      doctor: selectedDoctor.name,
      specialty: form.value.specialty,
      date: form.value.date,
      time: form.value.time,
      description: form.value.description,
      doctorId: form.value.doctorId,
      patientId: 1 // Esto debería venir de la autenticación en una app real
    };

    await axios.post('http://localhost:3000/appointments', appointmentData);
    emit('appointment-created');
  } catch (error) {
    console.error('Error creating appointment:', error);
    alert('Error creating appointment: ' + error.message);
  }
};
</script>

<template>
  <div class="appointment-form">
    <h2>{{ $t("appointments.appointmentForm.title")}}</h2>

    <form @submit.prevent="submitAppointment">
      <div class="form-group">
        <label>{{ $t("appointments.appointmentForm.labels.specialty")}}</label>
        <select v-model="form.specialty" required>
          <option value="">{{ $t("appointments.appointmentForm.placeholders.specialty")}}</option>
          <option v-for="specialty in specialties" :key="specialty" :value="specialty">
            {{ specialty }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>{{ $t("appointments.appointmentForm.labels.doctor")}}</label>
        <select v-model="form.doctorId" required :disabled="!form.specialty">
          <option value="">{{ $t("appointments.appointmentForm.placeholders.doctor")}}</option>
          <option v-for="doctor in filteredDoctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }} ({{ doctor.specialty }})
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>{{ $t("appointments.appointmentForm.labels.date")}}</label>
        <input type="date" v-model="form.date" required>
      </div>

      <div class="form-group">
        <label>{{ $t("appointments.appointmentForm.labels.time")}}</label>
        <select v-model="form.time" required>
          <option v-for="time in timeSlots" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>{{ $t("appointments.appointmentForm.labels.description")}}</label>
        <textarea v-model="form.description" :placeholder="$t('appointments.appointmentForm.placeholders.description')"></textarea>
      </div>

      <div class="form-actions">
        <button type="button" class="cancel" @click="emit('cancel')">{{ $t("appointments.appointmentForm.buttons.cancel")}}</button>
        <button type="submit" class="submit">{{ $t("appointments.appointmentForm.buttons.save")}}</button>
      </div>
    </form>

    <!-- Sección para mostrar y eliminar citas existentes -->
    <div class="existing-appointments" v-if="appointments && appointments.length > 0">
      <h3>Existing Appointments</h3>
      <ul>
        <li v-for="appointment in appointments" :key="appointment.id">
          <div class="appointment-info">
            <p><strong>Doctor:</strong> {{ appointment.doctor }}</p>
            <p><strong>Date:</strong> {{ appointment.date }}</p>
            <p><strong>Time:</strong> {{ appointment.time }}</p>
            <p><strong>Description:</strong> {{ appointment.description }}</p>
          </div>
          <button class="delete-btn" @click="deleteAppointment(appointment.id)">Delete</button>
        </li>
      </ul>
    </div>
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