import { getReport, getReportItem } from './utils/report.ts';

const report = getReport('sh600887', 2021);
console.log(getReportItem(report, 'z-bxhtzbj-保险合同准备金'));
