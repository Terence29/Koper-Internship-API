import { Module } from '@nestjs/common';
import { DataExchangeController } from './data-exchange.controller';
import { DataExchangeService } from './data-exchange.service';
import { MqttBrokerService } from './mqtt-broker/mqtt-broker.service';
import { TcpService } from './tcp/tcp.service';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
    imports : [ScheduleModule.forRoot()],
    controllers: [DataExchangeController],
    providers: [DataExchangeService, MqttBrokerService, TcpService],
    exports: [DataExchangeService, MqttBrokerService]
})
export class DataExchangeModule {}

