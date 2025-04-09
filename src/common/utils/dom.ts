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
 * DOM操作工具函数模块
 * 提供创建和操作DOM元素的实用工具函数
 */

/**
 * 创建DOM元素并设置其样式
 * @template K 泛型参数，限定为HTMLElementTagNameMap的键类型，用于约束标签名称
 * @param {K} tagName HTML标签名称，如'div'、'span'等
 * @param {Partial<CSSStyleDeclaration>} [styles] 可选的样式对象，包含要应用的CSS样式属性
 * @returns {HTMLElementTagNameMap[K]} 返回创建的DOM元素
 * @example
 * // 创建一个div元素并设置样式
 * const div = createDom('div', {
 *   width: '100px',
 *   height: '100px',
 *   backgroundColor: 'red'
 * })
 */
export function createDom<K extends keyof HTMLElementTagNameMap> (tagName: K, styles?: Partial<CSSStyleDeclaration>): HTMLElementTagNameMap[K] {
  const dom = document.createElement(tagName)
  const s = styles ?? {}
  for (const key in s) {
    (dom.style)[key] = s[key] ?? ''
  }
  return dom
}
