<template>
  <div class="sidebar-container">


    <Sidebar v-model:visible="visible" position="left" class="custom-sidebar">
      <div class="profile-section">

        <img src="/src/assets/logo.jpeg" class="avatar" alt="avatar" />
      </div>

      <div class="menu-group">
        <p class="section-title">  MENU</p>
        <router-link to="/dashboard" class="menu-item" :class="{ active: isActive('/dashboard') }">
          <IconDashboard class="mr-2" />   Dashboard
        </router-link>
        <router-link to="/profile" class="menu-item" :class="{ active: isActive('/profile') }">
          <IconProfile class="mr-2" />    Profile
        </router-link>
      </div>

      <div class="menu-group">
        <p class="section-title">  ANALYTICS</p>
        <router-link to="/health" class="menu-item" :class="{ active: isActive('/health') }">
          <IconHealth class="mr-2" /> Health Monitoring
        </router-link>
      </div>

      <div class="menu-group">
        <p class="section-title">SCHEDULE</p>
        <router-link to="/chat" class="menu-item" :class="{ active: isActive('/chat') }">
          <IconChat class="mr-2" /> Chat
        </router-link>
        <router-link to="/appointments" class="menu-item" :class="{ active: isActive('/appointments') }">
          <IconCalendar class="mr-2" /> Appointments
        </router-link>
      </div>

      <div class="menu-group">
        <p class="section-title">HELP</p>
        <router-link to="/notifications" class="menu-item" :class="{ active: isActive('/notifications') }">
          <IconNotification class="mr-2" /> Notifications
        </router-link>
        <router-link to="/settings" class="menu-item" :class="{ active: isActive('/settings') }">
          <IconSettings class="mr-2" /> Settings
        </router-link>
      </div>

      <div class="logout">
        <a class="menu-item logout-btn" href="#">
          <IconLogout class="mr-2" /> LogOut
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
    IconDashboard
  },
  data() {
    return {
      visible: true
    }
  },
  methods: {
    isActive(path) {
      return this.$route.path === path
    }
  }
}
</script>

<style scoped>
.sidebar-container {
  position: relative;
}

.menu-button {
  margin: 1rem;
}

.custom-sidebar .p-sidebar {
  width: 4000px; /* o cualquier ancho deseado */
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
