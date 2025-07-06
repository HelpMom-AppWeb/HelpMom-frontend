import {Patient} from "../model/patient.entity.js";

export class PatientAssembler {
    static toEntityFromResource(resource) {
        return new Patient({...resource});
    }

    static toEntitiesFromResponse(response) {
        const data = response.data;
        if (!Array.isArray(data)) {
            console.error("Error: Se recibió:", data);
            return [];
        }
        return data.map((patient, index) => {
            return this.toEntityFromResource(patient);
        });
    }
}