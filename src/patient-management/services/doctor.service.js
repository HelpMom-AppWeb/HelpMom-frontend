import axios from "axios";

const httpInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

export class DoctorService {
    resourceEndpoint = import.meta.env.VITE_DOCTORS_PATH;

    getDoctorById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }

    getAllDoctors(){
        return httpInstance.get(this.resourceEndpoint);
    }

}