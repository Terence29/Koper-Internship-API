import { MqttClient } from 'mqtt/*';
import { Sensor, MqttProtocol } from 'src/sensor/sensor.interface';
export declare class DataExchangeService {
}
export declare class MqttService {
    readonly mqtt: MqttClient;
    subscribe(): void;
    getData(sensor: Sensor, protocol: MqttProtocol): (Sensor | MqttProtocol)[];
}
