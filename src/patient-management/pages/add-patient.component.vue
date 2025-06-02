<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button"
import { Form } from '@primevue/forms';
import Message  from 'primevue/message'
import {$t} from "@primeuix/styled";


export default {
  name: "add-patient",
  methods: {$t},
  components: {InputText, Button, Form}
}
</script>

<template>
  <div >
    <p>a</p>
    <Form>
      <div class="flex flex-col gap-4 w-full h-10rem">
        <div class="flex flex-col gap-1">
          <label for="patientName">{{ $t("patientManagement.patientInformation.name") }}</label>
          <InputText name="patientName" type="text" />
          <Message v-if="$form.patientName?.invalid" severity="error" size="small" variant="simple">{{ $form.patientName.error?.message }}</Message>
        </div>

        <div class="flex flex-col gap-1">
          <label for="email">{{ $t("patientManagement.patientInformation.email") }}</label>
          <InputText name="email" type="text" />
          <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
        </div>
      </div>
      <Button type="Save" severity="success" label="Save" />

      <Button type="Cancel" severity="success" label="Cancel" />
    </Form>
  </div>
</template>

<style scoped>

</style>