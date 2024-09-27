import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorEntity } from './sensor.entity';  
import { Sensor } from './sensor.interface';
import { MqttProtocol } from './sensor.interface';
import { HttpService } from '@nestjs/axios';
import { async, lastValueFrom } from 'rxjs';

@Injectable()
export class SensorService {
  // Injecter le Repository pour SensorEntity
  constructor(
    @InjectRepository(SensorEntity)
    private readonly sensorRepository: Repository<SensorEntity>,  // Le repository pour l'entité
  ) {}

  private protocol: MqttProtocol[] = [
    {
      "clientId": '1',
      "name": "Broker Mosquitto",
      "topic": "a",
      "url": "INTERN"
    }
  ];

  async findAll(): Promise<SensorEntity[]> {
    return await this.sensorRepository.find();
  }

  async findOne(id: number): Promise<SensorEntity> {
    return await this.sensorRepository.findOne({where : {sensor_id: id} });
  }

  async findByType(type: string): Promise<SensorEntity[]> {
    return await this.sensorRepository.find({where : {type} });
  }

  async findByLocation(location: string): Promise<SensorEntity[]> {
    return await this.sensorRepository.find({where : {location} });
  }

  async create(sensor: Sensor): Promise<SensorEntity> {
    const newSensor = this.sensorRepository.create({
      ...sensor,
      created_at: new Date(),
    });
    return await this.sensorRepository.save(newSensor);
  }

  async update(id: number, updatedSensor: Partial<Sensor>): Promise<SensorEntity> {
    const sensor = await this.sensorRepository.findOne({ where: { sensor_id: id } });
    if (sensor) {
      // Supprimer l'ID de l'objet de mise à jour pour éviter les conflits
      const { id: _, ...sensorData } = updatedSensor;      
      await this.sensorRepository.update(id, sensorData);
      return this.sensorRepository.findOne({ where: { sensor_id: id } });
    }
    return null;
  }  

  async delete(id: number): Promise<void> {
    await this.sensorRepository.delete(id);  // Supprimer le capteur
  }
}

