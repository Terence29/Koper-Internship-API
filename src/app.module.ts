// src/app.module.ts
import { Module } from '@nestjs/common';
import { SensorModule } from './sensor/sensor.module';
import { DataExchangeModule } from './data-exchange/data-exchange.module';

@Module({
  imports: [SensorModule, DataExchangeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

