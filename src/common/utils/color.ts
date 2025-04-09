/**
 * 颜色工具函数
 * 
 * 该模块提供了一系列用于验证和检查颜色格式的工具函数。
 * 主要包含RGBA颜色格式、HSLA颜色格式的验证，以及透明色的检查。
 * 
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
 * 检查给定的颜色字符串是否为有效的RGBA格式
 * @param {string} color - 需要检查的颜色字符串
 * @returns {boolean} 如果是有效的RGBA格式则返回true，否则返回false
 * @example
 * isRgba('rgba(255, 0, 0, 1)') // 返回 true
 * isRgba('rgba(255, 0, 0, 0.5)') // 返回 true
 * isRgba('rgb(255, 0, 0)') // 返回 false
 */
export function isRgba (color: string): boolean {
  return (/^[rR][gG][Bb][Aa]\(([s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\s]*,){3}[\s]*(1|1.0|0|0.[0-9])[\s]*\){1}$/).test(color)
}

/**
 * 检查给定的颜色字符串是否为有效的HSLA格式
 * @param {string} color - 需要检查的颜色字符串
 * @returns {boolean} 如果是有效的HSLA格式则返回true，否则返回false
 * @example
 * isHsla('hsla(360, 100%, 50%, 1)') // 返回 true
 * isHsla('hsla(180, 50%, 50%, 0.5)') // 返回 true
 * isHsla('hsl(360, 100%, 50%)') // 返回 false
 */
export function isHsla (color: string): boolean {
  return (/^[hH][Ss][Ll][Aa]\(([s]*(360｜3[0-5][0-9]|[012]?[0-9][0-9]?)[\s]*,)([\s]*((100|[0-9][0-9]?)%|0)[\s]*,){2}([\s]*(1|1.0|0|0.[0-9])[\s]*)\)$/).test(color)
}

/**
 * 检查给定的颜色是否为透明色
 * 透明色包括：
 * 1. 'transparent' 关键字
 * 2. 'none' 关键字
 * 3. rgba格式且alpha值为0
 * 4. hsla格式且alpha值为0
 * @param {string} color - 需要检查的颜色字符串
 * @returns {boolean} 如果是透明色则返回true，否则返回false
 * @example
 * isTransparent('transparent') // 返回 true
 * isTransparent('none') // 返回 true
 * isTransparent('rgba(255, 0, 0, 0)') // 返回 true
 * isTransparent('hsla(360, 100%, 50%, 0)') // 返回 true
 * isTransparent('rgba(255, 0, 0, 1)') // 返回 false
 */
export function isTransparent (color: string): boolean {
  return color === 'transparent' ||
    color === 'none' ||
    /^[rR][gG][Bb][Aa]\(([s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\s]*,){3}[\s]*0[\s]*\)$/.test(color) ||
    /^[hH][Ss][Ll][Aa]\(([s]*(360｜3[0-5][0-9]|[012]?[0-9][0-9]?)[\s]*,)([\s]*((100|[0-9][0-9]?)%|0)[\s]*,){2}([\s]*0[\s]*)\)$/.test(color)
}
