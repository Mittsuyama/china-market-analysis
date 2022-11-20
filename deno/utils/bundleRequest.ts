import { getAllStocksGeneralData } from '../api/general.ts';
import { fileOrDirExist } from './fs.ts';

interface BundleRequestParams {
  // deno-lint-ignore no-explicit-any
  fetch: (code: string, cType: number) => Promise<any[]>;
  dir: string;
  bundleSize?: number;
  start?: number,
}

export const bundleRequest = async (params: BundleRequestParams) => {
  const { fetch, bundleSize = 50, start = 0, dir } = params;

  const stocks = getAllStocksGeneralData();

  for (let index = start; index < stocks.length; index += bundleSize) {
    await Promise.all(Array.from({ length: bundleSize }, async (_, j) => {
      if (index + j >= stocks.length) {
        return;
      }

      const stock = stocks[index + j];
      const code = stock['代码'];

      if (fileOrDirExist(`./static${dir}/${code}.json`)) {
        return;
      }

      // 开始获取
      for (let j = 4; j > 0; j--) {
        const data = await fetch(code, j);
        if (!data) {
          continue;
        }
        if (!fileOrDirExist(`./static${dir}`)) {
          Deno.mkdir(`./static${dir}`);
        }
        // 写入
        Deno.writeTextFileSync(`./static${dir}/${code}.json`, JSON.stringify(data));
        break;
      }
    }));
    console.log(`finished: ${index}`);
  }
};
