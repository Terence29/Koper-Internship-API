import { Module } from '@nestjs/common';
import { DataExchangeController, MqttController } from './data-exchange.controller';
import { DataExchangeService, MqttBrokerService } from './data-exchange.service';


@Module({
    controllers: [DataExchangeController,MqttController],
    providers: [DataExchangeService, MqttBrokerService],
    exports: [DataExchangeService, MqttBrokerService]
})
export class DataExchangeModule {}

