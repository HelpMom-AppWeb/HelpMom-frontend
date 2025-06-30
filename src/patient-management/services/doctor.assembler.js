import { Doctor } from "../model/doctor.entity.js";

export class DoctorAssembler {
    static toEntityFromResource(resource) {
        return new Doctor({...resource});
    }

    static toEntityFromResponse(response) {
        if (response.data.status !== 'ok') {
            console.error(`${response.status} ${response.code} ${response.message}`);
            return null;
        }
        const doctorResponse = response.data;
        return this.toEntityFromResource(doctorResponse.doctor);
    }

}