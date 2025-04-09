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
 * 格式化工具函数集合
 */

import { isNumber, isValid } from './typeChecks'

/**
 * 日期时间接口，包含年月日时分秒
 */
export interface DateTime {
  YYYY: string
  MM: string
  DD: string
  HH: string
  mm: string
  ss: string
}

/**
 * 用于处理对象属性路径的正则表达式
 */
const reEscapeChar = /\\(\\)?/g
const rePropName = RegExp(
  '[^.[\\]]+' + '|' +
  '\\[(?:' +
    '([^"\'][^[]*)' + '|' +
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
  ')\\]' + '|' +
  '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
  , 'g')

/**
 * 根据属性路径获取对象中的值
 * @param data - 源数据对象
 * @param key - 属性路径，支持点号和方括号表示法，如'a.b.c'或'a[0].b'
 * @param defaultValue - 当获取不到值时的默认返回值
 * @returns 获取到的值或默认值
 */
export function formatValue (data: unknown, key: string, defaultValue?: unknown): unknown {
  if (isValid(data)) {
    const path: string[] = []
    key.replace(rePropName, (subString: string, ...args: unknown[]) => {
      let k = subString
      if (isValid(args[1])) {
        k = (args[2] as string).replace(reEscapeChar, '$1')
      } else if (isValid(args[0])) {
        k = (args[0] as string).trim()
      }
      path.push(k)
      return ''
    })
    let value = data
    let index = 0
    const length = path.length
    while (isValid(value) && index < length) {
      value = value?.[path[index++]]
    }
    return isValid(value) ? value : (defaultValue ?? '--')
  }
  return defaultValue ?? '--'
}

/**
 * 将时间戳格式化为日期时间对象
 * @param dateTimeFormat - Intl.DateTimeFormat实例，用于格式化日期
 * @param timestamp - 时间戳
 * @returns DateTime对象，包含年月日时分秒
 */
export function formatTimestampToDateTime (dateTimeFormat: Intl.DateTimeFormat, timestamp: number): DateTime {
  const date: Record<string, string> = {}
  dateTimeFormat.formatToParts(new Date(timestamp)).forEach(({ type, value }) => {
    switch (type) {
      case 'year': {
        date.YYYY = value
        break
      }
      case 'month': {
        date.MM = value
        break
      }
      case 'day': {
        date.DD = value
        break
      }
      case 'hour': {
        date.HH = value === '24' ? '00' : value
        break
      }
      case 'minute': {
        date.mm = value
        break
      }
      case 'second': {
        date.ss = value
        break
      }
    }
  })
  return date as unknown as DateTime
}

/**
 * 将时间戳格式化为指定格式的字符串
 * @param dateTimeFormat - Intl.DateTimeFormat实例，用于格式化日期
 * @param timestamp - 时间戳
 * @param format - 格式字符串，如'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期时间字符串
 */
export function formatTimestampToString (dateTimeFormat: Intl.DateTimeFormat, timestamp: number, format: string): string {
  const date = formatTimestampToDateTime(dateTimeFormat, timestamp)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- ignore
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, key => date[key])
}

/**
 * 格式化数值精度
 * @param value - 需要格式化的数值
 * @param precision - 小数位数，默认为2
 * @returns 格式化后的字符串
 */
export function formatPrecision (value: string | number, precision?: number): string {
  const v = +value
  if (isNumber(v)) {
    return v.toFixed(precision ?? 2)
  }
  return `${value}`
}

/**
 * 格式化大数字，将数字转换为带单位的形式
 * 例如：1000000 => 1M，1000 => 1K
 * @param value - 需要格式化的数值
 * @returns 格式化后的字符串
 */
export function formatBigNumber (value: string | number): string {
  const v = +value
  if (isNumber(v)) {
    if (v > 1000000000) {
      return `${+((v / 1000000000).toFixed(3))}B`
    }
    if (v > 1000000) {
      return `${+((v / 1000000).toFixed(3))}M`
    }
    if (v > 1000) {
      return `${+((v / 1000).toFixed(3))}K`
    }
  }
  return `${value}`
}

/**
 * 格式化数字，添加千分位分隔符
 * @param value - 需要格式化的数值
 * @param sign - 分隔符
 * @returns 格式化后的字符串
 */
export function formatThousands (value: string | number, sign: string): string {
  const vl = `${value}`
  if (sign.length === 0) {
    return vl
  }
  if (vl.includes('.')) {
    const arr = vl.split('.')
    return `${arr[0].replace(/(d)(?=(d{3})+$)/g, $1 => `${$1}${sign}`)}.${arr[1]}`
  }
  return vl.replace(/(d)(?=(d{3})+$)/g, $1 => `${$1}${sign}`)
}

/**
 * 格式化小数，折叠连续的0
 * 例如：当threshold为3时，1.000001 => 1.0{3}1
 * @param value - 需要格式化的数值
 * @param threshold - 连续0的阈值，超过该值时进行折叠
 * @returns 格式化后的字符串
 */
export function formatFoldDecimal (value: string | number, threshold: number): string {
  const vl = `${value}`
  const reg = new RegExp('\\.0{' + threshold + ',}[1-9][0-9]*$')
  if (reg.test(vl)) {
    const result = vl.split('.')
    const lastIndex = result.length - 1
    const v = result[lastIndex]
    const match = /0*/.exec(v)
    if (isValid(match)) {
      const count = match[0].length
      result[lastIndex] = v.replace(/0*/, `0{${count}}`)
      return result.join('.')
    }
  }
  return vl
}
