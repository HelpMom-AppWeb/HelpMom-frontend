<!-- src/App.vue -->
<template>
  <div id="app">
    <HealthMonitoring></HealthMonitoring>
    <router-view />
  </div>
</template>

<script>

import SidebarMenu from "./public/components/sidebar-menu.component.vue";
import HealthMonitoring from "./health-monitoring/pages/health-monitoring.component.vue"

export default {
  name: 'app',
  components: {
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