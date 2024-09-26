import * as Interface from 'src/sensor/sensor.interface';
import { MqttBrokerService } from './data-exchange.service';
export declare class MqttController {
    private readonly mqttBrokerService;
    constructor(mqttBrokerService: MqttBrokerService);
    addBroker(protocol: Interface.MqttProtocol): string;
}
export declare class DataExchangeController {
}
