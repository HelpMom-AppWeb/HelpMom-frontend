<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth.store';

const { t } = useI18n();
const authStore = useAuthStore();

const isDoctorView = computed(() => authStore.isDoctor);

// Peso fetal
const fetalWeightSeries = ref([{ name: t("dashboard.babyWeight.weightData"), data: [1, 4, 20, 100, 300, 600, 1200, 1800, 2500, 3200] }]);
const fetalWeightOptions = ref({
  chart: { id: "fetal-growth-line" },
  xaxis: { title: { text: t("dashboard.babyWeight.weekAxis") }, categories: ["6", "8", "10", "12", "16", "20", "24", "28", "32", "36"] },
  colors: ['#8c00ff'],
  yaxis: { title: { text: t("dashboard.babyWeight.weightAxis") } }
});

// ... (mantén tus otras definiciones de series y opciones)

// Datos adicionales para doctor
const patientStats = ref({
  name: 'María González',
  weeks: 24,
  lastAppointment: '2023-11-10'
});

// Datos adicionales para paciente
const doctorInfo = ref({
  name: 'Dra. Laura Sánchez',
  nextAppointment: '2023-11-20'
});
</script>

<template>
  <div class="dashboard-container">
    <!-- Encabezado personalizado por rol -->
    <div class="dashboard-header">
      <h1 v-if="isDoctorView">{{ t('dashboard.doctorTitle') }}</h1>
      <h1 v-else>{{ t('dashboard.patientTitle') }}</h1>

      <div class="user-info">
        <template v-if="isDoctorView">
          <p>{{ t('dashboard.currentPatient') }}: <strong>{{ patientStats.name }}</strong></p>
          <p>{{ t('dashboard.weeks') }}: {{ patientStats.weeks }}</p>
        </template>
        <template v-else>
          <p>{{ t('dashboard.yourDoctor') }}: <strong>{{ doctorInfo.name }}</strong></p>
          <p>{{ t('dashboard.nextAppointment') }}: {{ doctorInfo.nextAppointment }}</p>
        </template>
      </div>
    </div>

    <!-- Sección de gráficos (común a ambos roles) -->
    <div class="charts-section">
      <h2>{{ $t("dashboard.babyWeight.label") }}</h2>
      <apexchart type="line" :options="fetalWeightOptions" :series="fetalWeightSeries" height="300" />

      <h2>{{ $t("dashboard.babyHeartRate.label")}}</h2>
      <apexchart type="line" :options="heartRateOptions" :series="heartRateSeries" height="300" />

      <h2>{{ $t("dashboard.babyParameters.label")}}</h2>
      <apexchart type="radar" :options="fetalStatsOptions" :series="fetalStatsSeries" height="300" />
    </div>

    <!-- Sección adicional para doctor -->
    <div v-if="isDoctorView" class="doctor-actions">
      <button @click="$router.push('/doctor/appointments')">
        {{ t('dashboard.manageAppointments') }}
      </button>
      <button @click="$router.push('/doctor/patients')">
        {{ t('dashboard.viewAllPatients') }}
      </button>
    </div>

    <!-- Sección adicional para paciente -->
    <div v-else class="patient-actions">
      <button @click="$router.push('/patient/appointments')">
        {{ t('dashboard.myAppointments') }}
      </button>
      <button @click="$router.push('/patient/chat')">
        {{ t('dashboard.chatWithDoctor') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.user-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
}

.charts-section {
  margin: 30px 0;
}

.charts-section h2 {
  margin-top: 30px;
  color: #6c00ff;
}

button {
  padding: 10px 20px;
  margin-right: 15px;
  background: #6c00ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #5a00d6;
}

.doctor-actions, .patient-actions {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
</style>