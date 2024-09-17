import { SensorService } from './sensor/sensor.service';
import { Sensor } from './sensor/sensor.interface';
export declare class SensorController {
    private readonly sensorService;
    constructor(sensorService: SensorService);
    findAll(): Sensor[];
    findOne(id: string): Sensor;
    create(sensor: Sensor): Sensor;
    update(id: string, sensor: Sensor): Sensor;
    delete(id: string): void;
}
