import { Injectable } from '@nestjs/common';
import { Sensor } from './sensor.interface';

@Injectable()
export class SensorService {
  private sensors: Sensor[] = [];

  findAll(): Sensor[] {
    return this.sensors;
  }

  findOne(id: number): Sensor {
    return this.sensors.find(sensor => sensor.id === id);
  }

  findBySensorType(sensorType: string): Sensor[] {
    return this.sensors.filter(sensor => sensor.sensor_type === sensorType);
  }

  create(sensor: Sensor): Sensor {
    this.sensors.push(sensor);
    return sensor;
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

