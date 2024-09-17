import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { Sensor } from './sensor.interface';

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
  create(@Body() sensors: Sensor[]): Sensor[] {
    return sensors.map(sensor => this.sensorService.create(sensor));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() sensor: Sensor): Sensor {
    return this.sensorService.update(Number(id), sensor);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.sensorService.delete(Number(id));
  }

  // New route to find by sensor_type
  @Get('type/:sensor_type')
  findBySensorType(@Param('sensor_type') sensorType: string): Sensor[] {
    return this.sensorService.findBySensorType(sensorType);
  }

  @Get('location/:location_type')
  findByLocationType(@Param('location_type') locationType: string): Sensor[] {
    return this.sensorService.findByLocationType(locationType);
  }
}
