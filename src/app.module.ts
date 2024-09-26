// src/app.module.ts
import { Module } from '@nestjs/common';
import { SensorModule } from './sensor/sensor.module';
import { DataExchangeModule } from './data-exchange/data-exchange.module';
import { HttpModule } from '@nestjs/axios';@Module({
  imports: [SensorModule, DataExchangeModule, HttpModule],
  controllers: [],
  providers: [],
})
Communicationexport class AppModule {}

