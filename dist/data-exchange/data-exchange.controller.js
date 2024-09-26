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
exports.DataExchangeController = exports.MqttController = void 0;
const common_1 = require("@nestjs/common");
const Interface = require("../sensor/sensor.interface");
const data_exchange_service_1 = require("./data-exchange.service");
let MqttController = class MqttController {
    constructor(mqttBrokerService) {
        this.mqttBrokerService = mqttBrokerService;
    }
    addBroker(protocol) {
        this.mqttBrokerService.addBroker(protocol);
        return `Broker ${protocol.clientId} added.`;
    }
};
exports.MqttController = MqttController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MqttController.prototype, "addBroker", null);
exports.MqttController = MqttController = __decorate([
    (0, common_1.Controller)('mqtt'),
    __metadata("design:paramtypes", [data_exchange_service_1.MqttBrokerService])
], MqttController);
let DataExchangeController = class DataExchangeController {
};
exports.DataExchangeController = DataExchangeController;
exports.DataExchangeController = DataExchangeController = __decorate([
    (0, common_1.Controller)('data-exchange')
], DataExchangeController);
//# sourceMappingURL=data-exchange.controller.js.map