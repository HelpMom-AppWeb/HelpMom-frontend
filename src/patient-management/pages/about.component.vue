<script>
import InputText from 'primevue/inputtext'

export default {
  name: "about",
  components: {
    InputText
  },
  data() {
    return {
      patient:
        {
          "id": "1",
          "name": "Lucia Camaro Valenzuela Ramirez",
          "email": "lcvr@hotmail.com",
          "phone": "555-1234",
          "baby": {
            "id": "1111",
            "motherId": "1",
            "name": "Andres Cardenas Valenzuela",
            "birthDate": "2025-05-01",
            "gender": "Male"
          },
          "assignedDoctor": "Maria Perez"
        },
    }
  }
}
</script>

<template>
  <div>
  <div class="flex flex-column gap-4 m-8 w-8 h-8">
    <div>
      <p>Personal Name</p>
      <InputText v-model="patient.name" disabled placeholder="Patient Name" style="width: 400px"/>
    </div>
    <div>
      <p>Personal Email</p>
      <InputText v-model="patient.email" disabled placeholder="Patient Email" style="width: 400px" />
    </div>
    <div>
      <p>Phone Number</p>
      <InputText v-model="patient.phone" disabled placeholder="Patient Phone" style="width: 400px" />
    </div>
    <div>
      <p>Baby Name</p>
      <InputText v-model="patient.baby.name" disabled placeholder="Baby Name" style="width: 400px" />
    </div>
    <div>
      <p>Baby Birth Date</p>
      <InputText v-model="patient.baby.birthDate" disabled placeholder="Baby Birth Date" style="width: 400px" />
    </div>
    <div>
      <p>Assigned Doctor</p>
      <InputText v-model="patient.assignedDoctor" disabled placeholder="Assigned Doctor" style="width: 400px"/>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>