import { SensorService } from './sensor.service';
import { Sensor } from './sensor.interface';
export declare class SensorController {
    private readonly sensorService;
    constructor(sensorService: SensorService);
    findAll(): Promise<any>;
    findOne(id: string): any;
    create(sensors: Sensor[]): Sensor[];
    update(id: string, sensor: Sensor): Sensor;
    delete(id: string): void;
    findBySensorType(type: string): any;
    findByLocationType(location: string): any;
}
