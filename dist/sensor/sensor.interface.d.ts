/// <reference types="node" />
import { IClientOptions } from 'mqtt';
import * as net from 'net';
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
export interface TcpProtocol extends net.TcpSocketConnectOpts {
    id: string;
    request: string;
    name: string;
    port: number;
    host: string;
}
