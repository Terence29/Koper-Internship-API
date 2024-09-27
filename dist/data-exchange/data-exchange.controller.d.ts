import * as Interface from 'src/sensor/sensor.interface';
import { DataExchangeService } from './data-exchange.service';
export declare class DataExchangeController {
}
export declare class MqttController {
    private readonly dataExchangeService;
    constructor(dataExchangeService: DataExchangeService);
    addSensor(body: {
        protocol: string;
        sensor: Interface.Sensor;
    }): string;
}
