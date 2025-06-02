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
      <p>{{ $t("patientManagement.patientInformation.name")}}</p>
      <InputText v-model="patient.name" disabled :placeholder="$t('patientManagement.patientInformation.name')" style="width: 400px"/>
    </div>
    <div>
      <p>{{ $t("patientManagement.patientInformation.email")}}</p>
      <InputText v-model="patient.email" disabled :placeholder="$t('patientManagement.patientInformation.email')" style="width: 400px" />
    </div>
    <div>
      <p>{{ $t("patientManagement.patientInformation.phone")}}</p>
      <InputText v-model="patient.phone" disabled :placeholder="$t('patientManagement.patientInformation.phone')" style="width: 400px" />
    </div>
    <div>
      <p>{{ $t("patientManagement.patientInformation.babyName")}}</p>
      <InputText v-model="patient.baby.name" disabled :placeholder="$t('patientManagement.patientInformation.babyName')" style="width: 400px" />
    </div>
    <div>
      <p>{{ $t("patientManagement.patientInformation.babyBirthDate")}}</p>
      <InputText v-model="patient.baby.birthDate" disabled :placeholder="$t('patientManagement.patientInformation.babyBirthDate')" style="width: 400px" />
    </div>
    <div>
      <p>{{ $t("patientManagement.patientInformation.assignedDoctor")}}</p>
      <InputText v-model="patient.assignedDoctor" disabled :placeholder="$t('patientManagement.patientInformation.assignedDoctor')" style="width: 400px"/>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>