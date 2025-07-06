import axios from "axios";

const httpInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

export class PatientService {
    resourceEndpoint = import.meta.env.VITE_PATIENTS_PATH;

    getPatientById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }

    createPatient(patient) {
        return httpInstance.post(this.resourceEndpoint, patient);
    }

    getAllPatientsByDoctorId(doctorId) {
        console.log(this.resourceEndpoint);
        return httpInstance.get(`/doctors/${doctorId}${this.resourceEndpoint}`);
    }

}