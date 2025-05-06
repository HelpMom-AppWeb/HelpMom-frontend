<template>
  <div id="app">
    <!-- Language switcher visible siempre -->


    <!-- Puedes mover esto según tu diseño general -->
    <HealthMonitoring />
  </div>
</template>

<script>
//import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import HealthMonitoring from "./health-monitoring/pages/health-monitoring.component.vue" // Ajusta el path si es necesario

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
};
</script>
