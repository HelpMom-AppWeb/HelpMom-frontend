import {Baby} from "./baby.entity.js";

export class Patient{
    constructor({id = '', name = '', email = '', phone = '', baby = null, assignedDoctor = ''}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.baby = baby ? new Baby(baby) : null;
        this.assignedDoctor = assignedDoctor;
    }
}