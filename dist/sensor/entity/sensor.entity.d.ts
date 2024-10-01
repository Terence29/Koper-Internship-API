import { DataEntity } from './data.entity';
export declare class SensorEntity {
    sensor_id: number;
    name: string;
    type: string;
    unit: string;
    location: string;
    created_at: Date;
    data: DataEntity[];
}
