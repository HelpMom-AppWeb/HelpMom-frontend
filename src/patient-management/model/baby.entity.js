export class Baby{
    constructor({id = '', motherId = '', name = '', birthDate = '', gender = ''}){
        this.id = id;
        this.motherId = motherId;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
    }
}