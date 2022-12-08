import { StockInfo } from '../types/base.ts';
import { get } from '../utils/get.ts';

const keyNames = [
  '_',
  '最新价',
  '涨跌幅',
  '涨跌额',
  '成交量',
  '成交额',
  '振幅',
  '换手率',
  '市盈率-动态',
  '量比',
  '5分钟涨跌',
  '代码',
  '_',
  '名称',
  '最高',
  '最低',
  '今开',
  '昨收',
  '总市值',
  '流通市值',
  '涨速',
  '市净率',
  '60日涨跌幅',
  '年初至今涨跌幅',
  '-',
  '-',
  '-',
  '-',
  '-',
  '-',
  '-',
];

const fetchAllStockGeneralData = async (): Promise<StockInfo[]> => {
  const res = await get({
    url: 'http://82.push2.eastmoney.com/api/qt/clist/get',
    body: {
      pn: '1',
      pz: '6000',
      po: '1',
      np: '1',
      ut: 'bd1d9ddb04089700cf9c27f6f7426281',
      fltt: '2',
      invt: '2',
      fid: 'f3',
      fs: 'm:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23,m:0+t:81+s:2048',
      fields: 'f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152',
      _: '1623833739532',
    },
  });
  const list = res.data.data.diff as Array<[]>;
  const stocks = list.map((item, listIndex) => {
    return Object.fromEntries([['序号', listIndex]].concat(Object.entries(item).map((arr, index) => [keyNames[index], arr[1]])));
  });
  return stocks;
};

export const updateAllStocksGeneralData = async () => {
  const stocks = await fetchAllStockGeneralData();
  Deno.writeTextFileSync('./static/general.json', JSON.stringify(stocks));
};

interface GetAllStocksGeneralDataParams {
  useCache?: boolean;
}

export const getAllStocksGeneralData = async (params: GetAllStocksGeneralDataParams): Promise<StockInfo[]> => {
  let stockList;
  if (params.useCache) {
    stockList = JSON.parse(Deno.readTextFileSync('./static/general.json')) as StockInfo[];
  } else {
    stockList = await fetchAllStockGeneralData();
  }

  return stockList.map((item) => {
    const unusableCode = item['代码'].toString();
    let code = '';
    if (unusableCode.startsWith('6')) {
      code = `SH${unusableCode}`;
    } else if (unusableCode.startsWith('8') || unusableCode.startsWith('4')) {
      code = `BJ${unusableCode}`;
    } else {
      code = `SZ${unusableCode}`;
    }
    return {
      ...item,
      '代码': code,
    };
  });
};
