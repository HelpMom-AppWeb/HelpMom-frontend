import {Patient} from "../model/patient.entity.js";

export class PatientAssembler {
    static toEntityFromResource(resource) {
        return new Patient({...resource});
    }

    static toEntitiesFromResponse(response) {
        if (response.data.status !== 'ok') {
            console.error(`${response.status} ${response.code} ${response.message}`);
            return [];
        }
        const patientsResponse = response.data;
        return patientsResponse.patients.map((patient) => {
            return this.toEntityFromResource(patient);
        });
    }
}