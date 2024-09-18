"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHateoasLinks = addHateoasLinks;
function addHateoasLinks(sensor) {
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
            let adviceLinks = {};
            if (sensor.value < 5) {
                adviceLinks = {
                    advice: {
                        href: '/actions/turn-on-heater',
                        method: 'POST',
                        description: 'It is too cold. Consider turning on the heater.',
                    },
                };
            }
            else if (sensor.value > 30) {
                adviceLinks = {
                    advice: {
                        href: '/actions/turn-on-air-conditioning',
                        method: 'POST',
                        description: 'It is too hot. Consider turning on the air conditioning.',
                    },
                };
            }
            else {
                adviceLinks = {
                    advice: {
                        href: '/actions/no-action-needed',
                        method: 'GET',
                        description: 'The temperature is normal. No action is required.',
                    },
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
            break;
        case 'Light':
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
//# sourceMappingURL=sensor.utils.js.map