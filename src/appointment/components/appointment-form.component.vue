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
    doctors.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDoctors();
});

// Obtener especialidades únicas
const specialties = computed(() => {
  const uniqueSpecialties = new Set();
  doctors.value.forEach(doctor => uniqueSpecialties.add(doctor.specialty));
  return Array.from(uniqueSpecialties);
});

// Filtrar doctores por especialidad seleccionada
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
    <h2>Schedule New Appointment</h2>

    <form @submit.prevent="submitAppointment">
      <div class="form-group">
        <label>Specialty</label>
        <select v-model="form.specialty" required>
          <option value="">Select a specialty</option>
          <option v-for="specialty in specialties" :key="specialty" :value="specialty">
            {{ specialty }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Doctor</label>
        <select v-model="form.doctorId" required :disabled="!form.specialty">
          <option value="">Select a doctor</option>
          <option v-for="doctor in filteredDoctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }} ({{ doctor.specialty }})
          </option>
        </select>
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

h2 {
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
</style>