/**
 * 个股指标
 */
// import { getReport, getReportItem } from './api/report.ts';
// const report = getReport('sh600887', 2021);
// console.log(getReportItem(report, 'z-bxhtzbj-保险合同准备金'));

/**
 * 获取近五年的资产负债表
 */
// import { updateLastFiveYearsZCFZReport } from './api/zcfz.ts';
// updateLastFiveYearsZCFZReport();

import { fetchSWFirstCategories } from './api/sw.ts';
const cate = await fetchSWFirstCategories();
console.log(cate);
