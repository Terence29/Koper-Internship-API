import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorEntity } from './entity/sensor.entity';  
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
      "id": 1,
      "name": "Broker Mosquitto",
      "topic": "a",
      "url": "INTERN"
    }
  ];

  async findAll(): Promise<SensorEntity[]> {
    const sensors = await this.sensorRepository.find({ relations : ['data']});

    return sensors.map(sensor => ({
      ...sensor,
      data: sensor.data ?? [],  // Assigne un tableau vide si `data` est null ou undefined
    }));
  }

  async findOne(id: number): Promise<SensorEntity> {
    return await this.sensorRepository.findOne({
      where : {sensor_id: id},
      relations : ['data']
    });
  }

  async findByType(type: string): Promise<SensorEntity[]> {
    return await this.sensorRepository.find({
      where : {type: type},
      relations : ['data']
    });
  }

  async findByLocation(location: string): Promise<SensorEntity[]> {
    return await this.sensorRepository.find({
      where : {location: location},
      relations : ['data']
    });
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
      const { sensor_id: _, ...sensorData } = updatedSensor;      
      await this.sensorRepository.update(id, sensorData);
      return this.sensorRepository.findOne({ where: { sensor_id: id } });
    }
    return null;
  }  

  async delete(id: number): Promise<void> {
    await this.sensorRepository.delete(id);  // Supprimer le capteur
  }
}

