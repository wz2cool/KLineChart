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
 * 将源对象的属性合并到目标对象中
 * @param target 目标对象
 * @param source 源对象
 * @description
 * 1. 如果源对象的属性值是对象，且目标对象相应的属性也是对象，则递归合并
 * 2. 如果源对象的属性值不是对象，则直接克隆赋值给目标对象
 * 3. 只合并源对象自身的属性（不包括原型链上的属性）
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
export function merge (target: any, source: any): void {
  if ((!isObject(target) && !isObject(source))) {
    return
  }
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key) as boolean) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- ignore
      const targetProp = target[key]
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- ignore
      const sourceProp = source[key]
      if (
        isObject(sourceProp) &&
        isObject(targetProp)
      ) {
        merge(targetProp, sourceProp)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
        if (isValid(source[key])) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- ignore
          target[key] = clone(source[key])
        }
      }
    }
  }
}

/**
 * 深度克隆一个对象或数组
 * @param target 要克隆的目标对象或数组
 * @returns 克隆后的新对象或数组
 * @description
 * 1. 如果目标不是对象类型，则直接返回
 * 2. 如果目标是数组，创建新数组；如果是对象，创建新对象
 * 3. 递归克隆对象的所有属性
 * 4. 只克隆对象自身的属性（不包括原型链上的属性）
 */
export function clone<T> (target: T): T {
  if (!isObject(target)) {
    return target
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
  let copy: any = null
  if (isArray(target)) {
    copy = []
  } else {
    copy = {}
  }
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key) as boolean) {
      const v = target[key]
      if (isObject(v)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
        copy[key] = clone(v)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
        copy[key] = v
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- ignore
  return copy
}

/**
 * 判断一个值是否为数组
 * @param value 要判断的值
 * @returns 如果是数组返回true，否则返回false
 * @description 使用Object.prototype.toString.call()方法判断值的类型
 */
export function isArray<T = unknown> (value: unknown): value is T[] {
  return Object.prototype.toString.call(value) === '[object Array]'
}

/**
 * 判断一个值是否为函数
 * @param value 要判断的值
 * @returns 如果是函数返回true，否则返回false
 * @description 使用typeof运算符判断值是否为'function'类型
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- ignore
export function isFunction<T = (...args: unknown[]) => unknown> (value: unknown): value is T {
  return typeof value === 'function'
}

/**
 * 判断一个值是否为对象
 * @param value 要判断的值
 * @returns 如果是对象返回true，否则返回false
 * @description 
 * 1. 使用typeof运算符判断值是否为'object'类型
 * 2. 同时确保值不为null或undefined
 */
export function isObject (value: unknown): value is object {
  return (typeof value === 'object') && isValid(value)
}

/**
 * 判断一个值是否为数字
 * @param value 要判断的值
 * @returns 如果是数字返回true，否则返回false
 * @description 
 * 1. 使用typeof运算符判断值是否为'number'类型
 * 2. 使用Number.isFinite()确保值是有限数字
 */
export function isNumber (value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

/**
 * 判断一个值是否有效（不为null且不为undefined）
 * @param value 要判断的值
 * @returns 如果值不为null且不为undefined返回true，否则返回false
 */
export function isValid<T> (value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

/**
 * 判断一个值是否为布尔值
 * @param value 要判断的值
 * @returns 如果是布尔值返回true，否则返回false
 * @description 使用typeof运算符判断值是否为'boolean'类型
 */
export function isBoolean (value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * 判断一个值是否为字符串
 * @param value 要判断的值
 * @returns 如果是字符串返回true，否则返回false
 * @description 使用typeof运算符判断值是否为'string'类型
 */
export function isString (value: unknown): value is string {
  return typeof value === 'string'
}
