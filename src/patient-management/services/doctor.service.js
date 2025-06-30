import axios from "axios";

const httpInstance = axios.create({
    baseURL: import.meta.env.API_BASE_URL,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

export class DoctorService {
    resourceEndpoint = import.meta.env.DOCTORS_PATH;

    getAllPatients(){
        return httpInstance.get(`${this.resourceEndpoint}/patients`);
    }

}