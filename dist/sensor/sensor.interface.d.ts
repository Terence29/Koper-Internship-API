import { Transport } from "@nestjs/microservices";
export interface Sensor {
    id: number;
    name: string;
    value: number;
    unit: string;
    type: string;
    location: string;
    created_at: Date;
}
export declare class TemperatureSensor implements Sensor {
    id: number;
    name: string;
    value: number;
    unit: string;
    type: string;
    location: string;
    created_at: Date;
}
export declare class HumiditySensor implements Sensor {
    id: number;
    name: string;
    value: number;
    unit: string;
    type: string;
    location: string;
    created_at: Date;
}
export interface Protocol {
    id: number;
    name: string;
}
export declare class MqttProtocol implements Protocol {
    id: number;
    name: string;
    transport: Transport.MQTT;
    url: string;
    message: string;
}
