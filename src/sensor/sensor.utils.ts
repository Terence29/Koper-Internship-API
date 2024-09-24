import { Sensor } from './sensor.interface';
import { Workbook } from 'exceljs';

let adviceLinks: { [type: string]: { [range: string]: string } } = {};

class SensorUtils {
  constructor() {
    this.loadSensorAdviceFromExcel();
  }

  public async loadSensorAdviceFromExcel() {
    const workbook = new Workbook();
    
    await workbook.xlsx.readFile('/Users/romaintmc/Koper-Internship-API-Loc/sensor-api/data/sensor-data.xlsx');
    
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

  public getAdviceLinks(type: string, value: number): string[] {
    const sensorAdvice = adviceLinks[type];
    const adviceList: string[] = [];
  
    if (!sensorAdvice) {
      return adviceList; 
    }
  
    for (const range in sensorAdvice) {
      const [min, max] = range.split('-').map(Number);
      if (value >= min && value <= max) {
        adviceList.push(sensorAdvice[range]); 
      }
    }
  
    return adviceList;
  }  
}

export async function addHateoasLinks(sensor: Sensor): Promise<any> {
  const baseLinks = {
    self: {
      href: `/sensors/${sensor.id}`,
      method: 'GET',
    },
    update: {
      href: `/sensors/${sensor.id}`,
      method: 'PUT',
    },
    delete: {
      href: `/sensors/${sensor.id}`,
      method: 'DELETE',
    },
    findByType: {
      href: `/sensors/type/${sensor.type}`,
      method: 'GET',
    },
    findByLocation: {
      href: `/sensors/location/${sensor.location}`,
      method: 'GET',
    },
  };

  const sensorUtils = new SensorUtils();
  await sensorUtils.loadSensorAdviceFromExcel();

  const adviceLinks = sensorUtils.getAdviceLinks(sensor.type, sensor.value);

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

