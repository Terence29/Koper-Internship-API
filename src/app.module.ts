// src/app.module.ts
import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { SensorModule } from './sensor/sensor.module';
import { CommunicationModule } from './communication/communication.module';
import { DataExchangeModule } from './data-exchange/data-exchange.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SensorModule, 
    DataExchangeModule, 
    HttpModule, 
    CommunicationModule, 
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [], 
        synchronize: true,  // Permet de synchroniser automatiquement les entités avec la base de données
      }),
      inject: [ConfigService]
  }),
  TypeOrmModule.forFeature([]), // Importe les entités dans le module
],
  controllers: [],
  providers: [],
})
export class AppModule {}

