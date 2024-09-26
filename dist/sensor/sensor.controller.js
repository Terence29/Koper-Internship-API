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
exports.SensorController = void 0;
const common_1 = require("@nestjs/common");
const sensor_service_1 = require("./sensor.service");
const sensor_utils_1 = require("./sensor.utils");
let SensorController = class SensorController {
    constructor(sensorService) {
        this.sensorService = sensorService;
    }
    async findAll() {
        const sensors = await this.sensorService.findAll();
        const sensorsWithLinks = await Promise.all(sensors.map(sensor => (0, sensor_utils_1.addHateoasLinks)(sensor)));
        console.log('Here');
        return sensorsWithLinks;
    }
    findOne(id) {
        const sensor = this.sensorService.findOne(Number(id));
        return (0, sensor_utils_1.addHateoasLinks)(sensor);
    }
    create(sensors) {
        return sensors.map(sensor => this.sensorService.create(sensor));
    }
    update(id, sensor) {
        return this.sensorService.update(Number(id), sensor);
    }
    delete(id) {
        this.sensorService.delete(Number(id));
    }
    findBySensorType(type) {
        const sensors = this.sensorService.findByType(type);
        return sensors.map(sensor => (0, sensor_utils_1.addHateoasLinks)(sensor));
    }
    findByLocationType(location) {
        const sensors = this.sensorService.findByLocation(location);
        return sensors.map(sensor => (0, sensor_utils_1.addHateoasLinks)(sensor));
    }
};
exports.SensorController = SensorController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SensorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], SensorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Array)
], SensorController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], SensorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('type/:type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], SensorController.prototype, "findBySensorType", null);
__decorate([
    (0, common_1.Get)('location/:location'),
    __param(0, (0, common_1.Param)('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], SensorController.prototype, "findByLocationType", null);
exports.SensorController = SensorController = __decorate([
    (0, common_1.Controller)('sensors'),
    __metadata("design:paramtypes", [sensor_service_1.SensorService])
], SensorController);
//# sourceMappingURL=sensor.controller.js.map