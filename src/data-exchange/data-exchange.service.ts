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
export class MqttBrokerService 
{
   private brokers: { [key: string]: mqtt.MqttClient } = {}; // Store active broker clients
   private readonly logger = new Logger(MqttBrokerService.name);

   addBroker(mqttProtocol : MqttProtocol): void {
      if (this.brokers[mqttProtocol.clientId]) {
        this.logger.warn(`Broker with id ${mqttProtocol.clientId} already exists.`);
        return;
      }

      const newClient = mqtt.connect(mqttProtocol.url, mqttProtocol)

      newClient.on('connect', () => {
         this.logger.log(`Connected to broker ${mqttProtocol.clientId} at ${mqttProtocol.url}`);
       });

       newClient.on('error', (error) => {
         this.logger.error(`Error in broker ${mqttProtocol.clientId}:`, error.message);
       });

       this.brokers[mqttProtocol.clientId] = newClient;
   }

   subscribeToTopic(mqttProtocol : MqttProtocol): void {
      const client = this.brokers[mqttProtocol.clientId];
      if (client) 
      {
        client.subscribe(mqttProtocol.topic, (err) => 
         {
            if (err) 
            {
               this.logger.error(`Failed to subscribe to topic ${mqttProtocol.topic} on broker ${mqttProtocol.clientId}`);
            }
            else 
            {
               this.logger.log(`Subscribed to topic ${mqttProtocol.topic} on broker ${mqttProtocol.clientId}`);
            }
         });
      }
      else 
      {
        this.logger.warn(`Broker with id ${mqttProtocol.clientId} not found.`);
      }
    }

   getData(sensor: Sensor, protocol: MqttProtocol){
      return [sensor,protocol]
   }

   deleteBroker(mqttProtocol: MqttProtocol): void {
      const client = this.brokers[mqttProtocol.clientId];
      if (client) {
        client.end();
        delete this.brokers[mqttProtocol.clientId];
        this.logger.log(`Disconnected broker ${mqttProtocol.clientId}`);
      } else {
        this.logger.warn(`Broker with id ${mqttProtocol.clientId} not found.`);
      }
    }
  
}
