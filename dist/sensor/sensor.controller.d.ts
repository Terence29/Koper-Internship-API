import { SensorService } from './sensor.service';
import { Sensor } from './sensor.interface';
export declare class SensorController {
    private readonly sensorService;
    constructor(sensorService: SensorService);
    findAll(): Sensor[];
    findOne(id: string): Sensor;
    create(sensors: Sensor[]): Sensor[];
    update(id: string, sensor: Sensor): Sensor;
    delete(id: string): void;
    findBySensorType(sensorType: string): Sensor[];
    findByLocationType(locationType: string): Sensor[];
}
