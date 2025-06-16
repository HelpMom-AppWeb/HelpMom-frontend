<script>
export default {
  name: 'chat-form',
  props: {
    message: String,
    visible: Boolean
  },
  emits: ['send', 'cancel'],
  data() {
    return {
      newMsg: '',
      submitted: false
    }
  },
  methods: {
    onSend() {
      this.submitted = true;
      if (this.newMsg.trim()) {
        this.$emit('send', this.newMsg.trim());
        this.newMsg = '';
      }
    },
    onCancel() {
      this.$emit('cancel');
    }
  }
}
</script>

<template>
  <pv-dialog :visible="visible" modal header="New Message" @hide="onCancel">
    <div class="p-fluid">
      <pv-float-label>
        <label for="msg">Message</label>
        <pv-input-text id="msg" v-model="newMsg" :class="{'p-invalid': submitted && !newMsg}"/>
        <small v-if="submitted && !newMsg" class="p-invalid">Message is required</small>
      </pv-float-label>
    </div>
    <template #footer>
      <pv-button label="Cancel" icon="pi pi-times" class="p-button-text" @click="onCancel"/>
      <pv-button label="Send" icon="pi pi-check" @click="onSend"/>
    </template>
  </pv-dialog>
</template>
