import { Sensor, MqttProtocol } from 'src/sensor/sensor.interface';
export declare class MqttBrokerService {
    private brokers;
    private readonly logger;
    addBroker(mqttProtocol: Partial<MqttProtocol>, sensor: Sensor): void;
    subscribeToTopic(mqttProtocol: MqttProtocol, sensor: Sensor): void;
    private sendToDatabase;
    deleteBroker(mqttProtocol: MqttProtocol): void;
}
export declare class DataExchangeService {
    private readonly mqttBrokerService;
    constructor(mqttBrokerService: MqttBrokerService);
    private sensors;
    addSensor(protocol: string, sensor: Sensor): void;
    getConfig<T>(path: string): Partial<T>;
}
