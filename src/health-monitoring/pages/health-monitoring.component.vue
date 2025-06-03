<script>
import { defineComponent, ref } from "vue";
import IconHeart from "../../assets/IconHeart.vue";
import IconTemperature from "../../assets/IconTemperature.vue";
import IconWeight from "../../assets/IconWeight.vue";
import IconOxygen from "../../assets/IconOxygen.vue";
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: {
    IconHeart,
    IconTemperature,
    IconWeight,
    IconOxygen,
  },
  setup() {
    const healthData = ref({
      heartRate: 72,
      temperature: 37.0,
      weight: 150,
      oxygen: 98
    });

    const { t } = useI18n();

    const updatedData = ref({ ...healthData.value });

    const fetchHealthData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/health');
        if (response.data) {
          healthData.value = response.data;
          updatedData.value = { ...response.data };
        }
      } catch (error) {
        console.error('Error fetching health data:', error);
      }
    };

    const updateHealthData = async () => {
      try {
        await axios.put('http://localhost:3000/health', updatedData.value);
        healthData.value = { ...updatedData.value };
        showUpdateForm.value = false;
      } catch (error) {
        console.error('Error updating health data:', error);
      }
    };

    const showUpdateForm = ref(false);
    const showMedicationModal = ref(false);
    const showAddMedicationForm = ref(false);

    const medications = ref([]); // Assuming medications are fetched from some API or defined locally
    const newMedication = ref({
      name: '',
      dosage: '',
      schedule: ''
    });

    const addMedication = () => {
      medications.value.push({ ...newMedication.value });
      newMedication.value = { name: '', dosage: '', schedule: '' };
      showAddMedicationForm.value = false;
    };

    const router = useRouter();

    const goToMedications = () => {
      router.push({ name: 'medications' });
    };


    return {
      IconHeart,
      IconTemperature,
      IconWeight,
      IconOxygen,
      healthData,
      updatedData,
      showUpdateForm,
      fetchHealthData,
      updateHealthData,
      showMedicationModal,
      showAddMedicationForm,
      medications,
      newMedication,
      addMedication,
      goToMedications,
    };
  }
});
</script>

