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
 * 平台检测工具函数
 * 提供了一系列用于检测运行环境和浏览器类型的工具函数
 */

/**
 * 检测当前浏览器是否为Firefox
 * @description 通过检查浏览器的userAgent来判断是否为Firefox浏览器
 * @returns {boolean} 如果是Firefox浏览器返回true，否则返回false
 * @example
 * if (isFF()) {
 *   // Firefox浏览器特定的处理逻辑
 * }
 */
export function isFF (): boolean {
  // 检查window对象是否存在，以兼容非浏览器环境
  if (typeof window === 'undefined') {
    return false
  }
  return window.navigator.userAgent.toLowerCase().includes('firefox')
}

/**
 * 检测当前设备是否为iOS设备
 * @description 通过检查浏览器的userAgent来判断是否为iOS设备（iPhone、iPad或iPod）
 * @returns {boolean} 如果是iOS设备返回true，否则返回false
 * @example
 * if (isIOS()) {
 *   // iOS设备特定的处理逻辑
 * }
 */
export function isIOS (): boolean {
  // 检查window对象是否存在，以兼容非浏览器环境
  if (typeof window === 'undefined') {
    return false
  }
  return /iPhone|iPad|iPod|iOS/.test(window.navigator.userAgent)
}
