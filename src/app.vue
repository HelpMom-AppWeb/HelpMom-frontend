<template>
  <div id="app">
    <pv-toast/>
    <sidebar-menu></sidebar-menu>
    <div class="main-content">
      <router-view />
    </div>
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

<style>
.main-content {
  margin-left: 180px;
  padding: 1rem;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
