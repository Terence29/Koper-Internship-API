import { Sensor, TcpProtocol } from 'src/sensor/sensor.interface';
export declare class TcpService {
    private clients;
    private readonly logger;
    connect(tcpProtocol: Partial<TcpProtocol>, sensor: Sensor): void;
    private sendToDatabase;
    sendMessageToAllServers(): void;
    sendMessage(tcpProtocol: Partial<TcpProtocol>, message: string): void;
}
