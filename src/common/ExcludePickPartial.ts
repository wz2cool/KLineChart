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

import type PickRequired from './PickRequired'

/**
 * 排除并选取必需属性的类型工具
 * 该类型工具首先将类型T的所有属性变为可选的，然后将指定的属性K变为必需的
 * @template T 要转换的源类型
 * @template K 要变为必需的属性键，必须是T的键
 * @returns 转换后的类型，其中指定的属性K为必需的，其他属性为可选的
 * @example
 * interface Person {
 *   name: string
 *   age: number
 *   address: string
 * }
 * // 结果类型中name为必需，其他属性可选
 * type PersonPartialExceptName = ExcludePickPartial<Person, 'name'>
 */
type ExcludePickPartial<T, K extends keyof T> = PickRequired<Partial<T>, K>

export default ExcludePickPartial
