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
 * Canvas工具函数模块
 * 提供了一系列用于处理Canvas绘图上下文的实用工具函数，包括设备像素比获取、
 * 字体样式创建以及文本宽度计算等功能。
 */

import type Nullable from '../Nullable'
import { isValid } from './typeChecks'

/**
 * 用于测量文本宽度的Canvas上下文
 * 这是一个全局变量，用于缓存测量文本宽度时使用的Canvas上下文对象
 */
let measureCtx: Nullable<CanvasRenderingContext2D> = null

/**
 * 获取设备像素比
 * @param canvas - Canvas元素
 * @returns {number} 返回设备像素比，如果无法获取则返回1
 * @description 用于获取当前设备的像素比，确保在高分辨率屏幕上能够正确渲染
 */
export function getPixelRatio (canvas: HTMLCanvasElement): number {
  return canvas.ownerDocument.defaultView?.devicePixelRatio ?? 1
}

/**
 * 创建字体样式字符串
 * @param size - 字体大小，默认为12
 * @param weight - 字体粗细，可以是字符串或数字，默认为'normal'
 * @param family - 字体族名称，默认为'Helvetica Neue'
 * @returns {string} 返回格式化的字体样式字符串
 * @description 根据提供的参数生成标准的CSS字体样式字符串
 */
export function createFont (size?: number, weight?: string | number, family?: string): string {
  return `${weight ?? 'normal'} ${size ?? 12}px ${family ?? 'Helvetica Neue'}`
}

/**
 * 计算文本宽度
 * @param text - 需要计算宽度的文本字符串
 * @param size - 字体大小，可选
 * @param weight - 字体粗细，可选
 * @param family - 字体族名称，可选
 * @returns {number} 返回文本的像素宽度
 * @description 使用Canvas上下文来计算指定文本在给定字体样式下的像素宽度
 */
export function calcTextWidth (text: string, size?: number, weight?: string | number, family?: string): number {
  if (!isValid(measureCtx)) {
    const canvas = document.createElement('canvas')
    const pixelRatio = getPixelRatio(canvas)
    measureCtx = canvas.getContext('2d')!
    measureCtx.scale(pixelRatio, pixelRatio)
  }
  measureCtx.font = createFont(size, weight, family)
  return Math.round(measureCtx.measureText(text).width)
}
