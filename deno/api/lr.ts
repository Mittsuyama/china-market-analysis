import { bundleRequest } from '../utils/bundleRequest.ts';
import { fetchReport } from '../utils/fetchReport.ts';

const hostname = 'http://emweb.securities.eastmoney.com'
const path = '/PC_HSF10/NewFinanceAnalysis/lrbAjaxNew'

/** 获取近五年利润表 */
export const fetchLastFiveYearsLRReport = async (code: string, cType: number) => {
  return await fetchReport({
    hostname,
    path,
    code,
    cType,
  });
};

export const updateLastFiveYearsLRReport = async () => {
  await bundleRequest({
    fetch: fetchLastFiveYearsLRReport,
    dir: '/report/lr',
  });
};
