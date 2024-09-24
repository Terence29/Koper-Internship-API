import { Transport } from "@nestjs/microservices";
import { IClientOptions } from 'mqtt/*';

export interface Sensor {
  id: number;
  name: string;
  value: number;
  unit: string;
  type: string;
  location: string;
  created_at: Date;
}

export class TemperatureSensor implements Sensor {
  id: number;
  name: string;
  value: number;
  unit: string = 'C';
  type: string = 'temperature';
  location: string;
  created_at: Date;
}

export class HumiditySensor implements Sensor {
  id: number;
  name: string;
  value: number;
  unit: string = '%';
  type: string = 'humidity';
  location: string;
  created_at: Date;
}
// ------------------------------------------------------------ \\

export interface Protocol{
  id: number,
  name: string
}

export interface MqttProtocol extends IClientOptions {
  clientId?: string;
  name: string;
  transport?: Transport.MQTT;
  topic: string;
  url: string;
  username?: string;
  password?: Buffer | string;
}

  