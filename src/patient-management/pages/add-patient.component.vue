<template>
  <div class="flex justify-content-center align-items-center min-h-screen">
    <pv-card class="w-full md:w-8 lg:w-6 p-4">
      <template #title>
        <h2>Add Patient's Personal Details</h2>
      </template>
      <template #content>
        <div class="grid">
          <div class="col-12 md:col-6">
            <label for="personal-name" class="block text-900 font-medium mb-2">Personal Name</label>
            <pv-input-text id="personal-name" type="text" class="w-full" v-model="form.nombre" placeholder="Lucia Camaro Valenzuela Ramirez"/>
          </div>
          <div class="col-12 md:col-6">
            <label for="personal-email" class="block text-900 font-medium mb-2">Email</label>
            <pv-input-text id="personal-email" type="email" class="w-full" v-model="form.email" placeholder="lcvr@hotmail.com"/>
          </div>
          <div class="col-12 md:col-6">
            <label for="phone-number" class="block text-900 font-medium mb-2">Phone Number</label>
            <pv-input-text id="phone-number" type="text" class="w-full" v-model="form.telefono" placeholder="555-1234" />
          </div>
          <div class="col-12 md:col-6">
            <label for="baby-name" class="block text-900 font-medium mb-2">Baby's Name</label>
            <pv-input-text id="baby-name" type="text" class="w-full" v-model="form.bebe" placeholder="Andres Cardenas Valenzuela"/>
          </div>
          <div class="col-12 md:col-6">
            <label for="baby-birth-date" class="block text-900 font-medium mb-2">Baby's Birth Date</label>
            <DatePicker id="baby-birth-date" class="w-full" v-model="form.nacimiento" placeholder="2025-05-01" />
          </div>
          <div class="col-12 md:col-6">
            <label for="assigned-doctor" class="block text-900 font-medium mb-2">Assigned Doctor</label>
            <pv-select id="assigned-doctor" class="w-full" :options="doctorOptions" v-model="form.doctor" placeholder="Maria Perez"/>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-content-end">
          <router-link to="/patient-management/patients">
            <pv-button label="Guardar" icon="pi pi-check" class="mr-2" @click.native="onSubmit" />
          </router-link>
          <router-link to="/patient-management/patients">
            <pv-button label="Cancelar" icon="pi pi-times" class="p-button-secondary" />
          </router-link>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<script setup>
import DatePicker from 'primevue/datepicker';
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";

const toast = useToast();

const onSubmit = () => {
  toast.add({ severity: 'success', summary: 'Successful operation', detail: 'Patient data was saved', life: 3000 });
};

const form = ref({
  nombre: "",
  email: "",
  telefono: "",
  bebe: "",
  nacimiento: "",
  doctor: ""
});
const doctorOptions = ref(["Maria Perez", "Carlos Sánchez", "Ana Gutierrez"]);

</script>

<style>

</style>