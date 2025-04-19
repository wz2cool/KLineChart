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

import { isValid } from './utils/typeChecks'

import type { EventName, MouseTouchEvent, MouseTouchEventCallback } from './SyntheticEvent'

/**
 * 事件分发器接口
 * 定义了事件分发的基本行为
 */
export interface EventDispatcher {
  /**
   * 分发事件
   * @param name 事件名称
   * @param event 鼠标或触摸事件对象
   * @param other 其他可选参数
   * @returns 事件是否被处理
   */
  dispatchEvent: (name: EventName, event: MouseTouchEvent, other?: number) => boolean
}

/**
 * 事件处理基类
 * 实现了事件注册、触发和冒泡等核心功能
 */
export default abstract class Eventful implements EventDispatcher {
  /**
   * 子节点列表
   * 用于实现事件冒泡机制
   */
  private _children: Eventful[] = []

  /**
   * 事件回调函数映射表
   * 存储注册的事件处理函数
   */
  private readonly _callbacks = new Map<EventName, MouseTouchEventCallback>()

  /**
   * 注册事件处理函数
   * @param name 事件名称
   * @param callback 回调函数
   * @returns this 实例本身，支持链式调用
   */
  registerEvent (name: EventName, callback: MouseTouchEventCallback): this {
    this._callbacks.set(name, callback)
    return this
  }

  /**
   * 触发事件
   * @param name 事件名称
   * @param event 事件对象
   * @param other 其他参数
   * @returns 事件是否被处理
   */
  onEvent (name: EventName, event: MouseTouchEvent, other?: number): boolean {
    const callback = this._callbacks.get(name)
    if (isValid(callback) && this.checkEventOn(event)) {
      return callback(event, other)
    }
    return false
  }

  /**
   * 检查事件是否在当前节点或其子节点上
   * @param event 事件对象
   * @returns 是否在节点上
   */
  checkEventOn (event: MouseTouchEvent): boolean {
    for (const ful of this._children) {
      if (ful.checkEventOn(event)) {
        return true
      }
    }
    return false
  }

  /**
   * 分发事件到子节点
   * 实现事件冒泡机制，从最后一个子节点开始向上冒泡
   * @param name 事件名称
   * @param event 事件对象
   * @param other 其他参数
   * @returns 事件是否被处理
   */
  dispatchEvent (name: EventName, event: MouseTouchEvent, other?: number): boolean {
    const start = this._children.length - 1
    if (start > -1) {
      for (let i = start; i > -1; i--) {
        if (this._children[i].dispatchEvent(name, event, other)) {
          return true
        }
      }
    }
    return this.onEvent(name, event, other)
  }

  /**
   * 添加子节点
   * @param eventful 子节点实例
   * @returns this 实例本身，支持链式调用
   */
  addChild (eventful: Eventful): this {
    this._children.push(eventful)
    return this
  }

  /**
   * 清空所有子节点
   */
  clear (): void {
    this._children = []
  }
}
