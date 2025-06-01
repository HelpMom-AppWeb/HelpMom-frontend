<script>
import { Form } from '@primevue/forms';
import Message  from 'primevue/message'

export default {
  name: "add-patient",
  components: {Form, Message},
}
</script>

<template>
  <div>
    <p>a</p>
    <Form>
      <div class="flex flex-col gap-4 w-full h-10rem">
        <div class="flex flex-col gap-1">
          <label for="patientName">Personal Name</label>
          <pv-input-text name="patientName" type="text" />
          <Message v-if="$form.patientName?.invalid" severity="error" size="small" variant="simple">{{ $form.patientName.error?.message }}</Message>
        </div>

        <div class="flex flex-col gap-1">
          <label for="email">Email</label>
          <pv-input-text name="email" type="text" />
          <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
        </div>
      </div>
      <pv-button type="Save" severity="success" label="Save" />

      <pv-button type="Cancel" severity="success" label="Cancel" />
    </Form>
  </div>
</template>

<style scoped>

</style>