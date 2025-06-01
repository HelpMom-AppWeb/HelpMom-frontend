export class Medication {
    constructor(name = '', quantity = 0, dose = '', route = '', frequency = '', duration = '') {
        this.name = name;
        this.quantity = quantity;
        this.dose = dose;
        this.route = route;
        this.frequency = frequency;
        this.duration = duration;
    }
}
