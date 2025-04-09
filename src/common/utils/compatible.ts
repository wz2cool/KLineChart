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
 * 浏览器兼容性工具函数
 * 提供了一系列用于处理浏览器API兼容性的工具函数，包括动画帧请求、空闲回调等功能
 */

import { isFunction } from './typeChecks'

/**
 * 默认请求ID，用于标识无效或未初始化的请求
 */
export const DEFAULT_REQUEST_ID = -1

/**
 * 请求动画帧
 * 优先使用requestAnimationFrame，如果不支持则降级使用setTimeout
 * @param fn 动画回调函数
 * @returns {number} 请求ID，用于取消动画
 */
export function requestAnimationFrame (fn: (params: unknown) => unknown): number {
  if (isFunction(window.requestAnimationFrame)) {
    return window.requestAnimationFrame(fn)
  }
  return window.setTimeout(fn, 20)
}

/**
 * 取消动画帧请求
 * 根据浏览器支持情况选择合适的方法取消动画
 * @param id 由requestAnimationFrame返回的请求ID
 */
export function cancelAnimationFrame (id: number): void {
  if (isFunction(window.cancelAnimationFrame)) {
    window.cancelAnimationFrame(id)
  } else {
    window.clearTimeout(id)
  }
}

/**
 * 请求空闲回调
 * 在浏览器空闲时期调用函数，用于执行非紧急任务
 * 如果浏览器不支持requestIdleCallback，则使用setTimeout模拟
 * @param fn 空闲时要执行的回调函数
 * @returns {number} 请求ID，用于取消回调
 */
export function requestIdleCallback (fn: IdleRequestCallback): number {
  if (isFunction(window.requestIdleCallback)) {
    return window.requestIdleCallback(fn)
  }
  const startTime = performance.now()
  return window.setTimeout(function () {
    fn({
      didTimeout: false,
      timeRemaining () {
        return Math.max(0, 50 - (performance.now() - startTime))
      }
    })
  }, 1)
}

/**
 * 取消空闲回调请求
 * 根据浏览器支持情况选择合适的方法取消空闲回调
 * @param id 由requestIdleCallback返回的请求ID
 */
export function cancelIdleCallback (id: number): void {
  if (isFunction(window.cancelIdleCallback)) {
    window.cancelIdleCallback(id)
  } else {
    window.clearTimeout(id)
  }
}
