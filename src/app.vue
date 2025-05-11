
<template>
  <div id="app">
    <sidebar-menu></sidebar-menu>
    <router-view />
  </div>
</template>

<script>

import SidebarMenu from "./public/components/sidebar-menu.component.vue";
import HealthMonitoringComponent from "./health-monitoring/pages/health-monitoring.component.vue";

export default {
  name: 'App',
  components: {
    SidebarMenu,
    HealthMonitoringComponent,
  },

  /*data() {
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
  }*/

}
</script>