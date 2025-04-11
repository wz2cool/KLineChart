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
 * K线图中柱子和间隙的空间尺寸配置
 */
export default interface BarSpace {
  /**
   * 柱子的宽度
   */
  bar: number

  /**
   * 柱子宽度的一半
   */
  halfBar: number

  /**
   * 柱子之间的间隙宽度
   */
  gapBar: number

  /**
   * 柱子之间间隙宽度的一半
   */
  halfGapBar: number
}
