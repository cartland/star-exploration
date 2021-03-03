/**
 *
 * Copyright 2019 Chris Cartland. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

export class Star {
  static count = 0;
  constructor(position, velocity, creationTime) {
    if (typeof creationTime !== 'number') {
      throw new Error('Creation time must be a number')
    }
    this._key = Star.count++;
    this.position = position;
    this.velocity = velocity;
    this.age = 0;
    this.proximity = 0;
    this.creationTime = creationTime;
  }

  key = () => {
    return this._key;
  }
}
