import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import * as Interface from 'src/sensor/sensor.interface';
import { DataExchangeService } from './data-exchange.service';


@Controller('data-exchange')
export class DataExchangeController {
  constructor(private readonly dataExchangeService: DataExchangeService) {}
  @Post()
  addSensor(@Body() body: { protocol: string, sensor: Interface.Sensor }) {
    const { protocol, sensor } = body;
    this.dataExchangeService.addSensor(protocol, sensor);
    return `Added ${sensor.id},${sensor.name} with protocol ${protocol}.`;
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


