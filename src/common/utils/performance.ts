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
 * 性能优化工具函数
 * 提供了一系列用于优化代码执行性能的工具函数，包括函数节流和记忆化等功能
 */

/**
 * 函数节流
 * 创建一个节流函数，在指定的等待时间内最多执行一次原函数
 * @param func 需要节流的函数
 * @param wait 等待时间（毫秒），默认为20ms
 * @returns 返回一个新的节流函数
 * @example
 * // 创建一个节流函数，每100ms最多执行一次
 * const throttledScroll = throttle(() => {
 *   console.log('scroll event')
 * }, 100)
 * 
 * // 添加滚动事件监听
 * window.addEventListener('scroll', throttledScroll)
 */
export function throttle (func: (...args: unknown[]) => unknown, wait?: number): () => void {
  let previous = 0
  return function () {
    const now = Date.now()
    if (now - previous > (wait ?? 20)) {
      func.apply(this, arguments)
      previous = now
    }
  }
}

/**
 * 函数记忆化（当前已注释）
 * 创建一个会缓存计算结果的函数，用于优化需要进行大量重复计算的场景
 * @param func 需要记忆化的函数
 * @param resolver 可选的解析函数，用于生成缓存键
 * @returns 返回一个带有缓存功能的新函数
 * @example
 * // 创建一个记忆化的斐波那契数列计算函数
 * const fibonacci = memoize((n) => {
 *   if (n < 2) return n
 *   return fibonacci(n - 1) + fibonacci(n - 2)
 * })
 */
// export function memoize<R1 = any, R2 = any> (func: (...args: any[]) => R1, resolver?: (...args: any[]) => R2): (...args: any[]) => R1 {
//   if (!isFunction(func) || (isValid(resolver) && !isFunction(resolver))) {
//     throw new TypeError('Expected a function')
//   }
//   const memoized = function (...args: any[]): any {
//     const key = isFunction(resolver) ? resolver.apply(this, args) : args[0]
//     const cache = memoized.cache

//     if (cache.has(key)) {
//       return cache.get(key)
//     }
//     const result = func.apply(this, args)
//     // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
//     memoized.cache = cache.set(key, result) || cache
//     return result
//   }
//   // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
//   memoized.cache = new (memoize.Cache || Map)()
//   return memoized
// }
// memoize.Cache = Map
