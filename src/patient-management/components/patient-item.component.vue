<script>
import {Patient} from "../model/patient.entity.js";

export default {
  name: "patient-item",
  props: {
    patient: {
      type: Patient,
      required: true
    }
  },
  created() {
      const patientId = this.$route.params.id;
  }
}
</script>

<template>
  <div class="p-4">
    <pv-card style="height: 100px; width: 1000px">
      <template #content>
        <div class="flex gap-6 mt-1">
          <div style="width: 170px">
            {{ patient.name }}
          </div>
          <div class="flex gap-4 mt-1">
            <router-link :to="`/doctor/patient-management/${patient.id}`">
              <pv-button style="background-color: #FFB3BF; border-color: #FFB3BF; color: #000000; width: 120px"
                  label="About" />
            </router-link>
            <router-link to="/doctor/chat">
              <pv-button style="background-color: #FFB3BF; border-color: #FFB3BF; color: #000000; width: 120px"
                         label="Chat"></pv-button>
            </router-link>
            <router-link to="/doctor/health">
              <pv-button style="background-color: #FFB3BF; border-color: #FFB3BF; color: #000000; width: 120px"
                         label="Health"></pv-button>
            </router-link>
            <router-link to="/doctor/appointments">
              <pv-button style="background-color: #FFB3BF; border-color: #FFB3BF; color: #000000; width: 120px"
                         label="Appointments"></pv-button>
            </router-link>
            <router-link to="/doctor/medications">
              <pv-button style="background-color: #FFB3BF; border-color: #FFB3BF; color: #000000; width: 120px"
                         label="Medication"></pv-button>
            </router-link>
          </div>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
</style>