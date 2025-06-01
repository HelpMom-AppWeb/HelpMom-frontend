<script>
import Button from 'primevue/button';
import {Card} from "primevue";
import {Patient} from "../model/patient.entity.js";

export default {
  name: "patient-item",
  components: {
    Card,
    Button
  },
  props: {
    patient: {
      type: Patient,
      required: true
    }
  }
}
</script>

<template>
  <div class="p-4">
    <Card style="height: 100px; width: 1000px">
      <template #content>
        <div class="flex gap-6 mt-1">
          <div style="width: 170px">
            {{ patient.name }}
          </div>
          <div class="flex gap-4 mt-1">
            <router-link to="/patient-management/patients/patient-info">
              <Button
                  style="background-color: #FFB3BF; border-color: #FFB3BF; color: #000000; width: 120px"
                  label="About"></Button>
            </router-link>
            <router-link to="/chat">
              <Button style="background-color: #FFB3BF; border-color: #FFB3BF; color: #000000; width: 120px"
                      label="Chat"></Button>
            </router-link>
            <router-link to="/health">
              <Button style="background-color: #FFB3BF; border-color: #FFB3BF; color: #000000; width: 120px"
                      label="Health"></Button>
            </router-link>
            <router-link to="/appointments">
              <Button style="background-color: #FFB3BF; border-color: #FFB3BF; color: #000000; width: 120px"
                      label="Appointments"></Button>
            </router-link>
            <router-link to="/medication">
              <Button style="background-color: #FFB3BF; border-color: #FFB3BF; color: #000000; width: 120px"
                      label="Medication"></Button>
            </router-link>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
</style>