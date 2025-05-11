<!-- src/App.vue -->
<template>
  <div id="app">
    <sidebar-menu></sidebar-menu>
    <router-view />
  </div>
</template>

<script>

import SidebarMenu from "./public/components/sidebar-menu.component.vue";

export default {
  name: 'App',
  components: {
    SidebarMenu,
    HealthMonitoring
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

}
</script>
