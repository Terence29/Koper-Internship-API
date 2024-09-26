"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorService = void 0;
const common_1 = require("@nestjs/common");
let SensorService = class SensorService {
    constructor() {
        this.sensors = [];
        this.currentId = 1;
        this.protocol = [
            {
                "clientId": '1',
                "name": "Broker Mosquitto",
                "topic": "a",
                "url": "INTERN"
            }
        ];
    }
    findAll() {
        return this.sensors;
    }
    findOne(id) {
        return this.sensors.find(sensor => sensor.id === id);
    }
    findByType(type) {
        return this.sensors.filter(sensor => sensor.type === type);
    }
    findByLocation(location) {
        return this.sensors.filter(sensor => sensor.type === location);
    }
    create(sensor) {
        const newSensor = {
            ...sensor,
            id: this.currentId++,
            created_at: new Date(),
        };
        this.sensors.push(newSensor);
        return newSensor;
    }
    update(id, updatedSensor) {
        const sensorIndex = this.sensors.findIndex(sensor => sensor.id === id);
        if (sensorIndex >= 0) {
            this.sensors[sensorIndex] = updatedSensor;
            return updatedSensor;
        }
        return null;
    }
    delete(id) {
        this.sensors = this.sensors.filter(sensor => sensor.id !== id);
    }
};
exports.SensorService = SensorService;
exports.SensorService = SensorService = __decorate([
    (0, common_1.Injectable)()
], SensorService);
//# sourceMappingURL=sensor.service.js.map