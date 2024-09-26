import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { DataExchangeModule } from 'src/data-exchange/data-exchange.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, DataExchangeModule],
  controllers: [SensorController],
  providers: [SensorService]
})
export class SensorModule {}













