import { SensorEntity } from './sensor.entity';
import { Sensor } from './sensor.interface';
import { Workbook } from 'exceljs';

let adviceLinks: { [type: string]: { [range: string]: string } } = {};

class SensorUtils {
  constructor() {
    this.loadSensorAdviceFromExcel();
  }

  public async loadSensorAdviceFromExcel() {
    const workbook = new Workbook();
    // Load rules from an .xlsx file
    await workbook.xlsx.readFile('./data/sensor-data.xlsx');
    
    const worksheet = workbook.getWorksheet(1);
  
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; 

      const type = row.getCell(1).value as string;
      const minValue = row.getCell(2).value as number;
      const maxValue = row.getCell(3).value as number;
      const adviceLink = row.getCell(4).value as string;

      const rangeKey = `${minValue}-${maxValue}`;

      if (!adviceLinks[type]) {
        adviceLinks[type] = {};
      }
      adviceLinks[type][rangeKey] = adviceLink;
    });

    //console.log('Conseils chargés dans adviceLinks:', adviceLinks);
  }

  public getAdviceLinks(type: string, value: string): string[] {
    const sensorAdvice = adviceLinks[type];
    const adviceList: string[] = [];
  
    if (!sensorAdvice) {
      return adviceList; 
    }
  
    for (const range in sensorAdvice) {
      const [min, max] = range.split('-').map(Number);
      if (+value >= min && +value <= max) {
        adviceList.push(sensorAdvice[range]); 
      }
    }
  
    return adviceList;
  }  
}

export async function addHateoasLinks(sensor: SensorEntity): Promise<any> {
  const baseLinks = {
    self: {
      href: `/sensors/${sensor.sensor_id}`,
      method: 'GET',
    },
    update: {
      href: `/sensors/${sensor.sensor_id}`,
      method: 'PUT',
    },
    delete: {
      href: `/sensors/${sensor.sensor_id}`,
      method: 'DELETE',
    },
    findByType: {
      href: `/sensors/`,
      params: `${sensor.type}`,
      method: 'GET',
    },
    findByLocation: {
      href: `/sensors/`,
      params: `${sensor.location}`,
      method: 'GET',
    },
  };

  const sensorUtils = new SensorUtils();
  await sensorUtils.loadSensorAdviceFromExcel();

  const adviceLinks = sensorUtils.getAdviceLinks(sensor.type, //sensor.value
    "5");

  let adviceLinksForSensor = {};
  if (adviceLinks.length > 0) {
    adviceLinksForSensor = {
      advice: adviceLinks.map(link => ({ href: link, method: 'GET' })),
    };
  }

  return {
    ...sensor,
    _links: {
      ...baseLinks,
      ...adviceLinksForSensor,
    },
  };
}

