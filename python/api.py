import math
import time
import numpy as np

import akshare as ak
import os
import pandas as pd

# pandas 显示所有列
pd.set_option('display.max_columns', None)

# 申万一级行业实时数据
sw_index_first_info_df = "sw_index_first_info_df"
# A 股市盈率
stock_a_ttm_lyr = "stock_a_ttm_lyr"
# 中美国债收益率
bond_zh_us_rate = "bond_zh_us_rate"


def _get_data_file_path(path):
    return os.path.join(os.path.dirname(__file__), 'static', path)


def get_akshare_data_with_name(name):
    # gen meta and data file path
    data_file_path = _get_data_file_path(name + '.csv')
    meta_file_path = _get_data_file_path('meta.csv')
    # make meta file not empty
    meta = pd.DataFrame(columns=['date', 'last_update_time']).set_index('date')
    if os.path.exists(meta_file_path):
        meta = pd.read_csv(meta_file_path).set_index('date')
    today = time.strftime("%Y-%m-%d", time.localtime())
    if name not in meta.index.values:
        meta.loc[name] = ['']
    last_update_time = meta['last_update_time'][name]
    # do not use cache and request online resource again
    if today != last_update_time or os.path.exists(data_file_path) is False:
        data = getattr(ak, name)()
        data.to_csv(data_file_path)
        meta['last_update_time'][name] = today
        meta.to_csv(meta_file_path)
        return data
    else:
        return pd.read_csv(data_file_path)


# 国债收益率
def get_bound_rate():
    name = '中国国债收益率10年'
    origin_data = get_akshare_data_with_name(bond_zh_us_rate)[['日期', name]]
    valid_data = origin_data[origin_data.apply(lambda x: math.isnan(x[name]) is False, axis=1)]
    valid_data.columns = ['date', 'rate']
    return pd.DataFrame(valid_data)


# 滚动市盈率中位数
def get_middle_pe_ttm():
    name = 'middlePETTM'
    origin_data = get_akshare_data_with_name(stock_a_ttm_lyr)[['date', name]]
    origin_data.columns = ['date', 'pe']
    return pd.DataFrame(origin_data)


# 滚动市盈率等权平均值
def get_average_pe_ttm():
    name = 'averagePETTM'
    origin_data = get_akshare_data_with_name(stock_a_ttm_lyr)[['date', name]]
    origin_data.columns = ['date', 'pe']
    return pd.DataFrame(origin_data)


# 近五年 FED
def get_fed(year=5):
    date_length = 250 * (year + 1)
    bound_rate = get_bound_rate().tail(date_length)
    pe = get_middle_pe_ttm().tail(date_length)
    fed = pd.merge(bound_rate, pe, how='inner', on=['date']).tail(250 * year)
    fed['fed'] = fed.apply(lambda x: 100 / x.pe - x.rate, axis=1)
    return fed

