import { Controller, Get } from '@nestjs/common';
import * as Interface from 'src/sensor/sensor.interface';
import { MqttBrokerService } from './data-exchange.service';
/*
import { MessagePattern } from '@nestjs/microservices';
*/


/*
@Controller('mqtt')
export class MqttController {
    constructor(private readonly mqttService: MqttService) {}

    @MessagePattern({command: 'getDataMqtt'})
    getDataFromSensor(sensor : Interface.Sensor,protocol: Interface.MqttProtocol){
        return this.mqttService.getData(sensor,protocol);
    }
}
    */
@Controller('data-exchange')
export class DataExchangeController {}

@Controller('mqtt')
export class MqttController {
    constructor(private readonly mqttBrokerService: MqttBrokerService) {}

    @Get('Mqtt')
    getDataFromSensor(sensor : Interface.Sensor,protocol: Interface.MqttProtocol){
        return this.mqttBrokerService.getData(sensor,protocol);
    }
}