<template>
  <div class="health-monitoring">
    <h1 class="page-title">{{$t("healthMonitoring.title")}}</h1>

    <div class="dashboard-layout">
      <div class="metrics-panel">
        <div class="panel-header">
          <h2>{{$t("healthMonitoring.title")}}</h2>
          <button class="update-button" @click="showUpdateForm = true">
            {{$t("healthMonitoring.updateValues")}}
          </button>
        </div>

        <div class="metrics-grid">
          <div class="metric-item">
            <div class="metric-icon heart-rate">
              <IconHeart />
            </div>
            <div class="metric-value">
              {{ healthData.heartRate }} {{ $t("healthMonitoring.metrics.heartRate.unit") }}
            </div>
          </div>

          <div class="metric-item">
            <div class="metric-icon temperature">
              <IconTemperature />
            </div>
            <div class="metric-value">
              {{ healthData.temperature }} {{ $t("healthMonitoring.metrics.temperature.unit") }}
            </div>
          </div>

          <div class="metric-item">
            <div class="metric-icon weight">
              <IconWeight />
            </div>
            <div class="metric-value">
              {{ healthData.weight }} {{ $t("healthMonitoring.metrics.weight.unit") }}
            </div>
          </div>

          <div class="metric-item">
            <div class="metric-icon oxygen">
              <IconOxygen />
            </div>
            <div class="metric-value">
              {{ healthData.oxygen }} %
            </div>
          </div>
        </div>

        <div class="metric-actions">
          <button class="action-button medication-list"  @click="goToMedications">
            {{ $t("healthMonitoring.actions.medications") }}
          </button>
        </div>
      </div>


      <div class="info-panels">
        <div class="info-panel">
          <h3>{{ $t("healthMonitoring.metrics.heartRate.label") }}</h3>
          <p>{{ $t("healthMonitoring.metrics.heartRate.info") }}</p>
        </div>

        <div class="info-panel">
          <h3>{{ $t("healthMonitoring.metrics.temperature.label") }}</h3>
          <p>{{ $t("healthMonitoring.metrics.temperature.info") }}</p>
        </div>

        <div class="info-panel">
          <h3>{{ $t("healthMonitoring.metrics.weight.label") }}</h3>
          <p>{{ $t("healthMonitoring.metrics.weight.info") }}</p>
        </div>

        <div class="info-panel">
          <h3>{{ $t("healthMonitoring.metrics.oxygen.label") }}</h3>
          <p>{{ $t("healthMonitoring.metrics.oxygen.info") }}</p>
        </div>
      </div>
    </div>

    <!-- Update Health Data Modal -->
    <div v-if="showUpdateForm" class="modal-overlay" @click="showUpdateForm = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ $t("healthMonitoring.modals.updateHealthData.title") }}</h2>
          <button class="close-button" @click="showUpdateForm = false">×</button>
        </div>

        <form @submit.prevent="updateHealthData" class="update-form">
          <div class="form-group">
            <label for="heartRate">{{ $t("healthMonitoring.modals.updateHealthData.fields.heartRate") }}</label>
            <input
                type="number"
                id="heartRate"
                v-model="updatedData.heartRate"
                required
                min="0"
                max="200"
            />
          </div>

          <div class="form-group">
            <label for="temperature">{{ $t("healthMonitoring.modals.updateHealthData.fields.temperature") }}</label>
            <input
                type="number"
                id="temperature"
                v-model="updatedData.temperature"
                required
                step="0.1"
                min="35"
                max="42"
            />
          </div>

          <div class="form-group">
            <label for="weight">{{ $t("healthMonitoring.modals.updateHealthData.fields.weight") }}</label>
            <input
                type="number"
                id="weight"
                v-model="updatedData.weight"
                required
                min="0"
                max="500"
            />
          </div>

          <div class="form-group">
            <label for="oxygen">{{ $t("healthMonitoring.modals.updateHealthData.fields.oxygen") }}</label>
            <input
                type="number"
                id="oxygen"
                v-model="updatedData.oxygen"
                required
                min="0"
                max="100"
            />
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-button" @click="showUpdateForm = false">
              {{ $t("healthMonitoring.modals.updateHealthData.buttons.cancel") }}
            </button>
            <button type="submit" class="save-button">
              {{ $t("healthMonitoring.modals.updateHealthData.buttons.save") }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Medication Modal -->
    <div v-if="showMedicationModal" class="modal-overlay" @click="showMedicationModal = false">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{ $t("healthMonitoring.modals.medications.title") }}</h2>
        <button class="close-button" @click="showMedicationModal = false">×</button>
      </div>

      <div class="medications-list">
        <div v-for="(med, index) in medications" :key="index" class="medication-item">
          <div class="medication-info">
            <h4>{{ med.name }}</h4>
            <p>{{ med.dosage }}</p>
            <p class="medication-schedule">{{ med.schedule }}</p>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="add-medication-button" @click="showAddMedicationForm = true">
          {{ $t("healthMonitoring.modals.medications.addMedication") }}
        </button>
      </div>
    </div>
    </div>

    <!-- Add Medication Form -->
    <div v-if="showAddMedicationForm" class="modal-overlay">
    <div class="modal-content form-modal">
      <div class="modal-header">
        <h2>{{ $t("healthMonitoring.modals.addMedication.title") }}</h2>
        <button class="close-button" @click="showAddMedicationForm = false">×</button>
      </div>

      <form @submit.prevent="addMedication" class="medication-form">
        <div class="form-group">
          <label for="med-name">{{ $t("healthMonitoring.modals.addMedication.fields.name") }}</label>
          <input 
            type="text" 
            id="med-name" 
            v-model="newMedication.name" 
            required placeholder="Enter medication name" />
        </div>

        <div class="form-group">
          <label for="med-dosage">{{ $t("healthMonitoring.modals.addMedication.fields.dosage") }}</label>
          <input 
            type="text" 
            id="med-dosage" 
            v-model="newMedication.dosage" 
            required placeholder="e.g., 50mg" />
        </div>

        <div class="form-group">
          <label for="med-schedule">{{ $t("healthMonitoring.modals.addMedication.fields.schedule") }}</label>
          <input 
            type="text" 
            id="med-schedule" 
            v-model="newMedication.schedule" 
            required placeholder="e.g., Twice daily with meals" />
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-button" @click="showAddMedicationForm = false">
            {{ $t("healthMonitoring.modals.addMedication.buttons.cancel") }}
          </button>
          <button type="submit" class="save-button">
            {{ $t("healthMonitoring.modals.addMedication.buttons.save") }}
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>


