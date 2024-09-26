"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHateoasLinks = addHateoasLinks;
const exceljs_1 = require("exceljs");
let adviceLinks = {};
class SensorUtils {
    constructor() {
        this.loadSensorAdviceFromExcel();
    }
    async loadSensorAdviceFromExcel() {
        const workbook = new exceljs_1.Workbook();
        await workbook.xlsx.readFile('./data/sensor-data.xlsx');
        const worksheet = workbook.getWorksheet(1);
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            if (rowNumber === 1)
                return;
            const type = row.getCell(1).value;
            const minValue = row.getCell(2).value;
            const maxValue = row.getCell(3).value;
            const adviceLink = row.getCell(4).value;
            const rangeKey = `${minValue}-${maxValue}`;
            if (!adviceLinks[type]) {
                adviceLinks[type] = {};
            }
            adviceLinks[type][rangeKey] = adviceLink;
        });
    }
    getAdviceLinks(type, value) {
        const sensorAdvice = adviceLinks[type];
        const adviceList = [];
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
async function addHateoasLinks(sensor) {
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
//# sourceMappingURL=sensor.utils.js.map