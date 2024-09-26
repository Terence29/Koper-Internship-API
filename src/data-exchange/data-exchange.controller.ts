import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
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

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttBrokerService: MqttBrokerService) {}

  @Post()
  addBroker(@Body() protocol: Interface.MqttProtocol)
    {
        this.mqttBrokerService.addBroker(protocol);
        return `Broker ${protocol.clientId} added.`;
    }
  }

  //@Get()
  
    /*
  @Post('subscribe/:brokerId')
  subscribeToTopic(
    @Param('brokerId') brokerId: string,
    @Body('topic') topic: string,
  ) {
    this.mqttBrokerService.subscribeToTopic(brokerId, topic);
    return `Subscribed to topic ${topic} on broker ${brokerId}.`;
  }

  @Post('publish/:brokerId')
  publishMessage(
    @Param('brokerId') brokerId: string,
    @Body('topic') topic: string,
    @Body('message') message: string,
  ) {
    this.mqttBrokerService.publishMessage(brokerId, topic, message);
    return `Message published to ${topic} on broker ${brokerId}.`;
  }

  @Post('remove-broker')
  removeBroker(@Body('brokerId') brokerId: string) {
    this.mqttBrokerService.removeBroker(brokerId);
    return `Broker ${brokerId} removed.`;
  }
    */

@Controller('data-exchange')
export class DataExchangeController {}
