import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { DataExchangeModule } from 'src/data-exchange/data-exchange.module';
import { HttpModule } from '@nestjs/axios';
import { SensorEntity } from './sensor.entity';

@Module({ 
  imports: [HttpModule, DataExchangeModule, TypeOrmModule.forFeature([SensorEntity])],
  controllers: [SensorController],
  providers: [SensorService],
})
export class SensorModule {}













