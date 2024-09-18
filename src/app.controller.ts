import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SensorService } from './sensor/sensor.service';
import { Sensor } from './sensor/sensor.interface';

@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  findAll(): Sensor[] {
    return this.sensorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Sensor {
    return this.sensorService.findOne(Number(id));
  }

  @Post()
  create(@Body() sensor: Sensor): Sensor {
    return this.sensorService.create(sensor);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() sensor: Sensor): Sensor {
    return this.sensorService.update(Number(id), sensor);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.sensorService.delete(Number(id));
  }
}

