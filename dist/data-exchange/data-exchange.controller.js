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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttController = exports.DataExchangeController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const Interface = require("../sensor/sensor.interface");
const data_exchange_service_1 = require("./data-exchange.service");
let DataExchangeController = class DataExchangeController {
};
exports.DataExchangeController = DataExchangeController;
exports.DataExchangeController = DataExchangeController = __decorate([
    (0, common_1.Controller)('data-exchange')
], DataExchangeController);
let MqttController = class MqttController {
    constructor(mqttService) {
        this.mqttService = mqttService;
    }
    getDataFromSensor(sensor, protocol) {
        return this.mqttService.getData(sensor, protocol);
    }
};
exports.MqttController = MqttController;
__decorate([
    (0, microservices_1.MessagePattern)({ command: 'getDataMqtt' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Interface.MqttProtocol]),
    __metadata("design:returntype", void 0)
], MqttController.prototype, "getDataFromSensor", null);
exports.MqttController = MqttController = __decorate([
    (0, common_1.Controller)('mqtt'),
    __metadata("design:paramtypes", [data_exchange_service_1.MqttService])
], MqttController);
//# sourceMappingURL=data-exchange.controller.js.map