<style scoped>
.health-monitoring {
  width: 100%;
}

.page-title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-4);
  color: var(--color-gray-800);
}

.dashboard-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-4);
}

.metrics-panel {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
}

.panel-header {
  margin-bottom: var(--space-3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header h2 {
  font-size: var(--font-size-xl);
  color: var(--color-gray-800);
  font-weight: var(--font-weight-medium);
}

.update-button {
  background-color: var(--color-secondary);
  color: var(--color-white);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  transition: background-color var(--transition-fast) ease;
}

.update-button:hover {
  background-color: var(--color-secondary-dark);
}

.metrics-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.metric-item {
  display: flex;
  align-items: center;
  background-color: var(--color-primary-light);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  transition: transform var(--transition-fast) ease, box-shadow var(--transition-fast) ease;
}

.metric-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.metric-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: var(--space-3);
  color: var(--color-white);
}

.heart-rate {
  background-color: var(--color-primary);
}

.temperature {
  background-color: var(--color-warning);
}

.weight {
  background-color: var(--color-secondary);
}

.oxygen {
  background-color: var(--color-accent);
}

.metric-value {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
}

.metric-actions {
  margin-top: var(--space-4);
}

.action-button {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  text-align: center;
  transition: all var(--transition-fast) ease;
}

.medication-list {
  background-color: var(--color-accent);
  color: var(--color-gray-800);
}

.medication-list:hover {
  background-color: #97d9c0;
}
.main-content {
  margin-left: 280px; /* igual que el ancho del sidebar */
}
.info-panels {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.info-panel {
  background-color: var(--color-primary-light);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  transition: transform var(--transition-fast) ease, box-shadow var(--transition-fast) ease;
}

.info-panel:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.info-panel h3 {
  font-size: var(--font-size-lg);
  color: var(--color-gray-800);
  margin-bottom: var(--space-2);
  font-weight: var(--font-weight-medium);
}

.info-panel p {
  color: var(--color-gray-700);
  line-height: 1.6;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: var(--space-3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-gray-200);
}

.close-button {
  background: transparent;
  border: none;
  font-size: var(--font-size-2xl);
  color: var(--color-gray-500);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 0;
}

.close-button:hover {
  background-color: var(--color-gray-100);
  color: var(--color-gray-700);
}

.medications-list {
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.medication-item {
  background-color: var(--color-gray-100);
  border-radius: var(--radius-md);
  padding: var(--space-3);
}

.medication-info h4 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-1);
  color: var(--color-gray-800);
}

.medication-schedule {
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  margin-top: var(--space-1);
}

.modal-footer {
  padding: var(--space-3);
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: flex-end;
}

.add-medication-button {
  background-color: var(--color-accent);
  color: var(--color-gray-800);
}

.add-medication-button:hover {
  background-color: #97d9c0;
}

.form-modal {
  max-width: 600px;
}

.update-form,
.medication-form {
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: var(--space-1);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
}

.form-group input {
  padding: var(--space-2);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  transition: all var(--transition-fast) ease;
}

.form-group input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.cancel-button {
  background-color: var(--color-gray-200);
  color: var(--color-gray-700);
}

.cancel-button:hover {
  background-color: var(--color-gray-300);
}

.save-button {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.save-button:hover {
  background-color: var(--color-primary-dark);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .metrics-panel {
    margin-bottom: var(--space-3);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: var(--font-size-xl);
    margin-bottom: var(--space-3);
  }

  .metrics-grid {
    gap: var(--space-2);
  }

  .modal-content {
    width: 95%;
  }
}
</style>