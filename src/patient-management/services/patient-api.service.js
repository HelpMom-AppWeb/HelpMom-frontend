import axios from "axios";

const httpInstance = axios.create({
    baseURL: import.meta.env.API_BASE_URL,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

export class PatientApiService{
    resourceEndpoint = import.meta.env.PATIENTS_PATH;

    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }

    createPatient(patient) {
        return httpInstance.post(this.resourceEndpoint, patient);
    }

    getAllPatientsByDoctorId(doctorId){
        return httpInstance.get(`/doctors${doctorId}${this.resourceEndpoint}`);
    }

}