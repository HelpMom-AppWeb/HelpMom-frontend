<template>
  <div id="app" class="min-h-screen flex bg-gray-50">
    <sidebar-menu v-if="showSidebar" />
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Puedes agregar un header aquí si lo necesitas -->
      <main class="flex-1 overflow-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <!-- Puedes agregar un footer aquí si lo necesitas -->
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import SidebarMenu from "./public/components/sidebar-menu.component.vue";

const route = useRoute()
const authStore = useAuthStore()

const showSidebar = computed(() => {
  // Excluye rutas donde no quieres sidebar (login, register, etc.)
  const excludedRoutes = ['login', 'register', 'forgot-password']
  return authStore.isAuthenticated && !excludedRoutes.includes(route.name)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilo para el fondo cuando el sidebar está presente */
#app.has-sidebar {
  background-color: #f9fafb;
}
</style>