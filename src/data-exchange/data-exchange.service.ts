import * as mqtt from 'mqtt';
//import mqtt from "mqtt";
import * as fs from 'fs';
import { Injectable, Logger } from '@nestjs/common';
import { connect } from 'mqtt';
import { Sensor, MqttProtocol} from 'src/sensor/sensor.interface';

@Injectable() 
export class MqttBrokerService 
{
   private brokers: { [clientId: string]: mqtt.MqttClient } = {}; // Store broker clients
   private readonly logger = new Logger(MqttBrokerService.name);

   addBroker(mqttProtocol : Partial<MqttProtocol>, sensor :  Sensor): void {
      if (this.brokers[mqttProtocol.clientId]) {
        this.logger.warn(`Broker with id ${mqttProtocol.clientId} already exists, list of brokers ${this.brokers}`);
        return;
      }

      const newClient = mqtt.connect(mqttProtocol.url, mqttProtocol)

      newClient.on('connect', () => { // "=>" makes it so that "this" in the newClient.on context is still referring to MqttBrokerService
         this.logger.log(`Connected to broker ${mqttProtocol.clientId} at ${mqttProtocol.url}`);
       });

       newClient.on('error', (error) => { // .on is because newClient is of type EventEmitter, 1st arg is the event flag
         this.logger.error(`Error in broker ${mqttProtocol.clientId}:`, error);
       });

       this.brokers[mqttProtocol.clientId] = newClient;
   }

   subscribeToTopic(mqttProtocol : Partial<MqttProtocol>, sensor : Sensor): void {
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

        client.on('message', (topic, message) => 
        {
          const payload = message.toString();
          this.logger.log(`Message received on topic ${topic}: ${payload}`);
          this.sendToDatabase(sensor, payload);
        });
      }
      else 
      {
        this.logger.warn(`Broker with id ${mqttProtocol.clientId} not found.`);
      }
   }

   private sendToDatabase(sensor: Sensor, payload: string): void
    {
      this.logger.log(`Implement "sendToDatabase"`);
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


@Injectable()
export class DataExchangeService {

  constructor(private readonly mqttBrokerService: MqttBrokerService) {}
  private sensors: Sensor[] = [];
  addSensor(protocol: string, sensor : Sensor)
  {
      if(protocol == "mqtt"){
         const config = this.getConfig<MqttProtocol>("src/data-exchange/mqtt-config.json");
         this.mqttBrokerService.addBroker(config,sensor);
         this.mqttBrokerService.subscribeToTopic(config,sensor);
         this.sensors[sensor.id]=sensor;
      }
      /*
      ADD OTHER PROTOCOLS
      */
  }

  getConfig<T>(path: string): Partial<T> { // <T> makes it generic for every protocol implemented
   try {
     
     const fileContent = fs.readFileSync(path, 'utf8');
     const config: Partial<T> = JSON.parse(fileContent);
     return config;
   } catch (err) {
     console.error('Error reading config file:', err);
     return {};
   }
 }
}