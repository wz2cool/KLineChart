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
 * 事件动作处理类，实现了事件的订阅发布机制
 * 用于处理图表各种交互事件的订阅和触发
 */

import { isFunction } from './utils/typeChecks'

/**
 * 事件回调函数类型定义
 * @param data 回调数据，类型不限
 */
export type ActionCallback = (data?: unknown) => void

/**
 * 事件类型枚举
 * @enum {string}
 * @property {string} OnZoom - 图表缩放事件
 * @property {string} OnScroll - 图表滚动事件
 * @property {string} OnVisibleRangeChange - 可视范围变化事件
 * @property {string} OnTooltipIconClick - 提示图标点击事件
 * @property {string} OnCrosshairChange - 十字光标变化事件
 * @property {string} OnCandleBarClick - K线柱点击事件
 * @property {string} OnPaneDrag - 窗格拖拽事件
 */
export enum ActionType {
  OnZoom = 'onZoom',
  OnScroll = 'onScroll',
  OnVisibleRangeChange = 'onVisibleRangeChange',
  OnTooltipIconClick = 'onTooltipIconClick',
  OnCrosshairChange = 'onCrosshairChange',
  OnCandleBarClick = 'onCandleBarClick',
  OnPaneDrag = 'onPaneDrag'
}

/**
 * 事件处理类
 * 提供事件的订阅、取消订阅、执行和检查功能
 */
export default class Action {
  /**
   * 存储所有已订阅的回调函数
   * @private
   */
  private _callbacks: ActionCallback[] = []

  /**
   * 订阅事件
   * @param callback 事件回调函数
   * @example
   * ```typescript
   * const action = new Action()
   * action.subscribe((data) => {
   *   console.log('事件被触发', data)
   * })
   * ```
   */
  subscribe (callback: ActionCallback): void {
    const index = this._callbacks.indexOf(callback)
    if (index < 0) {
      this._callbacks.push(callback)
    }
  }

  /**
   * 取消订阅事件
   * @param callback 要取消订阅的回调函数，如果不传则取消所有订阅
   * @example
   * ```typescript
   * const callback = (data) => {
   *   console.log('事件被触发', data)
   * }
   * action.subscribe(callback)
   * // 取消特定的订阅
   * action.unsubscribe(callback)
   * // 取消所有订阅
   * action.unsubscribe()
   * ```
   */
  unsubscribe (callback?: ActionCallback): void {
    if (isFunction(callback)) {
      const index = this._callbacks.indexOf(callback)
      if (index > -1) {
        this._callbacks.splice(index, 1)
      }
    } else {
      this._callbacks = []
    }
  }

  /**
   * 执行事件，触发所有订阅的回调函数
   * @param data 要传递给回调函数的数据
   * @example
   * ```typescript
   * action.execute({ type: 'click', position: { x: 100, y: 100 } })
   * ```
   */
  execute (data?: unknown): void {
    this._callbacks.forEach(callback => {
      callback(data)
    })
  }

  /**
   * 检查是否有订阅者
   * @returns {boolean} 如果没有订阅者返回true，否则返回false
   * @example
   * ```typescript
   * if (action.isEmpty()) {
   *   console.log('没有订阅者')
   * }
   * ```
   */
  isEmpty (): boolean {
    return this._callbacks.length === 0
  }
}
