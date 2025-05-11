<script>
import SplitterPanel from 'primevue/splitterpanel';
import Button from 'primevue/button';
import {Splitter} from "primevue";
import {Patient} from "../model/patient.entity.js";

export default {
  name: "patient-item",
  components: {
    Splitter,
    SplitterPanel,
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
  <Splitter style="height: 300px">
    <SplitterPanel class="flex items-center justify-center"> {{ patient.name }} </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center">
      <router-link to="/about">
        <Button label="About"></Button>
      </router-link>
    </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center">
      <router-link to="/chat">
        <Button label="Chat"></Button>
      </router-link>
    </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center">
      <router-link to="/health">
        <Button label="Health"></Button>
      </router-link>
    </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center">
      <router-link to="/appointments">
        <Button label="Appointments"></Button>
      </router-link>
    </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center">
      <router-link to="/medication">
        <Button label="medication"></Button>
      </router-link>
    </SplitterPanel>
  </Splitter>
</template>

<style scoped>

</style>