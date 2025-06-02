<template>
  <div id="app">
    <pv-toast/>
    <sidebar-menu></sidebar-menu>
    <router-view />
  </div>
</template>

<script>

import SidebarMenu from "./public/components/sidebar-menu.component.vue";

export default {
  name: 'App',
  components: {
    SidebarMenu


  }
}
</script>
