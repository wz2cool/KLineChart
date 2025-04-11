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
 * 坐标点接口
 * 定义了一个二维平面上的点的坐标结构
 */
export default interface Coordinate {
  /**
   * x轴坐标
   */
  x: number
  /**
   * y轴坐标
   */
  y: number
}

/**
 * 计算两个坐标点之间的距离
 * @param coordinate1 第一个坐标点
 * @param coordinate2 第二个坐标点
 * @returns 两点之间的欧几里得距离
 */
export function getDistance (coordinate1: Coordinate, coordinate2: Coordinate): number {
  const xDif = coordinate1.x - coordinate2.x
  const yDif = coordinate1.y - coordinate2.y
  return Math.sqrt(xDif * xDif + yDif * yDif)
}
