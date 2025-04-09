/**
 * @file 日志工具函数
 * @description 提供了一系列日志记录工具函数，用于在开发环境下输出格式化的警告和错误信息
 * @license Licensed under the Apache License, Version 2.0
 */

/**
 * 开发环境标识
 * 仅在开发环境下（NODE_ENV === 'development'）输出日志信息
 */
const DEV = process.env.NODE_ENV === 'development'

/**
 * 基础日志输出函数
 * @param {string} templateText - 日志模板文本，包含样式占位符
 * @param {string} tagStyle - 标签样式，用于设置日志标签的CSS样式
 * @param {string} messageStyle - 消息样式，用于设置日志消息的CSS样式
 * @param {string} api - API名称，用于标识调用的API
 * @param {string} invalidParam - 无效参数名称，用于标识错误的参数
 * @param {string} append - 附加信息
 */
function log (templateText: string, tagStyle: string, messageStyle: string, api: string, invalidParam: string, append: string): void {
  if (DEV) {
    const apiStr = api !== '' ? `Call api \`${api}\`${invalidParam !== '' || append !== '' ? ', ' : '.'}` : ''
    const invalidParamStr = invalidParam !== '' ? `invalid parameter \`${invalidParam}\`${append !== '' ? ', ' : '.'}` : ''
    const appendStr = append !== '' ? append : ''
    console.log(templateText, tagStyle, messageStyle, apiStr, invalidParamStr, appendStr)
  }
}

/**
 * 输出警告日志
 * @param {string} api - API名称，标识触发警告的API
 * @param {string} invalidParam - 无效参数名称，标识导致警告的参数
 * @param {string} [append] - 可选的附加警告信息
 */
export function logWarn (api: string, invalidParam: string, append?: string): void {
  log(
    '%c😑 klinecharts warning%c %s%s%s',
    'padding:3px 4px;border-radius:2px;color:#ffffff;background-color:#FF9600',
    'color:#FF9600',
    api, invalidParam, append ?? ''
  )
}

/**
 * 输出错误日志
 * @param {string} api - API名称，标识触发错误的API
 * @param {string} invalidParam - 无效参数名称，标识导致错误的参数
 * @param {string} [append] - 可选的附加错误信息
 */
export function logError (api: string, invalidParam: string, append?: string): void {
  log(
    '%c😟 klinecharts error%c %s%s%s',
    'padding:3px 4px;border-radius:2px;color:#ffffff;background-color:#F92855;',
    'color:#F92855;',
    api, invalidParam, append ?? ''
  )
}

/**
 * 输出欢迎标签
 * 在控制台显示带有版本信息的欢迎消息
 */
export function logTag (): void {
  log(
    '%c❤️ Welcome to klinecharts. Version is __VERSION__',
    'border-radius:4px;border:dashed 1px #1677FF;line-height:70px;padding:0 20px;margin:16px 0;font-size:14px;color:#1677FF;',
    '',
    '',
    '',
    ''
  )
}
