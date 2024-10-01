"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sensor_entity_1 = require("./entity/sensor.entity");
let SensorService = class SensorService {
    constructor(sensorRepository) {
        this.sensorRepository = sensorRepository;
        this.protocol = [
            {
                "clientId": '1',
                "name": "Broker Mosquitto",
                "topic": "a",
                "url": "INTERN"
            }
        ];
    }
    async findAll() {
        return await this.sensorRepository.find({ relations: ['data'] });
    }
    async findOne(id) {
        return await this.sensorRepository.findOne({
            where: { sensor_id: id },
            relations: ['data']
        });
    }
    async findByType(type) {
        return await this.sensorRepository.find({
            where: { type },
            relations: ['data']
        });
    }
    async findByLocation(location) {
        return await this.sensorRepository.find({
            where: { location },
            relations: ['data']
        });
    }
    async create(sensor) {
        const newSensor = this.sensorRepository.create({
            ...sensor,
            created_at: new Date(),
        });
        return await this.sensorRepository.save(newSensor);
    }
    async update(id, updatedSensor) {
        const sensor = await this.sensorRepository.findOne({ where: { sensor_id: id } });
        if (sensor) {
            const { id: _, ...sensorData } = updatedSensor;
            await this.sensorRepository.update(id, sensorData);
            return this.sensorRepository.findOne({ where: { sensor_id: id } });
        }
        return null;
    }
    async delete(id) {
        await this.sensorRepository.delete(id);
    }
};
exports.SensorService = SensorService;
exports.SensorService = SensorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sensor_entity_1.SensorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SensorService);
//# sourceMappingURL=sensor.service.js.map