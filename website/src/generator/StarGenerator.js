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

import { Star } from "../model/Star";
import { V } from '../model/Vector2';

import { Random } from '../util/Random';

export class StarGenerator {
  constructor() {
    this.prng = null;
  }

  generateStars = (currentTime, elapsed, flightSpeed, dimensions) => {
    elapsed = Math.min(30, elapsed);
    if (this.prng == null) {
      this.prng = new Random(currentTime);
    }
    const count = flightSpeed * elapsed / 10;
    const stars = [];
    for (let i = 0; i < count; i++) {
      // Pick radius and angle.
      const prng = this.prng;
      const x = dimensions.x * prng.nextFloat();
      const y = dimensions.y * prng.nextFloat();
      const position = V(x, y);
      // Calculate velocity.
      const velocity = V(0, 0);
      const star = new Star(position, velocity, currentTime);
      stars.push(star);
    }
    return stars;
  }
}
