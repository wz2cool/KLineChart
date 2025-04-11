/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type Nullable from './Nullable'

/**
 * K线数据接口
 * 定义了一个K线蜡烛图所需的基本数据结构
 */
export interface KLineData {
  /** 时间戳 */
  timestamp: number
  /** 开盘价 */
  open: number
  /** 最高价 */
  high: number
  /** 最低价 */
  low: number
  /** 收盘价 */
  close: number
  /** 成交量 */
  volume?: number
  /** 成交额 */
  turnover?: number
  /** 其他自定义属性 */
  [key: string]: unknown
}

/**
 * 可视范围数据接口
 * 定义了图表可视区域内每个数据点的信息
 */
export interface VisibleRangeData {
  /** 数据在数组中的索引 */
  dataIndex: number
  /** 在画布上的X轴坐标 */
  x: number
  /** 对应的K线数据 */
  data: Nullable<KLineData>
}
