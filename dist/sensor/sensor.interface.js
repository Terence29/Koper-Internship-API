"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttProtocol = exports.HumiditySensor = exports.TemperatureSensor = void 0;
class TemperatureSensor {
    constructor() {
        this.unit = 'C';
        this.type = 'temperature';
    }
}
exports.TemperatureSensor = TemperatureSensor;
class HumiditySensor {
    constructor() {
        this.unit = '%';
        this.type = 'humidity';
    }
}
exports.HumiditySensor = HumiditySensor;
class MqttProtocol {
}
exports.MqttProtocol = MqttProtocol;
//# sourceMappingURL=sensor.interface.js.map