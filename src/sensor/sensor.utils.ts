import e from 'express';
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
    case 'Temperature':
     
      let adviceLinks = {};

      if (sensor.value < 5) {
        adviceLinks = {
          advice_heater: {
            href: '/actions/heater',
            method: 'POST',
            description: 'It is too cold. Consider turning on the heater.',
          },
          advice_AC: {
            href: '/actions/air-conditioning',
            method: 'POST',
            description: 'Consider turning off the air conditioning to increase the temperature.',
          }
        };
      } else if (sensor.value > 30) {
        adviceLinks = {
          advice_AC: {
            href: '/actions/air-conditioning',
            method: 'POST',
            description: 'It is too hot. Consider turning on the air conditioning.',
          },
          advice_heater: {
            href: '/actions/heater',
            method: 'POST',
            description: 'Consider turning off the heater to decrease the temperature.',
          }
        }; 
      } 

      typeSpecificLinks = { ...typeSpecificLinks, ...adviceLinks };
      break;

    case 'Humidity':
      typeSpecificLinks = {
        resetHumidity: {
          href: `/sensors/${sensor.id}/reset-humidity`,
          method: 'POST',
          description: 'Reset the humidity sensor',
        },
      };

      if(sensor.value < 30) {
        adviceLinks = {
          advice_humidifier: {
            href: '/actions/humidifier',
            method: 'POST',
            description: 'It is too dry. Consider turning on the humidifier.',
          }
        };
      }
      typeSpecificLinks = { ...typeSpecificLinks, ...adviceLinks };
      break;

    case 'Light':
      typeSpecificLinks = {
        adjustBrightness: {
          href: `/sensors/${sensor.id}/adjust-brightness`,
          method: 'POST',
          description: 'Adjust the brightness for the light sensor',
        },
      };

      if(sensor.value < 50) {
        adviceLinks = {
          advice_light: {
            href: '/actions/light',
            method: 'POST',
            description: 'It is too dark. Consider turning on the light.',
          }
        };
      }
      else if(sensor.value > 150) {
        adviceLinks = {
          advice_light: {
            href: '/actions/light',
            method: 'POST',
            description: 'It is too bright. Consider turning off the light.',
          }
        };
      }
      typeSpecificLinks = { ...typeSpecificLinks, ...adviceLinks };
      break;

    case 'PM2.5':
        typeSpecificLinks = {
          adjustAirPurifier: {
            href: `/sensors/${sensor.id}/adjust-air-purifier`,
            method: 'PUT',
            description: 'Adjust the air purifier for the PM2.5 sensor',
          },
        };
  
        if(sensor.value < 36) {
          adviceLinks = {
            advice_purifier: {
              href: '/actions/purifier',
              method: 'PUT',
              description: 'The air quality is good. Consider turning off the air purifier.',
            }
          };
        }
        else if(sensor.value > 36) {
          adviceLinks = {
            advice_purifier: {
              href: '/actions/purifier',
              method: 'PUT',
              description: 'The air quality is poor. Consider turning on the air purifier.',
            }
          };
        }
        typeSpecificLinks = { ...typeSpecificLinks, ...adviceLinks };
        break;
      
    case 'PM10':
        typeSpecificLinks = {
          adjustAirPurifier: {
            href: `/sensors/${sensor.id}/adjust-air-purifier`,
            method: 'PUT',
            description: 'Adjust the air purifier for the PM10 sensor',
          },
        };

        if(sensor.value < 50) {
          adviceLinks = {
            advice_purifier: {
              href: '/actions/purifier',
              method: 'PUT',
              description: 'The air quality is good. Consider turning off the air purifier.',
            }
          };
        }
        else if(sensor.value > 101) {
          adviceLinks = {
            advice_purifier: {
              href: '/actions/purifier',
              method: 'PUT',
              description: 'The air quality is poor. Consider turning on the air purifier.',
            }
          };
        }
        typeSpecificLinks = { ...typeSpecificLinks, ...adviceLinks };
        break;

    case 'CO2':
      typeSpecificLinks = {
        adjustAirPurifier: {
          href: `/sensors/${sensor.id}/adjust-air-purifier`,
          method: 'PUT',
          description: 'Adjust the air purifier for the CO2 sensor',
        },
      };

      if(sensor.value < 1500) {
        adviceLinks = {
          advice_purifier: {
            href: '/actions/purifier',
            method: 'PUT',
            description: 'The air quality is good. Consider turning off the air purifier.',
          }
        };
      }
      else if(sensor.value > 1500) {
        adviceLinks = {
          advice_purifier: {
            href: '/actions/purifier',
            method: 'PUT',
            description: 'The air quality is bad. Consider turning on the air purifier.',
          }
        };
      }
      typeSpecificLinks = { ...typeSpecificLinks, ...adviceLinks };
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
