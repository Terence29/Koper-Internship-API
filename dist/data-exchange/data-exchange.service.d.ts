import { MqttProtocol } from 'src/sensor/sensor.interface';
export declare class DataExchangeService {
}
export declare class MqttBrokerService {
    private brokers;
    private messageStore;
    private readonly logger;
    addBroker(mqttProtocol: MqttProtocol): void;
    subscribeToTopic(mqttProtocol: MqttProtocol): void;
    private setMessage;
    getMessage(clientId: string): string;
    deleteBroker(mqttProtocol: MqttProtocol): void;
}
