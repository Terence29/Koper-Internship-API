"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MqttBrokerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttBrokerService = void 0;
const common_1 = require("@nestjs/common");
const mqtt = require("mqtt");
let MqttBrokerService = MqttBrokerService_1 = class MqttBrokerService {
    constructor() {
        this.brokers = {};
        this.logger = new common_1.Logger(MqttBrokerService_1.name);
    }
    addBroker(mqttProtocol, sensor) {
        if (this.brokers[mqttProtocol.clientId]) {
            this.logger.warn(`Broker with id ${mqttProtocol.clientId} already exists, list of brokers ${this.brokers}`);
            return;
        }
        const newClient = mqtt.connect(mqttProtocol.url, mqttProtocol);
        newClient.on('connect', () => {
            this.logger.log(`Connected to broker ${mqttProtocol.clientId} at ${mqttProtocol.url}`);
        });
        newClient.on('error', (error) => {
            this.logger.error(`Error in broker ${mqttProtocol.clientId}:`, error);
        });
        this.brokers[mqttProtocol.clientId] = newClient;
        this.subscribeToTopic(mqttProtocol, sensor);
    }
    subscribeToTopic(mqttProtocol, sensor) {
        const client = this.brokers[mqttProtocol.clientId];
        if (client) {
            client.subscribe(mqttProtocol.topic, {}, (err) => {
                if (err) {
                    this.logger.error(`Failed to subscribe to topic ${mqttProtocol.topic} on broker ${mqttProtocol.clientId}`);
                }
                else {
                    this.logger.log(`Subscribed to topic ${mqttProtocol.topic} on broker ${mqttProtocol.clientId}`);
                }
            });
            client.on('message', (topic, message) => {
                const payload = message.toString();
                this.logger.log(`Message received on topic ${topic}: ${payload}`);
                this.sendToDatabase(sensor, payload);
            });
        }
        else {
            this.logger.warn(`Broker with id ${mqttProtocol.clientId} not found.`);
        }
    }
    sendToDatabase(sensor, payload) {
        this.logger.log(`Implement "sendToDatabase" mqtt`);
    }
    deleteBroker(mqttProtocol) {
        const client = this.brokers[mqttProtocol.clientId];
        if (client) {
            client.end();
            delete this.brokers[mqttProtocol.clientId];
            this.logger.log(`Disconnected broker ${mqttProtocol.clientId}`);
        }
        else {
            this.logger.warn(`Broker with id ${mqttProtocol.clientId} not found.`);
        }
    }
};
exports.MqttBrokerService = MqttBrokerService;
exports.MqttBrokerService = MqttBrokerService = MqttBrokerService_1 = __decorate([
    (0, common_1.Injectable)()
], MqttBrokerService);
//# sourceMappingURL=mqtt-broker.service.js.map