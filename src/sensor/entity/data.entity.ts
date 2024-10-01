import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SensorEntity } from './sensor.entity';

@Entity('Data')
export class DataEntity {
  
  @PrimaryGeneratedColumn()
  data_id: number;

  @Column()
  value: number;

  @Column()
  unit: string;

  // Relation avec SensorEntity
  @ManyToOne(() => SensorEntity, sensor => sensor.data)
  @JoinColumn({ name: 'sensor_id' })
  sensor: SensorEntity;
}
