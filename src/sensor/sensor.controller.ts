import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { Sensor } from './sensor.interface';
import { addHateoasLinks } from './sensor.utils';

@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  findAll(): any {
    const sensors = this.sensorService.findAll();
    return sensors.map(sensor => addHateoasLinks(sensor));
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    const sensor = this.sensorService.findOne(Number(id));
    return addHateoasLinks(sensor);
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

  @Get('type/:sensor_type')
  findBySensorType(@Param('sensor_type') sensorType: string): any {
    const sensors = this.sensorService.findBySensorType(sensorType);
    return sensors.map(sensor => addHateoasLinks(sensor));
  }

  @Get('location/:location_type')
  findByLocationType(@Param('location_type') locationType: string): any {
    const sensors = this.sensorService.findByLocationType(locationType);
    return sensors.map(sensor => addHateoasLinks(sensor));
  }
}
