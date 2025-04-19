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
import { requestAnimationFrame } from './utils/compatible'
import { merge } from './utils/typeChecks'

/**
 * 动画帧回调函数类型
 * @param frameTime 当前帧的时间戳（相对于动画开始时间的毫秒数）
 */
type AnimationDoFrameCallback = (frameTime: number) => void

/**
 * 动画配置选项接口
 */
interface AnimationOptions {
  /**
   * 动画持续时间（毫秒）
   */
  duration: number
  /**
   * 动画重复次数
   */
  iterationCount: number
}

/**
 * 动画类
 * 用于处理图表中的各种动画效果，支持设置动画时长、重复次数和帧回调函数
 */
export default class Animation {
  /**
   * 动画配置选项
   * @private
   * @default { duration: 500, iterationCount: 1 }
   */
  private readonly _options = { duration: 500, iterationCount: 1 }

  /**
   * 动画帧回调函数
   * @private
   */
  private _doFrameCallback: Nullable<AnimationDoFrameCallback>

  /**
   * 当前动画重复次数计数
   * @private
   */
  private _currentIterationCount = 0

  /**
   * 动画运行状态标志
   * @private
   */
  private _running = false

  /**
   * 动画开始时间戳
   * @private
   */
  private _time = 0

  /**
   * 创建动画实例
   * @param options 动画配置选项，可选
   */
  constructor (options?: Partial<AnimationOptions>) {
    merge(this._options, options)
  }

  /**
   * 动画循环执行函数
   * @private
   */
  _loop (): void {
    this._running = true
    const step: (() => void) = () => {
      if (this._running) {
        const diffTime = new Date().getTime() - this._time
        if (diffTime < this._options.duration) {
          this._doFrameCallback?.(diffTime)
          requestAnimationFrame(step)
        } else {
          this.stop()
          this._currentIterationCount++
          if (this._currentIterationCount < this._options.iterationCount) {
            this.start()
          }
        }
      }
    }
    requestAnimationFrame(step)
  }

  /**
   * 设置动画帧回调函数
   * @param callback 帧回调函数，接收当前帧时间作为参数
   * @returns 当前动画实例，支持链式调用
   */
  doFrame (callback: AnimationDoFrameCallback): this {
    this._doFrameCallback = callback
    return this
  }

  /**
   * 设置动画持续时间
   * @param duration 持续时间（毫秒）
   * @returns 当前动画实例，支持链式调用
   */
  setDuration (duration: number): this {
    this._options.duration = duration
    return this
  }

  /**
   * 设置动画重复次数
   * @param iterationCount 重复次数
   * @returns 当前动画实例，支持链式调用
   */
  setIterationCount (iterationCount: number): this {
    this._options.iterationCount = iterationCount
    return this
  }

  /**
   * 启动动画
   * 如果动画已经在运行，则不会重复启动
   */
  start (): void {
    if (!this._running) {
      this._time = new Date().getTime()
      this._loop()
    }
  }

  /**
   * 停止动画
   * 会触发最后一帧回调，并重置运行状态
   */
  stop (): void {
    if (this._running) {
      this._doFrameCallback?.(this._options.duration)
    }
    this._running = false
  }
}