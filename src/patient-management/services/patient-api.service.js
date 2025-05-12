import axios from "axios";

const httpInstance = axios.create({
    baseURL: import.meta.env.API_BASE_URL,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

export class PatientApiService{
    resourceEndpoint = import.meta.env.PATIENTS_PATH;

    getAll(){
        return httpInstance.get(this.resourceEndpoint);
    }

    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }

}