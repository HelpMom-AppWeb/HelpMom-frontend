import {Baby} from "./baby.entity.js";
import {Doctor} from "./doctor.entity.js";

export class Patient{
    constructor({
                    id = 0,
                    profileId = 0,
                    email = '',
                    name = '',
                    phone = '',
                    baby = null,
                    assignedDoctor = null}) {
        this.id = id;
        this.profileId = profileId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.baby = baby ? new Baby(baby) : null;
        this.assignedDoctor = assignedDoctor ? new Doctor(assignedDoctor) : null;
    }
}