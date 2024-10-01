"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TcpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TcpService = void 0;
const common_1 = require("@nestjs/common");
const net = require("net");
let TcpService = TcpService_1 = class TcpService {
    constructor() {
        this.clients = {};
        this.logger = new common_1.Logger(TcpService_1.name);
    }
    connect(tcpProtocol, sensor) {
        if (this.clients[tcpProtocol.id]) {
            this.logger.warn(`Client with id ${tcpProtocol.id} already exists. list of clients ${this.clients}`);
            return;
        }
        const newSocket = net.createConnection(tcpProtocol.port, tcpProtocol.host);
        newSocket.on('connect', (message) => {
            this.logger.log(`Client ${tcpProtocol.id} connected to server adress ${tcpProtocol.host} and port ${tcpProtocol.port} :`);
        });
        newSocket.on('error', (error) => {
            this.logger.error(`Error in TCP client ${tcpProtocol.id}:`, error);
        });
        newSocket.on('data', (message) => {
            const payload = message.toString();
            this.logger.log(`Message received from server adress ${tcpProtocol.host} and port ${tcpProtocol.port} : ${payload}`);
            this.sendToDatabase(sensor, payload);
        });
        newSocket.on('close', () => {
            this.logger.log(`Connection to TCP server ${tcpProtocol.host} and port ${tcpProtocol.port} is closed.`);
        });
        this.clients[tcpProtocol.id] = { socket: newSocket, protocol: tcpProtocol };
    }
    sendToDatabase(sensor, payload) {
        this.logger.log(`Implement "sendToDatabase" tcp`);
    }
    sendMessage(tcpProtocol, message) {
        const client = this.clients[tcpProtocol.id].socket;
        if (client) {
            client.write(message);
            this.logger.log(`Sent message to server ${tcpProtocol.host} and port ${tcpProtocol.port}: ${message}`);
        }
        else {
            this.logger.warn(`Client with id ${tcpProtocol.id} not found.`);
        }
    }
};
exports.TcpService = TcpService;
exports.TcpService = TcpService = TcpService_1 = __decorate([
    (0, common_1.Injectable)()
], TcpService);
//# sourceMappingURL=tcp.service.js.map