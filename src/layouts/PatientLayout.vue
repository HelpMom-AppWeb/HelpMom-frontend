<template>
  <div class="patient-layout">
    <SidebarMenu>
      <!-- Menú limitado para paciente -->
      <NavItem to="/patient" icon="dashboard" :text="$t('menu.dashboard')" />
      <NavItem to="/patient/profile" icon="user" :text="$t('menu.profile')" />
      <NavItem to="/patient/health" icon="heart" :text="$t('menu.health')" />
      <NavItem to="/patient/chat" icon="chat" :text="$t('menu.chat')" />
      <NavItem to="/patient/appointments" icon="calendar" :text="$t('menu.appointments')" />
      <NavItem to="/logout" icon="logout" :text="$t('menu.logout')" />
    </SidebarMenu>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>