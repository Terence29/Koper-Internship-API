import { Sensor } from './sensor.interface';
export declare class SensorService {
    private sensors;
    private currentId;
    private protocol;
    findAll(): Sensor[];
    findOne(id: number): Sensor;
    findByType(type: string): Sensor[];
    findByLocation(location: string): Sensor[];
    create(sensor: Sensor): Sensor;
    update(id: number, updatedSensor: Sensor): Sensor;
    delete(id: number): void;
}
