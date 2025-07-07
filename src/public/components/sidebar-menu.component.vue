<template>
  <div class="sidebar-container">
    <Sidebar v-model:visible="visible" position="left" class="custom-sidebar">

      <div class="profile-section">
        <img src="/src/assets/logo.jpeg" class="avatar" alt="avatar" />
      </div>

      <!-- Menú principal -->
      <div class="menu-group">
        <p class="section-title">{{ $t("sidebar.patient.menu.label") }}</p>
        <router-link to="/home" class="menu-item" :class="{ active: isActive('/home') }">
          <IconDashboard class="mr-2" /> {{ $t("sidebar.patient.menu.dashboard") }}
        </router-link>
        <router-link to="/profile" class="menu-item" :class="{ active: isActive('/profile') }">
          <IconProfile class="mr-2" /> {{ $t("sidebar.patient.menu.profile") }}
        </router-link>
      </div>

      <!-- Analytics -->
      <div class="menu-group">
        <p class="section-title">{{ $t("sidebar.patient.analytics.label") }}</p>
        <router-link to="/health" class="menu-item" :class="{ active: isActive('/health') }">
          <IconHealth class="mr-2" /> {{ $t("sidebar.patient.analytics.healthMonitoring") }}
        </router-link>
      </div>

      <!-- Schedule -->
      <div class="menu-group">
        <p class="section-title">{{ $t("sidebar.patient.schedule.label") }}</p>
        <router-link to="/chat" class="menu-item" :class="{ active: isActive('/chat') }">
          <IconChat class="mr-2" /> {{ $t("sidebar.patient.schedule.chat") }}
        </router-link>
        <router-link to="/all-appointments" class="menu-item" :class="{ active: isActive('/all-appointments') }">
          <IconCalendar class="mr-2" /> {{ $t("sidebar.patient.schedule.appointments") }}
        </router-link>
        <router-link to="/patient-management/patients" class="menu-item" :class="{ active: isActive('/patient-management/patients') }">
          <i class="pi pi-list-check mr-2"></i> {{ $t("sidebar.doctor.patientMenu.patientList") }}
        </router-link>
      </div>

      <!-- Ayuda -->
      <div class="menu-group">
        <p class="section-title">{{ $t("sidebar.patient.help.label") }}</p>
        <router-link to="/notifications" class="menu-item" :class="{ active: isActive('/notifications') }">
          <IconNotification class="mr-2" /> {{ $t("sidebar.patient.help.notifications") }}
        </router-link>
        <router-link to="/settings" class="menu-item" :class="{ active: isActive('/settings') }">
          <IconSettings class="mr-2" /> {{ $t("sidebar.patient.help.settings") }}
        </router-link>
      </div>

      <!-- Selector de idioma abajo centrado -->
      <div class="language-position">
        <language-switcher />
      </div>

      <!-- Botón logout abajo del todo -->
      <div class="logout">
        <a class="menu-item logout-btn" href="#">
          <IconLogout class="mr-2" /> {{ $t("sidebar.patient.logout") }}
        </a>
      </div>

    </Sidebar>
  </div>
</template>

<script>
import IconDashboard from "../../assets/IconDashboard.vue";
import IconProfile from "../../assets/IconProfile.vue";
import IconHealth from "../../assets/IconHealth.vue";
import IconChat from "../../assets/IconChat.vue";
import IconCalendar from "../../assets/IconCalendar.vue";
import IconNotification from "../../assets/IconNotification.vue";
import IconSettings from "../../assets/IconSettings.vue";
import IconLogout from "../../assets/IconLogout.vue";
import LanguageSwitcher from "./language-switcher.component.vue";

export default {
  name: 'sidebar-menu',
  components: {
    IconLogout,
    IconSettings,
    IconNotification,
    IconCalendar,
    IconChat,
    IconHealth,
    IconProfile,
    IconDashboard,
    LanguageSwitcher
  },
  data() {
    return {
      visible: true
    }
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    }
  }
}
</script>


<style scoped>

.language-position {
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
}
.sidebar-container {
  position: fixed;      /* Fijo en pantalla */
  top: 0;
  left: 0;
  height: 100vh;        /* altura total del viewport */
  width: 180px;         /* o el ancho que quieras */
  background-color: var(--color-primary-light);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;        /* para que quede encima */
}

.menu-button {
  margin: 1rem;
}

.custom-sidebar{
  flex: 1 1 auto;     /* que crezca para llenar espacio */
  display: flex;
  flex-direction: column;
  overflow-y: auto;   /* scroll vertical dentro del sidebar */
  padding-bottom: 4rem; /* espacio para logout e idioma */
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
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.active {
  background-color: #fca5a5; /* rosado */
  color: white;
  font-weight: bold;
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
</style>