import { Sensor } from './sensor.interface';
export declare class SensorService {
    private sensors;
    private currentId;
    findAll(): Sensor[];
    findOne(id: number): Sensor;
    findBySensorType(sensorType: string): Sensor[];
    findByLocationType(locationType: string): Sensor[];
    create(sensor: Sensor): Sensor;
    update(id: number, updatedSensor: Sensor): Sensor;
    delete(id: number): void;
}
