import { Sensor, MqttProtocol } from 'src/sensor/sensor.interface';
export declare class MqttBrokerService {
    private brokers;
    private readonly logger;
    addBroker(mqttProtocol: Partial<MqttProtocol>, sensor: Sensor): void;
    subscribeToTopic(mqttProtocol: Partial<MqttProtocol>, sensor: Sensor): void;
    private sendToDatabase;
    deleteBroker(mqttProtocol: Partial<MqttProtocol>): void;
}
