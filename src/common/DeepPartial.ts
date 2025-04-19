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
 * 深度可选类型工具
 * 将类型T的所有属性及其嵌套属性都变为可选的（添加?修饰符）
 * @template T 要转换的类型
 * @returns 转换后的类型，其中所有属性都是可选的
 */
type DeepPartial<T> = {
  /**
   * 遍历类型T的所有属性P
   * 1. 如果属性值是数组类型，则将数组元素类型也转换为DeepPartial
   * 2. 如果属性值是只读数组类型，则将只读数组元素类型也转换为DeepPartial
   * 3. 如果属性值是对象类型，则递归地将该对象类型转换为DeepPartial
   * 4. 其他情况则保持原属性类型不变
   */
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer X>
      ? ReadonlyArray<DeepPartial<X>>
      : T[P] extends object
        ? DeepPartial<T[P]>
        : T[P]
}

export default DeepPartial
