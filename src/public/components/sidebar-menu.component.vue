<template>
  <div class="sidebar-container">
    <Button icon="pi pi-bars" @click="visible = true" class="menu-button" />

    <Sidebar v-model:visible="visible" position="left" class="custom-sidebar">
      <div class="profile-section">
        <img src="/src/assets/logo.jpeg" class="avatar" alt="avatar" />
      </div>

      <div class="menu-group">
        <p class="section-title">MENU</p>
        <router-link to="/dashboard" class="menu-item" :class="{ active: isActive('/dashboard') }">
          <IconDashboard class="mr-2" /> Dashboard
        </router-link>
        <router-link to="/profile" class="menu-item" :class="{ active: isActive('/profile') }">
          <i class="pi pi-user mr-2"></i> Profile
        </router-link>
      </div>

      <div class="menu-group">
        <p class="section-title">ANALYTICS</p>
        <router-link to="/health" class="menu-item" :class="{ active: isActive('/health') }">
          <i class="pi pi-plus mr-2"></i> Health monitoring
        </router-link>
      </div>

      <div class="menu-group">
        <p class="section-title">SCHEDULE</p>
        <router-link to="/chat" class="menu-item" :class="{ active: isActive('/chat') }">
          <i class="pi pi-comments mr-2"></i> Chat
        </router-link>
        <router-link to="/appointments" class="menu-item" :class="{ active: isActive('/appointments') }">
          <i class="pi pi-calendar mr-2"></i> Appointments
        </router-link>
      </div>

      <div class="menu-group">
        <p class="section-title">HELP</p>
        <router-link to="/notifications" class="menu-item" :class="{ active: isActive('/notifications') }">
          <i class="pi pi-bell mr-2"></i> Notifications
        </router-link>
        <router-link to="/settings" class="menu-item" :class="{ active: isActive('/settings') }">
          <i class="pi pi-cog mr-2"></i> Settings
        </router-link>
      </div>

      <div class="logout">
        <a class="menu-item logout-btn" href="#">
          <i class="pi pi-sign-out mr-2"></i> Log out
        </a>
      </div>
    </Sidebar>
  </div>
</template>

<script>
import IconDashboard from "../../assets/IconDashboard.vue";

export default {
  name: 'sidebar-menu',
  components: {
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

.custom-sidebar {
  width: 250px;
  padding: 1rem;
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
