<template>
  <div class="doctor-dashboard">
    <!-- Encabezado dinámico -->
    <div class="dashboard-header">
      <h1>
        <i class="pi pi-user-md"></i>
        {{ t('dashboard.doctor.welcome') }}, Dr. {{ userName }}
      </h1>

      <div class="user-info">
        <p>{{ t('dashboard.currentPatient') }}: <strong>{{ patientStats.name }}</strong></p>
        <p>{{ t('dashboard.weeks') }}: {{ patientStats.weeks }}</p>
        <p>{{ t('dashboard.lastAppointment') }}: {{ patientStats.lastAppointment }}</p>
      </div>
    </div>

    <!-- Sección de Acciones Rápidas -->
    <div class="quick-actions-section">
      <h2><i class="pi pi-bolt"></i> {{ t('dashboard.quickActions') }}</h2>

      <div class="quick-actions-grid">
        <!-- Gestión de Citas -->
        <div class="action-card" @click="$router.push('/doctor/appointments')">
          <div class="action-icon">
            <i class="pi pi-calendar-plus"></i>
          </div>
          <h3>{{ t('dashboard.actions.manageAppointments') }}</h3>
          <p>{{ t('dashboard.actions.manageAppointmentsDesc') }}</p>
        </div>


        <!-- Gestión de Pacientes -->
        <div class="action-card" @click="$router.push('/doctor/patient-management')">
          <div class="action-icon">
            <i class="pi pi-users"></i>
          </div>
          <h3>{{ t('dashboard.actions.patientManagement') }}</h3>
          <p>{{ t('dashboard.actions.patientManagementDesc') }}</p>
        </div>

        <!-- Añadir Paciente -->
        <div class="action-card" @click="$router.push('/doctor/add-patient')">
          <div class="action-icon">
            <i class="pi pi-user-plus"></i>
          </div>
          <h3>{{ t('dashboard.actions.addPatient') }}</h3>
          <p>{{ t('dashboard.actions.addPatientDesc') }}</p>
        </div>

        <!-- Monitoreo de Salud -->
        <div class="action-card" @click="$router.push('/doctor/health')">
          <div class="action-icon">
            <i class="pi pi-heart"></i>
          </div>
          <h3>{{ t('dashboard.actions.healthMonitoring') }}</h3>
          <p>{{ t('dashboard.actions.healthMonitoringDesc') }}</p>
        </div>

        <!-- Medicamentos -->
        <div class="action-card" @click="$router.push('/doctor/medications')">
          <div class="action-icon">
            <i class="pi pi-pills"></i>
          </div>
          <h3>{{ t('dashboard.actions.medications') }}</h3>
          <p>{{ t('dashboard.actions.medicationsDesc') }}</p>
        </div>

        <!-- Chat -->
        <div class="action-card" @click="$router.push('/doctor/chat')">
          <div class="action-icon">
            <i class="pi pi-comments"></i>
          </div>
          <h3>{{ t('dashboard.actions.chat') }}</h3>
          <p>{{ t('dashboard.actions.chatDesc') }}</p>
        </div>

        <!-- Información del Paciente -->
        <div class="action-card" @click="$router.push(`/doctor/patient-management/${currentPatientId}`)">
          <div class="action-icon">
            <i class="pi pi-id-card"></i>
          </div>
          <h3>{{ t('dashboard.actions.patientInfo') }}</h3>
          <p>{{ t('dashboard.actions.patientInfoDesc') }}</p>
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
const currentPatientId = ref('123') // Esto debería venir de tu store o API

// Datos del paciente
const patientStats = ref({
  name: 'María González',
  weeks: 24,
  lastAppointment: '2023-11-10'
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
  colors: ['#ff98a8'],
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
  colors: ['#9600bf']
})
</script>

<style scoped>
.doctor-dashboard {
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
  background: #e6697d;
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

.charts-section {
  margin-top: 3rem;
}

.charts-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap; /* se adapta en pantallas pequeñas */
  justify-content: center;
}

.chart-item {
  flex: 1 1 300px; /* mínimo 300px, se expande */
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
.charts-row {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
}

</style>

