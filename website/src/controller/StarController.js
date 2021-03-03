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

import { V } from '../model/Vector2';

export class StarController {
  constructor() {
    this.stars = {};
    this.starCount = 0;
  }

  getStars = () => {
    return this.stars;
  }

  containsStar = (star) => {
    return star.key() in this.stars;
  }

  addStar = (star) => {
    this.stars[star.key()] = star;
    this.starCount++;
  }

  addStars = (stars) => {
    stars.forEach((star) => {
      this.addStar(star);
    });
  }

  deleteStar = (star) => {
    delete this.stars[star.key()];
    this.starCount--;
  }

  getStarCount = () => {
    return this.starCount;
  }

  updateStars = (currentTime, elapsed, flightSpeed, dimensions) => {
    elapsed = Math.min(30, elapsed);
    // Display information.
    const center = dimensions.scale(0.5);
    const maxRadius = center.size();
    for (const star of Object.values(this.stars)) {
      // Check if star should be deleted.
      const distance = star.position.sub(center).size();
      if (distance > maxRadius) {
        this.deleteStar(star);
        continue;
      }
      // Update proximity.
      const age = currentTime - star.creationTime;
      star.age = age;
      star.proximity = flightSpeed * age;
      // Calculate outward velocity.
      const pixelsPerMillisecondAtRadius = flightSpeed * 0.05 / maxRadius;
      const proximityFactor = 1 / 1000;
      let outwardVelocity = star.position.sub(center).scale(pixelsPerMillisecondAtRadius);
      let outwardSpeed = outwardVelocity.size();
      if (outwardSpeed === 0) {
        outwardVelocity = V(1, 0).scale(pixelsPerMillisecondAtRadius);
        outwardSpeed = pixelsPerMillisecondAtRadius;
      }
      const proximityMultiplier = 1 + proximityFactor * star.proximity;
      const proximityVelocity = outwardVelocity.scale(proximityMultiplier);
      const frameVelocity = proximityVelocity.scale(elapsed);
      star.velocity = frameVelocity;
      // Update position.
      star.position = star.position.add(star.velocity);
    }
  }
}
