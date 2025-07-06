import {Baby} from "../../patient-management/model/baby.entity.js";


export class Patient{
    constructor({
                    id = 0,
                    name = '',
                    email = '',
                    phone = '',
                    baby = null,
                    assignedDoctorId = ''}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.baby = baby ? new Baby(baby) : null;
        this.assignedDoctorId = assignedDoctorId;
    }
}