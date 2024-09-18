import { Sensor } from './sensor.interface';

export function addHateoasLinks(sensor: Sensor): any {
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
      href: `/sensors/type/${sensor.sensor_type}`,
      method: 'GET',
    },
    findByLocation: {
      href: `/sensors/location/${sensor.location_type}`,
      method: 'GET',
    },
  };

  let typeSpecificLinks = {};

  switch (sensor.sensor_type) {
    case 'temperature':
      typeSpecificLinks = {
        calibrate: {
          href: `/sensors/${sensor.id}/calibrate`,
          method: 'POST',
          description: 'Calibrate the temperature sensor',
        },
        checkTemperatureRange: {
          href: `/sensors/${sensor.id}/check-range`,
          method: 'GET',
          description: 'Check if the temperature is within the allowed range',
        },
      };
      break;

    case 'humidity':
      typeSpecificLinks = {
        resetHumidity: {
          href: `/sensors/${sensor.id}/reset-humidity`,
          method: 'POST',
          description: 'Reset the humidity sensor',
        },
      };
      break;

    case 'light':
      typeSpecificLinks = {
        adjustBrightness: {
          href: `/sensors/${sensor.id}/adjust-brightness`,
          method: 'POST',
          description: 'Adjust the brightness for the light sensor',
        },
      };
      break;

    default:
      typeSpecificLinks = {};
      break;
  }
  return {
    ...sensor,
    _links: {
      ...baseLinks,
      ...typeSpecificLinks,
    },
  };
}

