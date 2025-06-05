import axios from "axios";
import {environment} from "@/environment/environment.js";

export class UserService {

    http = null;
    constructor() {
        this.http = axios.create({
            baseURL: environment.baseUrl
        })
    }

    async signUpUser(username, password) {
        try {
            return await this.http.post('authentication/sign-up', {
                username: username,
                password: password
            })
        }catch(e) {
            console.log('Error to sign up user', e)
            return null;
        }
    }

    async signInUser(username, password) {
        try {
            return await this.http.post('authentication/sign-in', {
                username: username,
                password: password
            })
        }catch(e) {
            return e;
        }

    }

    async authUser(email, password) {
        const headers = this.getHeadersAuthorization();
        return await this.http.get(`users/auth?email=${email}&password=${password}`, { headers });
    }

    async getAllUsers() {
        try {
            const headers = this.getHeadersAuthorization();
            const response = await this.http.get('users', { headers });
            return response;
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            throw error;
        }
    }

    async getCompanyInformationByCode(identificationCode) {
        try {
            // Obtenemos la información de la compañía usando el identificationCode
            const companyResponse = await this.http.get(`companies/?identificationCode=${identificationCode}`);
            return companyResponse.data[0]; // como es un array, obtenemos el objeto que es unico
        } catch (error) {
            console.error(`Error al obtener la información de la compañía con el código de identificación ${identificationCode}:`, error);
            throw error;
        }
    }

    async getUserById( id ) {
        try {
            const response = await this.http.get(`users/${id}`);
            return response;
        } catch (error) {
            console.error(`Error al obtener el usuario con id ${id}:`, error);
            throw error;
        }
    }

    // obtener usuarios registrados por role de Team o Director
    async getUsersByRole( role ) {
        try {
            const response = await this.http.get(`users/?role=${role}`);
            return response;
        } catch (error) {
            console.error(`Error al obtener usuarios con el rol ${role}:`, error);
            throw error;
        }
    }

    async createNewUser( user ) {
        try {
            const headers = this.getHeadersAuthorization();
            return await this.http.post('users', user, { headers });
        } catch (error) {
            console.error('Error al crear un nuevo usuario:', error);
            throw error;
        }
    }

    async updateUser(user) {
        try {
            const response = await this.http.put(`users/${user.id}`, user);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            throw error;
        }
    }

    async updateUserByEmail(email, body) {
        const newBody = {
            firstName: body.firstName,
            lastName: body.lastName,
            age: body.age,
            phone: body.phone,
            occupation: body.occupation,
            password: body.password,
            profileImg: body.profileImg,
            role: body.role,
            companyName: body.companyName,
            bio: body.bio,
            companyId: body.companyId,
        }

        try {
            const headers = this.getHeadersAuthorization();
            const response = await this.http.put(`users?email=${email}`, newBody, { headers });
            return response;
        }catch(e) {
            console.log('Error to update user')
            return null;
        }
    }

    getHeadersAuthorization() {
        return {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        }
    }
}