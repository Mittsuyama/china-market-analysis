export const YEAR_REPORT_DATE = '-12-31';
export const YEARS = Array.from({ length: 5 }, (_, index) => 2021 - index).sort();
export const DATES = YEARS.map((year) => `${year}${YEAR_REPORT_DATE}`);
