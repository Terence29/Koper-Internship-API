import { Injectable, Logger } from '@nestjs/common';
import * as mqtt from 'mqtt/*';
import { Sensor, MqttProtocol} from 'src/sensor/sensor.interface';
@Injectable()
export class DataExchangeService {

   /* getData(sensorType : string, protocol : string): data[] {
    }

    getData_MQTT(param1 : xxx, param2 : xxx): data[]{
    }
   */
}

@Injectable() 
export class MqttBrokerService {
   private brokers: { [key: string]: mqtt.MqttClient } = {}; // Store active broker clients
   private readonly logger = new Logger(MqttBrokerService.name);

   addBroker(mqttProtocol : MqttProtocol): void {
      if (this.brokers[mqttProtocol.id]) {
        this.logger.warn(`Broker with id ${mqttProtocol.id} already exists.`);
        return;
      }

      //const newClient = mqtt.connect(mqttProtocol.url, mqttProtocol.id)
   }

   subscribe(){

   }
   getData(sensor: Sensor, protocol: MqttProtocol){
      return [sensor,protocol]
   }
}
