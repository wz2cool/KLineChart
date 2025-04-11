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

import type Coordinate from './Coordinate'
import type { KLineData } from './Data'

/**
 * 十字光标接口
 * 继承自Coordinate接口的部分属性，用于处理十字光标的位置和相关数据
 */
export default interface Crosshair extends Partial<Coordinate> {
  /**
   * 窗口ID
   * 标识十字光标所在的窗口
   */
  paneId?: string

  /**
   * 实际X轴坐标
   * 十字光标在画布上的实际X轴位置
   */
  realX?: number

  /**
   * K线数据
   * 当前十字光标位置对应的K线数据
   */
  kLineData?: KLineData

  /**
   * 数据索引
   * 当前十字光标位置对应的数据点索引
   */
  dataIndex?: number

  /**
   * 实际数据索引
   * 考虑数据过滤后的实际索引位置
   */
  realDataIndex?: number
}
