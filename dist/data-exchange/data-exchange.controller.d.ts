import * as Interface from 'src/sensor/sensor.interface';
import { MqttService } from './data-exchange.service';
export declare class DataExchangeController {
}
export declare class MqttController {
    private readonly mqttService;
    constructor(mqttService: MqttService);
    getDataFromSensor(sensor: Interface.Sensor, protocol: Interface.MqttProtocol): (Interface.Sensor | Interface.MqttProtocol)[];
}
