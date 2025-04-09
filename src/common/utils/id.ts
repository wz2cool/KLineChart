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

/**
 * ID生成工具模块
 * 该模块提供了一个用于生成唯一标识符的工具函数。生成的ID基于时间戳和自增计数器，
 * 确保在同一时间戳内生成的ID都是唯一的。
 */

/** 基础ID计数器，用于在同一时间戳内生成不同的ID */
let baseId = 1

/** 上一次生成ID时的时间戳，用于判断是否需要重置计数器 */
let prevIdTimestamp = new Date().getTime()

/**
 * 创建一个唯一的ID
 * @param {string} [prefix] - ID的可选前缀，将会添加在生成的ID前面
 * @returns {string} 返回格式为 `${prefix}${timestamp}_${baseId}` 的唯一ID字符串
 * @example
 * // 不带前缀
 * createId() // 返回类似 "1703123456789_1"
 * // 带前缀
 * createId("chart_") // 返回类似 "chart_1703123456789_1"
 */
export function createId (prefix?: string): string {
  const timestamp = new Date().getTime()
  if (timestamp === prevIdTimestamp) {
    ++baseId
  } else {
    baseId = 1
  }
  prevIdTimestamp = timestamp
  return `${prefix ?? ''}${timestamp}_${baseId}`
}
