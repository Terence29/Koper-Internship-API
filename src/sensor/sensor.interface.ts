import { Transport } from "@nestjs/microservices";
import { IClientOptions } from 'mqtt';

export interface Sensor {
  id: number;
  name: string;
  value: number;
  unit: string;
  type: string;
  location: string;
  created_at: Date;
}

export interface MqttProtocol extends IClientOptions {
  clientId?: string;
  name: string;
  topic: string;
  url: string;
  username?: string;
  password?: string;
}

  