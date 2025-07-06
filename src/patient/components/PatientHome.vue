<template>
  <div class="patient-dashboard">
    <!-- Encabezado dinámico -->
    <div class="dashboard-header">
      <h1>
        <i class="pi pi-user"></i>
        {{ t('dashboard.patient.welcome') }}, {{ userName }}
      </h1>

      <div class="user-info">
        <p>{{ t('dashboard.yourDoctor') }}: <strong>{{ doctorInfo.name }}</strong></p>
        <p>{{ t('dashboard.gestationalWeeks') }}: {{ patientStats.weeks }}</p>
        <p>{{ t('dashboard.nextAppointment') }}: {{ doctorInfo.nextAppointment }}</p>
      </div>
    </div>

    <!-- Sección de Acciones Rápidas -->
    <div class="quick-actions-section">
      <h2><i class="pi pi-bolt"></i> {{ t('dashboard.quickActions') }}</h2>

      <div class="quick-actions-grid">
        <!-- Mis Citas -->
        <div class="action-card" @click="$router.push('/patient/appointments')">
          <div class="action-icon">
            <i class="pi pi-calendar"></i>
          </div>
          <h3>{{ t('dashboard.actions.myAppointments') }}</h3>
          <p>{{ t('dashboard.actions.myAppointmentsDesc') }}</p>
        </div>

        <!-- Chat con Doctor -->
        <div class="action-card" @click="$router.push('/patient/chat')">
          <div class="action-icon">
            <i class="pi pi-comments"></i>
          </div>
          <h3>{{ t('dashboard.actions.chatWithDoctor') }}</h3>
          <p>{{ t('dashboard.actions.chatWithDoctorDesc') }}</p>
        </div>

        <!-- Mi Salud -->
        <div class="action-card" @click="$router.push('/patient/health')">
          <div class="action-icon">
            <i class="pi pi-heart"></i>
          </div>
          <h3>{{ t('dashboard.actions.myHealth') }}</h3>
          <p>{{ t('dashboard.actions.myHealthDesc') }}</p>
        </div>

        <!-- Información del Doctor -->
        <div class="action-card" @click="$router.push('/patient/doctor-info')">
          <div class="action-icon">
            <i class="pi pi-id-card"></i>
          </div>
          <h3>{{ t('dashboard.actions.doctorInfo') }}</h3>
          <p>{{ t('dashboard.actions.doctorInfoDesc') }}</p>
        </div>

      </div>
    </div>

    <!-- Gráficos -->
    <div class="charts-section">
      <div class="charts-row">
        <div class="chart-item">
          <h2><i class="pi pi-chart-line"></i> {{ t("dashboard.baby.weight.label") }}</h2>
          <apexchart
              type="line"
              :options="fetalWeightOptions"
              :series="fetalWeightSeries"
              height="300"
          />
        </div>
        <div class="chart-item">
          <h2><i class="pi pi-heart"></i> {{ t("dashboard.baby.heartRate.label") }}</h2>
          <apexchart
              type="line"
              :options="heartRateOptions"
              :series="heartRateSeries"
              height="300"
          />
        </div>
        <div class="chart-item">
          <h2><i class="pi pi-chart-bar"></i> {{ t("dashboard.baby.parameters.label") }}</h2>
          <apexchart
              type="radar"
              :options="fetalStatsOptions"
              :series="fetalStatsSeries"
              height="300"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth.store'

const { t } = useI18n()
const authStore = useAuthStore()

const userName = computed(() => authStore.user?.name || 'Usuario')

// Datos del paciente
const patientStats = ref({
  weeks: 24,
  lastAppointment: '2023-11-10'
})

const doctorInfo = ref({
  name: 'Dra. Laura Sánchez',
  nextAppointment: '2023-11-20'
})

// Gráfico peso fetal
const fetalWeightSeries = ref([
  {
    name: t("dashboard.baby.weight.data"),
    data: [1, 4, 20, 100, 300, 600, 1200, 1800, 2500, 3200]
  }
])

const fetalWeightOptions = ref({
  chart: { id: "fetal-growth-line" },
  xaxis: {
    title: { text: t("dashboard.baby.weight.weekAxis") },
    categories: ["6", "8", "10", "12", "16", "20", "24", "28", "32", "36"]
  },
  colors: ['#8c00ff'],
  yaxis: { title: { text: t("dashboard.baby.weight.weightAxis") } }
})

// Gráfico frecuencia cardiaca fetal
const heartRateSeries = ref([
  {
    name: t("dashboard.baby.heartRate.data"),
    data: [160, 158, 156, 154, 152, 150, 148, 146, 144, 140]
  }
])

const heartRateOptions = ref({
  chart: { id: "fetal-heart-line" },
  xaxis: {
    title: { text: t("dashboard.baby.weight.weekAxis") },
    categories: ["6", "8", "10", "12", "16", "20", "24", "28", "32", "36"]
  },
  colors: ['#ff007f'],
  yaxis: { title: { text: t("dashboard.baby.heartRate.bpmAxis") } }
})

// Gráfico parámetros fetales
const fetalStatsSeries = ref([
  {
    name: t("dashboard.baby.parameters.measurements"),
    data: [80, 90, 70, 85, 75]
  }
])

const fetalStatsOptions = ref({
  chart: { id: "fetal-parameters-radar" },
  labels: [
    t("dashboard.baby.parameters.growth"),
    t("dashboard.baby.parameters.heartRate"),
    t("dashboard.baby.parameters.fluid"),
    t("dashboard.baby.parameters.position"),
    t("dashboard.baby.parameters.movement")
  ],
  colors: ['#00bfa5']
})

const handleEmergency = () => {
  // Lógica para manejar emergencia
  alert(t('dashboard.emergencyAlert'))
}
</script>

<style scoped>
.patient-dashboard {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
}

.user-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.quick-actions-section {
  margin: 2rem 0;
}

.quick-actions-section h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.action-icon {
  background: #dc6b7c;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.5rem;
}

.action-card h3 {
  margin: 0.5rem 0;
  color: #333;
}

.action-card p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.charts-section {
  margin-top: 3rem;
}

.charts-section h2 {
  margin-top: 2rem;
  color: #6c00ff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.charts-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.chart-item {
  flex: 1 1 300px;
  max-width: 400px;
}

.chart-item h2 {
  margin-top: 0;
  color: #6c00ff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}


</style>