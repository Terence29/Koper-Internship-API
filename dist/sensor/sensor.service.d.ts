import { Repository } from 'typeorm';
import { SensorEntity } from './entity/sensor.entity';
import { Sensor } from './sensor.interface';
export declare class SensorService {
    private readonly sensorRepository;
    constructor(sensorRepository: Repository<SensorEntity>);
    private protocol;
    findAll(): Promise<SensorEntity[]>;
    findOne(id: number): Promise<SensorEntity>;
    findByType(type: string): Promise<SensorEntity[]>;
    findByLocation(location: string): Promise<SensorEntity[]>;
    create(sensor: Sensor): Promise<SensorEntity>;
    update(id: number, updatedSensor: Partial<Sensor>): Promise<SensorEntity>;
    delete(id: number): Promise<void>;
}
