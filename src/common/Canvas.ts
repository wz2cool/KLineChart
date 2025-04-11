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

import { getPixelRatio } from './utils/canvas'
import { createDom } from './utils/dom'
import { isValid } from './utils/typeChecks'
import { requestAnimationFrame, DEFAULT_REQUEST_ID } from './utils/compatible'

/**
 * 绘图监听器函数类型
 */
type DrawListener = () => void

/**
 * 检查浏览器是否支持设备像素内容框
 * @returns 返回一个Promise，解析为是否支持设备像素内容框
 */
async function isSupportedDevicePixelContentBox (): Promise<boolean> {
  return await new Promise((resolve: (val: boolean) => void) => {
    const ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      resolve(entries.every(entry => 'devicePixelContentBoxSize' in entry))
      ro.disconnect()
    })
    ro.observe(document.body, { box: 'device-pixel-content-box' })
  }).catch(() => false)
}

/**
 * Canvas类负责管理画布的创建、缩放、事件监听和像素比例调整
 */
export default class Canvas {
  /**
   * 画布DOM元素
   */
  private readonly _element: HTMLCanvasElement

  /**
   * 用于监听画布大小变化的ResizeObserver实例
   */
  private _resizeObserver: ResizeObserver

  /**
   * 用于监听设备像素比变化的媒体查询列表
   */
  private _mediaQueryList: MediaQueryList

  /**
   * 画布的2D渲染上下文
   */
  private readonly _ctx: CanvasRenderingContext2D

  /**
   * 绘图监听器
   */
  private readonly _listener: DrawListener

  /**
   * 是否支持设备像素内容框
   */
  private _supportedDevicePixelContentBox = false

  /**
   * 画布的CSS宽度
   */
  private _width = 0

  /**
   * 画布的CSS高度
   */
  private _height = 0

  /**
   * 画布的像素宽度
   */
  private _pixelWidth = 0

  /**
   * 画布的像素高度
   */
  private _pixelHeight = 0

  /**
   * 下一次更新的像素宽度
   */
  private _nextPixelWidth = 0

  /**
   * 下一次更新的像素高度
   */
  private _nextPixelHeight = 0

  /**
   * 动画帧请求ID
   */
  private _requestAnimationId = DEFAULT_REQUEST_ID

  /**
 * 媒体查询监听器，用于处理设备像素比变化
 */
private readonly _mediaQueryListener: () => void = () => {
    const pixelRatio = getPixelRatio(this._element)
    this._nextPixelWidth = Math.round(this._element.clientWidth * pixelRatio)
    this._nextPixelHeight = Math.round(this._element.clientHeight * pixelRatio)
    this._resetPixelRatio()
  }

  constructor (style: Partial<CSSStyleDeclaration>, listener: DrawListener) {
    this._listener = listener
    this._element = createDom('canvas', style)
    this._ctx = this._element.getContext('2d')!
    isSupportedDevicePixelContentBox().then(result => {
      this._supportedDevicePixelContentBox = result
      if (result) {
        this._resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
          const entry = entries.find((entry: ResizeObserverEntry) => entry.target === this._element)
          const size = entry?.devicePixelContentBoxSize[0]
          if (isValid(size)) {
            this._nextPixelWidth = size.inlineSize
            this._nextPixelHeight = size.blockSize
            if (this._pixelWidth !== this._nextPixelWidth || this._pixelHeight !== this._nextPixelHeight) {
              this._resetPixelRatio()
            }
          }
        })
        this._resizeObserver.observe(this._element, { box: 'device-pixel-content-box' })
      } else {
        this._mediaQueryList = window.matchMedia(`(resolution: ${getPixelRatio(this._element)}dppx)`)
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- ignore
        this._mediaQueryList.addListener(this._mediaQueryListener)
      }
    }).catch(_ => false)
  }

  /**
 * 重置画布的像素比例
 * 根据当前设备的像素比例更新画布的尺寸和缩放
 */
private _resetPixelRatio (): void {
    this._executeListener(() => {
      const width = this._element.clientWidth
      const height = this._element.clientHeight
      this._width = width
      this._height = height
      this._pixelWidth = this._nextPixelWidth
      this._pixelHeight = this._nextPixelHeight
      this._element.width = this._nextPixelWidth
      this._element.height = this._nextPixelHeight
      const horizontalPixelRatio = this._nextPixelWidth / width
      const verticalPixelRatio = this._nextPixelHeight / height
      this._ctx.scale(horizontalPixelRatio, verticalPixelRatio)
    })
  }

  /**
 * 执行绘图监听器
 * @param fn 在执行监听器之前要调用的可选函数
 */
private _executeListener (fn?: () => void): void {
    if (this._requestAnimationId === DEFAULT_REQUEST_ID) {
      this._requestAnimationId = requestAnimationFrame(() => {
        this._ctx.clearRect(0, 0, this._width, this._height)
        fn?.()
        this._listener()
        this._requestAnimationId = DEFAULT_REQUEST_ID
      })
    }
  }

  /**
 * 更新画布尺寸
 * @param w 新的宽度
 * @param h 新的高度
 */
update (w: number, h: number): void {
    if (this._width !== w || this._height !== h) {
      this._element.style.width = `${w}px`
      this._element.style.height = `${h}px`
      if (!this._supportedDevicePixelContentBox) {
        const pixelRatio = getPixelRatio(this._element)
        this._nextPixelWidth = Math.round(w * pixelRatio)
        this._nextPixelHeight = Math.round(h * pixelRatio)
        this._resetPixelRatio()
      }
    } else {
      this._executeListener()
    }
  }

  /**
 * 获取画布DOM元素
 * @returns 画布元素
 */
getElement (): HTMLCanvasElement {
    return this._element
  }

  /**
 * 获取画布的2D渲染上下文
 * @returns 2D渲染上下文
 */
getContext (): CanvasRenderingContext2D {
    return this._ctx
  }

  /**
 * 销毁画布实例
 * 清理所有监听器和观察器
 */
destroy (): void {
    if (isValid(this._resizeObserver)) {
      this._resizeObserver.unobserve(this._element)
    }
    if (isValid(this._mediaQueryList)) {
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- ignore
      this._mediaQueryList.removeListener(this._mediaQueryListener)
    }
  }
}
