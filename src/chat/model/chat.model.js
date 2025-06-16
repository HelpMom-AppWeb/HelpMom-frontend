export class Message {
    constructor({ id, from, text, timestamp, patientId }) {
        this.id = id;
        this.from = from;
        this.text = text;
        this.timestamp = timestamp;
        this.patientId = patientId;
    }
}
