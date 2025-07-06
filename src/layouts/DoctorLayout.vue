<template>
  <div class="doctor-layout">
    <SidebarMenu>
      <!-- Menú completo para doctor -->
      <NavItem to="/doctor" icon="dashboard" :text="$t('menu.dashboard')" />
      <NavItem to="/doctor/appointments" icon="calendar" :text="$t('menu.appointments')" />
      <NavItem to="/doctor/all-appointments" icon="list" :text="$t('menu.allAppointments')" />
      <NavItem to="/doctor/patients" icon="users" :text="$t('menu.patients')" />
      <NavItem to="/doctor/health" icon="heart" :text="$t('menu.health')" />
      <NavItem to="/doctor/medications" icon="medication" :text="$t('menu.medications')" />
      <NavItem to="/doctor/chat" icon="chat" :text="$t('menu.chat')" />
      <NavItem to="/logout" icon="logout" :text="$t('menu.logout')" />
    </SidebarMenu>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>