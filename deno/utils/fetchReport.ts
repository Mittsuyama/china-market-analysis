import { DATES } from '../constants/report.ts';
import { ReportParams } from '../types/request.ts';
import { get } from './get.ts';

interface FetchRerpotParams {
  code: string;
  cType: number;
  hostname: string;
  path: string;
}

export const fetchReport = async (params: FetchRerpotParams) => {
  const { code, cType, hostname, path } = params;

  const body: ReportParams = {
    companyType: cType,
    reportDateType: 0,
    reportType: 1,
    dates: DATES,
    code,
  };

  const res = await get({
    url: `${hostname}${path}`,
    body,
  });

  if (res.status !== 200) {
    return [];
  } else {
    return res.data.data;
  }
};
