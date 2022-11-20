import { ZCFZItem } from '../types/zcfz.ts';
import { bundleRequest } from '../utils/bundleRequest.ts';
import { fetchReport } from '../utils/fetchReport.ts';

const hostname = 'http://emweb.securities.eastmoney.com'
const path = '/PC_HSF10/NewFinanceAnalysis/zcfzbAjaxNew'

/** 获取近五年资产负债表 */
export const fetchLastFiveYearsZCFZReport = async (code: string, cType: number): Promise<ZCFZItem[]> => {
  return await fetchReport({
    hostname,
    path,
    code,
    cType,
  });
};

export const updateLastFiveYearsZCFZReport = async () => {
  await bundleRequest({
    fetch: fetchLastFiveYearsZCFZReport,
    dir: '/report/zcfz',
  });
};

export const getLastFiveYearsZCFZReport = (code: string) => {
  const items = JSON.parse(Deno.readTextFileSync(`./static/report/zcfz/${code}.json`)) as ZCFZItem[];
  return items;
};
