<template>
  <div id="app">
    <Chat />
  </div>
</template>

<script>
import Chat from "./chat/pages/chat.vue";

export default {
  name: 'App',
  components: {
    Chat
  },
  data() {
    return {
      drawer: false,
      items: [
        { label: 'option.home', to: '/home' }
      ]
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
