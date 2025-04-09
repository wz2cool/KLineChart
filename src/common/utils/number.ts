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
 * 二分查找最接近目标值的索引
 * @description 在有序数组中查找最接近目标值的元素索引
 * @param dataList 要搜索的数据列表
 * @param valueKey 用于比较的属性键名
 * @param targetValue 目标值
 * @return {number} 返回最接近目标值的元素索引
 * @example
 * const list = [{value: 1}, {value: 3}, {value: 5}]
 * const index = binarySearchNearest(list, 'value', 4) // 返回1，因为3最接近4
 */
export function binarySearchNearest<T> (dataList: T[], valueKey: keyof T, targetValue: T[keyof T]): number {
  let left = 0
  let right = 0
  for (right = dataList.length - 1; left !== right;) {
    const midIndex = Math.floor((right + left) / 2)
    const mid = right - left
    const midValue = dataList[midIndex][valueKey]
    if (targetValue === dataList[left][valueKey]) {
      return left
    }
    if (targetValue === dataList[right][valueKey]) {
      return right
    }
    if (targetValue === midValue) {
      return midIndex
    }

    if (targetValue > midValue) {
      left = midIndex
    } else {
      right = midIndex
    }

    if (mid <= 2) {
      break
    }
  }
  return left
}

/**
 * 优化数字，将数字规整化为更易读的值
 * @description 将数字调整为1、2、3、4、5、6、8等易读的刻度值
 * @param value 需要优化的数字
 * @return {number} 返回优化后的数字
 * @example
 * nice(3.7) // 返回4
 * nice(7.8) // 返回8
 */
export function nice (value: number): number {
  const exponent = Math.floor(log10(value))
  const exp10 = index10(exponent)
  const f = value / exp10 // 1 <= f < 10
  let nf = 0
  if (f < 1.5) {
    nf = 1
  } else if (f < 2.5) {
    nf = 2
  } else if (f < 3.5) {
    nf = 3
  } else if (f < 4.5) {
    nf = 4
  } else if (f < 5.5) {
    nf = 5
  } else if (f < 6.5) {
    nf = 6
  } else {
    nf = 8
  }
  value = nf * exp10
  return +value.toFixed(Math.abs(exponent))
}

/**
 * 数字四舍五入
 * @description 将数字按指定精度进行四舍五入
 * @param value 需要四舍五入的数字
 * @param precision 精度，即保留的小数位数，默认为0
 * @return {number} 返回四舍五入后的数字
 * @example
 * round(3.1415, 2) // 返回3.14
 * round(3.1415) // 返回3
 */
export function round (value: number, precision?: number): number {
  precision = Math.max(0, precision ?? 0)
  const pow = Math.pow(10, precision)
  return Math.round(value * pow) / pow
}

/**
 * 获取数字的精度
 * @description 获取数字的小数位数，支持科学计数法
 * @param value 需要获取精度的数字
 * @return {number} 返回数字的精度（小数位数）
 * @example
 * getPrecision(3.1415) // 返回4
 * getPrecision(1e-5) // 返回5
 */
export function getPrecision (value: number): number {
  const str = value.toString()
  const eIndex = str.indexOf('e')
  if (eIndex > 0) {
    const precision = +str.slice(eIndex + 1)
    return precision < 0 ? -precision : 0
  }
  const dotIndex = str.indexOf('.')
  return dotIndex < 0 ? 0 : str.length - 1 - dotIndex
}

/**
 * 获取数据列表中指定属性的最大值和最小值
 * @description 遍历数据列表，找出指定属性的最大值和最小值
 * @param dataList 数据列表
 * @param maxKey 用于比较最大值的属性键名
 * @param minKey 用于比较最小值的属性键名
 * @return {number[]} 返回包含最大值和最小值的数组，格式为[最大值, 最小值]
 * @example
 * const list = [{high: 10, low: 5}, {high: 15, low: 8}]
 * const [max, min] = getMaxMin(list, 'high', 'low') // 返回[15, 5]
 */
export function getMaxMin<D> (dataList: D[], maxKey: keyof D, minKey: keyof D): number[] {
  const maxMin = [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
  const dataLength = dataList.length
  let index = 0
  while (index < dataLength) {
    const data = dataList[index]
    maxMin[0] = Math.max((data[maxKey] ?? Number.MIN_SAFE_INTEGER) as number, maxMin[0])
    maxMin[1] = Math.min((data[minKey] ?? Number.MAX_SAFE_INTEGER) as number, maxMin[1])
    ++index
  }
  return maxMin
}

/**
 * 计算以10为底的对数
 * @description 计算一个数的以10为底的对数，当输入为0时返回0
 * @param value 需要计算对数的数字
 * @return {number} 返回以10为底的对数值
 * @example
 * log10(100) // 返回2
 * log10(0) // 返回0
 */
export function log10 (value: number): number {
  if (value === 0) {
    return 0
  }
  return Math.log10(value)
}

/**
 * 计算10的幂
 * @description 计算10的指定次幂
 * @param value 指数值
 * @return {number} 返回10的指定次幂的结果
 * @example
 * index10(2) // 返回100
 * index10(-2) // 返回0.01
 */
export function index10 (value: number): number {
  return Math.pow(10, value)
}
