import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { Sensor } from './sensor.interface';
import { addHateoasLinks } from './sensor.utils';


@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  async findAll(): Promise<any> {
    const sensors = await this.sensorService.findAll();
    const sensorsWithLinks = await Promise.all(sensors.map(sensor => addHateoasLinks(sensor)));
  
    console.log('Here');
    return sensorsWithLinks;
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

  @Get('type/:type')
  findBySensorType(@Param('type') type: string): any {
    const sensors = this.sensorService.findByType(type);
    return sensors.map(sensor => addHateoasLinks(sensor));
  }

  @Get('location/:location')
  findByLocationType(@Param('location') location: string): any {
    const sensors = this.sensorService.findByLocation(location);
    return sensors.map(sensor => addHateoasLinks(sensor));
  }
}
