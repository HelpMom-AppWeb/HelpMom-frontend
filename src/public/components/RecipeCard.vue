<script setup>
  import AddNoteButton from './AddNoteButton.vue';

  const props = defineProps({
    recipe: {
      type: Object,
      required: true
    }
  });

  const emit = defineEmits(['add-note', 'update-medication', 'add-medication']);

  const handleAddNote = () => {
    const noteText = prompt('Ingrese una nota:', 'Nueva nota');
    if (noteText) {
      emit('add-note', props.recipe.id, noteText);
    }
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedication = { ...props.recipe.medications[index] };
    updatedMedication[field] = value;
    emit('update-medication', props.recipe.id, index, updatedMedication);
  };

  const handleAddMedication = () => {
    emit('add-medication', props.recipe.id);
  };
  </script>

  <template>
    <div class="recipe-card">
      <table>
        <thead>
          <tr>
            <th>Medication/Concentration</th>
            <th>Quantity</th>
            <th>Dose</th>
            <th>Vía</th>
            <th>Frequency</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(medication, index) in recipe.medications" :key="index">
            <td>
              <input
                type="text"
                :value="medication.name"
                @input="handleMedicationChange(index, 'name', $event.target.value)"
                placeholder="Name of medication"
              />
            </td>
            <td>
              <input
                type="number"
                :value="medication.quantity"
                @input="handleMedicationChange(index, 'quantity', Number($event.target.value))"
                min="0"
              />
            </td>
            <td>
              <input
                type="text"
                :value="medication.dose"
                @input="handleMedicationChange(index, 'dose', $event.target.value)"
                placeholder="Dose"
              />
            </td>
            <td>
              <input
                type="text"
                :value="medication.route"
                @input="handleMedicationChange(index, 'route', $event.target.value)"
                placeholder="Vía"
              />
            </td>
            <td>
              <input
                type="text"
                :value="medication.frequency"
                @input="handleMedicationChange(index, 'frequency', $event.target.value)"
                placeholder="Frequency"
              />
            </td>
            <td>
              <input
                type="text"
                :value="medication.duration"
                @input="handleMedicationChange(index, 'duration', $event.target.value)"
                placeholder="Duration"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button class="add-medication-btn" @click="handleAddMedication">
        Add Medication
      </button>

      <div v-if="recipe.notes.length > 0" class="notes">
        <div v-for="note in recipe.notes" :key="note.id" class="note">
          {{ note.text }}
        </div>
      </div>

      <AddNoteButton @click="handleAddNote" />
    </div>
  </template>

  <style scoped>
  .recipe-card {
    background-color: #ffecef;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15px;
    font-size: 0.9rem;
  }

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ffd0d0;
  }

  th {
    font-weight: bold;
    color: #444;
  }

  input {
    width: 100%;
    padding: 4px;
    border: 1px solid #ffd0d0;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  input:focus {
    outline: none;
    border-color: #ff9999;
  }

  .notes {
    margin: 10px 0;
  }

  .note {
    background-color: #fff;
    padding: 8px;
    border-radius: 5px;
    margin-bottom: 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .add-medication-btn {
    background-color: #a5f5b9;
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .add-medication-btn:hover {
    background-color: #8ae59d;
  }

  @media (max-width: 768px) {
    table {
      font-size: 0.8rem;
    }

    th, td {
      padding: 5px;
    }

    input {
      font-size: 0.8rem;
    }
  }
  </style>
