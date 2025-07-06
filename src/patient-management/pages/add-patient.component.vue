<template>
  <div class="flex justify-content-center align-items-center min-h-screen">
    <pv-card class="w-full md:w-8 lg:w-6 p-4">
      <template #title>
        <h2>Add Patient's Personal Details</h2>
      </template>
      <template #content>
        <div class="grid">
          <div class="col-12 md:col-6">
            <label for="personal-name" class="block font-medium mb-2">Personal Name</label>
            <pv-input-text
                id="personal-name"
                type="text"
                class="w-full"
                v-model="form.nombre"
                placeholder="Lucia Camaro Valenzuela Ramirez"
            />
          </div>
          <div class="col-12 md:col-6">
            <label for="personal-email" class="block font-medium mb-2">Email</label>
            <pv-input-text
                id="personal-email"
                type="email"
                class="w-full"
                v-model="form.email"
                placeholder="lcvr@hotmail.com"
            />
          </div>
          <div class="col-12 md:col-6">
            <label for="phone-number" class="block font-medium mb-2">Phone Number</label>
            <pv-input-text
                id="phone-number"
                type="text"
                class="w-full"
                v-model="form.telefono"
                placeholder="555-1234"
            />
          </div>
          <div class="col-12 md:col-6">
            <label for="baby-name" class="block font-medium mb-2">Baby's Name</label>
            <pv-input-text
                id="baby-name"
                type="text"
                class="w-full"
                v-model="form.bebe"
                placeholder="Andres Cardenas Valenzuela"
            />
          </div>
          <div class="col-12 md:col-6">
            <label for="baby-birth-date" class="block font-medium mb-2">Baby's Birth Date</label>
            <DatePicker
                id="baby-birth-date"
                class="w-full"
                v-model="form.nacimiento"
                placeholder="2025-05-01"
                :manual-input="false"
            />
          </div>
          <div class="col-12 md:col-6">
            <label for="assigned-doctor" class="block font-medium mb-2">Assigned Doctor</label>
            <pv-select
                id="assigned-doctor"
                class="w-full"
                :options="doctorOptions"
                v-model="form.doctor"
                option-label="label"
                option-value="value"
                placeholder="Selecciona un doctor"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-content-end">
          <pv-button
              label="Guardar"
              icon="pi pi-check"
              class="mr-2"
              @click="onSubmit"
          />
          <router-link to="/patient-management/patients">
            <pv-button
                label="Cancelar"
                icon="pi pi-times"
                class="p-button-secondary"
            />
          </router-link>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import DatePicker from 'primevue/datepicker';
import { useToast } from "primevue/usetoast";
import { DoctorService } from "../services/doctor.service.js";
import { PatientService } from "../services/patient.service.js";

export default defineComponent({
  name: 'AddPatientComponent',
  components: {
    DatePicker
  },
  setup() {
    const toast = useToast();
    const doctorApiService = new DoctorService();
    const patientApiService = new PatientService();

    const form = ref({
      nombre: "",
      email: "",
      telefono: "",
      bebe: "",
      nacimiento: new Date(),
      doctor: ""
    });

    const doctorOptions = ref([]);

    const formatBirthDate = (date) => {
      return date.toISOString().split('T')[0];
    };

    const onSubmit = async () => {
      try {
        const newPatient = {
          name: form.value.nombre,
          email: form.value.email,
          phone: form.value.telefono,
          assignedDoctorId: form.value.doctor,
          babyName: form.value.bebe,
          dateOfBirth: formatBirthDate(form.value.nacimiento),
          babyGender: "OTHER"
        };

        await patientApiService.createPatient(newPatient);

        toast.add({
          severity: 'success',
          summary: 'Paciente creado',
          detail: 'El paciente fue registrado correctamente',
          life: 3000
        });
      } catch (error) {
        console.error("Error:", error);

        const serverMessage =
            error.response?.data?.message ||
            error.response?.data?.title ||
            JSON.stringify(error.response?.data);

        toast.add({
          severity: 'error',
          summary: 'Error al guardar',
          detail: serverMessage || 'Ocurrió un error al crear el paciente',
          life: 4000
        });
      }
    };

    const loadDoctors = async () => {
      try {
        const response = await doctorApiService.getAllDoctors();
        doctorOptions.value = response.data.map(doctor => ({
          label: doctor.name,
          value: doctor.id
        }));
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los doctores',
          life: 3000
        });
      }
    };

    onMounted(loadDoctors);

    return {
      form,
      doctorOptions,
      onSubmit
    };
  }
});
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) {
  .md\:col-6 {
    grid-column: span 6;
  }
}
</style>