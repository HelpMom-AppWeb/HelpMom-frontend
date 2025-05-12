export class Recipe {
    constructor(id, medications = [], notes = []) {
        this.id = id;
        this.medications = medications;
        this.notes = notes;
    }

    addMedication(medication) {
        this.medications.push(medication);
    }

    updateMedication(index, medication) {
        this.medications[index] = medication;
    }

    addNote(note) {
        this.notes.push(note);
    }
}
