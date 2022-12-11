import { LR_ITEM_TO_KEY, ZCFZ_ITEM_TO_KEY, XJLL_ITEM_TO_KEY } from '../constants/item.ts';

type Report = Record<string, string | null | undefined | number>;

export const getReport = (code: string, year: number): Report => {
  const zcfz = JSON.parse(Deno.readTextFileSync(`./static/report/zcfz/${code}.json`));
  const lr = JSON.parse(Deno.readTextFileSync(`./static/report/lr/${code}.json`));
  const xjll = JSON.parse(Deno.readTextFileSync(`./static/report/xjll/${code}.json`));

  const years = Math.min(zcfz.length, Math.min(lr.length, xjll.length));
  if (year > 2021 || year < (2021 - years - 1)) {
    throw new Error(`getReport: year cannot beyound (${2021 - years - 1}, 2021)`);
  }

  return {
    ...zcfz[2021 - year],
    ...lr[2021 - year],
    ...xjll[2021 - year],
  };
};

type ItemName = keyof typeof LR_ITEM_TO_KEY | keyof typeof ZCFZ_ITEM_TO_KEY | keyof typeof XJLL_ITEM_TO_KEY;

export const getReportItem = (report: Report, name: ItemName, isYoy?: boolean) => {
  // deno-lint-ignore no-explicit-any
  const key = (LR_ITEM_TO_KEY as any)[name] || (XJLL_ITEM_TO_KEY as any)[name] || (ZCFZ_ITEM_TO_KEY as any)[name] || '';
  return report[`${key}${isYoy ? '_YOY' : ''}`];
}
