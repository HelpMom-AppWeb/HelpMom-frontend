<template>
  <div class="sidebar-container">
    <Sidebar v-model:visible="visible" position="left" class="custom-sidebar">
      <!-- Language Switcher -->
      <language-switcher />

      <!-- Profile Section -->
      <div class="profile-section">
        <img src="/src/assets/logo.jpeg" class="avatar" alt="avatar" />
      </div>

      <!-- Menu Groups -->
      <div class="menu-group">
        <p class="section-title">{{ $t(isDoctor ? "sidebar.doctor.menu.label" : "sidebar.patient.menu.label") }}</p>
        <router-link :to="baseRoute" class="menu-item" :class="{ active: isActive(baseRoute) }">
          <IconDashboard class="menu-icon" /> {{ $t("sidebar.menu.dashboard") }}
        </router-link>
        <router-link v-if="!isDoctor" :to="`${baseRoute}/profile`" class="menu-item" :class="{ active: isActive(`${baseRoute}/profile`) }">
          <IconProfile class="menu-icon" /> {{ $t("sidebar.menu.profile") }}
        </router-link>
      </div>

      <div class="menu-group">
        <p class="section-title">{{ $t(isDoctor ? "sidebar.doctor.analytics.label" : "sidebar.patient.analytics.label") }}</p>
        <router-link :to="`${baseRoute}/health`" class="menu-item" :class="{ active: isActive(`${baseRoute}/health`) }">
          <IconHealth class="menu-icon" /> {{ $t("sidebar.menu.healthMonitoring") }}
        </router-link>
      </div>

      <div class="menu-group">
        <p class="section-title">{{ $t("sidebar.menu.schedule.label") }}</p>
        <router-link :to="`${baseRoute}/chat`" class="menu-item" :class="{ active: isActive(`${baseRoute}/chat`) }">
          <IconChat class="menu-icon" /> {{ $t("sidebar.menu.chat") }}
        </router-link>
        <router-link
            :to="isDoctor ? `${baseRoute}/appointments` : `${baseRoute}/appointments`"
            class="menu-item"
            :class="{ active: isActive(`${baseRoute}/appointments`) || isActive(`${baseRoute}/all-appointments`) }"
        >
          <IconCalendar class="menu-icon" /> {{ $t("sidebar.menu.appointments") }}
        </router-link>
        <router-link
            v-if="isDoctor"
            :to="`${baseRoute}/patients`"
            class="menu-item"
            :class="{ active: isActive(`${baseRoute}/patients`) }"
        >
          <i class="pi pi-list-check menu-icon"></i> {{ $t("sidebar.doctor.patientList") }}
        </router-link>

        <!-- ✅ NUEVA OPCIÓN PARA DOCTOR -->
        <router-link
            v-if="isDoctor"
            :to="`${baseRoute}/medications`"
            class="menu-item"
            :class="{ active: isActive(`${baseRoute}/medications`) }"
        >
          <i class="pi pi-briefcase menu-icon"></i> {{ $t("sidebar.doctor.medications") }}
        </router-link>
      </div>

      <!-- Logout Button -->
      <div class="logout">
        <button class="menu-item logout-btn" @click="handleLogout">
          <IconLogout class="menu-icon" /> {{ $t("sidebar.logout") }}
        </button>
      </div>
    </Sidebar>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { useI18n } from 'vue-i18n'

// Components
import IconDashboard from "@/assets/IconDashboard.vue"
import IconProfile from "@/assets/IconProfile.vue"
import IconHealth from "@/assets/IconHealth.vue"
import IconChat from "@/assets/IconChat.vue"
import IconCalendar from "@/assets/IconCalendar.vue"
import IconLogout from "@/assets/IconLogout.vue"
import LanguageSwitcher from "./language-switcher.component.vue"

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const visible = ref(true)
const isDoctor = computed(() => authStore.isDoctor)
const baseRoute = computed(() => isDoctor.value ? '/doctor' : '/patient')

const isActive = (path) => {
  return router.currentRoute.value.path.startsWith(path)
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<style scoped>
.sidebar-container {
  background-color: var(--color-primary-light);
  height: 100vh;
  position: relative;
}

.custom-sidebar {
  width: 280px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.profile-section {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.section-title {
  font-size: 0.75rem;
  font-weight: bold;
  color: #8a8d91;
  margin: 1.5rem 0 0.5rem;
  text-transform: uppercase;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  color: #333;
  text-decoration: none;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
  transition: background 0.3s;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.active {
  background-color: #fca5a5;
  color: white;
  font-weight: bold;
}

.menu-icon {
  margin-right: 0.75rem;
  width: 20px;
  height: 20px;
}

.logout {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
}

.logout-btn {
  color: #ef4444;
}

.logout-btn:hover {
  background-color: #fee2e2;
}
</style>