// 申万一级行业指数
import { get } from '../utils/get.ts';

interface SWCategoryItem {
  code: string;
  name: string;
}

export const fetchSWFirstCategories = async (): Promise<SWCategoryItem[]> => {
  const res = await get({
    url: 'https://www.swsresearch.com/institute-sw/api/index_publish/current/',
    body: {
      page: 1,
      page_size: 40,
      indextype: '一级行业',
    },
  })
  if (res.data.code === '200') {
    return res.data.data.results.map((item: { swindexcode: string; swindexname: string }) => ({
      code: item.swindexcode,
      nmae: item.swindexname,
    }));
  }
  throw new Error(`fetchSWFirstCategories error: ${res}`);
};


