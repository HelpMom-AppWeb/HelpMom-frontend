import axios from 'axios';
import { Message } from '../model/chat.model.js';

const API_BASE = 'http://localhost:3000';

export const ChatService = {
    async getMessages(patientId) {
        const res = await axios.get(`${API_BASE}/messages`);
        return res.data
            .filter(msg => msg.patientId === patientId)
            .map(msg => new Message(msg));
    },

    async sendMessage(msg) {
        const res = await axios.post(`${API_BASE}/messages`, msg);
        return new Message(res.data);
    },

    async deleteMessage(id) {
        return await axios.delete(`${API_BASE}/messages/${id}`);
    },

    async getPatient(patientId) {
        const res = await axios.get(`${API_BASE}/patients/${patientId}`);
        return res.data;
    },

    async getPatients() {
        const res = await axios.get(`${API_BASE}/patients`);
        return res.data;
    }
};
