import * as mqtt from 'mqtt';
//import mqtt from "mqtt";
import { Injectable, Logger } from '@nestjs/common';
import { connect } from 'mqtt';
import type {Client} from 'mqtt';
import { Sensor, MqttProtocol} from 'src/sensor/sensor.interface';

@Injectable()
export class DataExchangeService {

      //private sensors
   /* getData(sensorType : string, protocol : string): data[] {
    }

    getData_MQTT(param1 : xxx, param2 : xxx): data[]{
    }
   */
}

@Injectable() 
export class MqttBrokerService 
{
   private brokers: { [clientId: string]: Client } = {}; // Stmqtt.Clientbroker clients
   private messageStore: { [clientId: string]: string } = {};// Here we store messages directly associated with each broker (by clientId)
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
         this.logger.error(`Error in broker ${mqttProtocol.clientId}:`, error);
       });

       this.brokers[mqttProtocol.clientId] = newClient;
   }

   subscribeToTopic(mqttProtocol : MqttProtocol): void {
      const client = this.brokers[mqttProtocol.clientId];
      if (client) 
      {
        client.subscribe(mqttProtocol.topic, {}, (err) => 
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

         client.on('message', function(topic, message){
            const payload = message.toString(); // to be sure its a string
            this.logger.log(`Message received on topic ${topic}: ${payload}`);
            this.setMessage(mqttProtocol.clientId, payload); // Here we add our message to the right broker inside the dict
         })
      }
      else 
      {
        this.logger.warn(`Broker with id ${mqttProtocol.clientId} not found.`);
      }
   }

   private setMessage(clientId: string, payload: string): void
    {
      this.messageStore[clientId] = payload;  // Just store the message inside the message dict
    }

   getMessage(clientId: string): string {
      return this.messageStore[clientId] || 'No messages yet';
    }
   /*
   getData(sensor: Sensor, protocol: MqttProtocol){
      return [sensor,protocol]
   }
      */

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
