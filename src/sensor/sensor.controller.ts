import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { Sensor } from './sensor.interface';
import { addHateoasLinks } from './sensor.utils';
import { DataEntity } from './entity/data.entity';
import { SensorEntity } from './entity/sensor.entity';


@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  async findAll(): Promise<any> {
    const sensors = await this.sensorService.findAll();
    const sensorsWithLinks = await Promise.all(sensors.map(sensor => addHateoasLinks(sensor)));
    return sensors;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sensor[]> {
    let data: DataEntity;
    const sensor = await this.sensorService.findOne(Number(id));
    return sensor ? addHateoasLinks(sensor) : null;
  }

  @Post()
  async create(@Body() sensor: Sensor): Promise<any> {
    const createdSensor = await this.sensorService.create(sensor);
    let data: DataEntity;
    return addHateoasLinks(createdSensor);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() sensor: Sensor): Promise<any> {
    const updatedSensor = await this.sensorService.update(Number(id), sensor);
    let data: DataEntity;
    return updatedSensor ? addHateoasLinks(updatedSensor) : null;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.sensorService.delete(Number(id));
  }

  @Get('type/:type')
  async findBySensorType(@Param('type') type: string): Promise<any> {
    const sensors = await this.sensorService.findByType(type);
    let data: DataEntity;
    return sensors.map(sensor => addHateoasLinks(sensor));
  }

  @Get('location/:location')
  async findByLocationType(@Param('location') location: string): Promise <any> {
    const sensors = await this.sensorService.findByLocation(location);
    let data: DataEntity;
    return sensors.map(sensor => addHateoasLinks(sensor));
  }
}
