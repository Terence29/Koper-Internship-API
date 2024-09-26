import { Injectable } from '@nestjs/common';
import { Sensor } from './sensor.interface';
import { MqttProtocol } from './sensor.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SensorService {
  private sensors: Sensor[] = [];
  private currentId = 1;
  private protocol: MqttProtocol[] = [
    {
      "clientId": '1',
      "name": "Broker Mosquitto",
      "topic": "a",
      "url": "INTERN"
    }
  ];

  findAll(): Sensor[] {
    return this.sensors;
  }

  findOne(id: number): Sensor {
    return this.sensors.find(sensor => sensor.id === id);
  }

  findByType(type: string): Sensor[] {
    return this.sensors.filter(sensor => sensor.type === type);
  }

  findByLocation(location: string): Sensor[] {
    return this.sensors.filter(sensor => sensor.type === location);
  }

  create(sensor: Sensor): Sensor {
    const newSensor: Sensor = {
      ...sensor,
      id: this.currentId++,
      created_at: new Date(),
    };
    this.sensors.push(newSensor);
    return newSensor;
  }

  update(id: number, updatedSensor: Sensor): Sensor {
    const sensorIndex = this.sensors.findIndex(sensor => sensor.id === id);
    if (sensorIndex >= 0) {
      this.sensors[sensorIndex] = updatedSensor;
      return updatedSensor;
    }
    return null;
  }

  delete(id: number): void {
    this.sensors = this.sensors.filter(sensor => sensor.id !== id);
  }
}

