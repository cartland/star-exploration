/**
 *
 * Copyright 2025 Chris Cartland. All rights reserved.
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

// eslint-disable-next-line no-extend-native
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export class AnimationLoop {
  constructor(canvas, starGenerator, starController, backgroundRenderer, starRenderer) {
    this.canvas = canvas;
    this.starGenerator = starGenerator;
    this.starController = starController;
    this.backgroundRenderer = backgroundRenderer;
    this.starRenderer = starRenderer;
    this.lastUpdated = null;
  }

  start() {
    this.drawAnimationFrame();
  }

  updateElapsed = (currentTime) => {
    if (!currentTime) {
      currentTime = 0;
    }
    if (this.lastUpdated === null) {
      this.lastUpdated = currentTime;
    }
    const elapsed = currentTime - this.lastUpdated;
    return elapsed;
  }

  drawAnimationFrame = (currentTime) => {
    const elapsed = this.updateElapsed(currentTime);
    const minSpeed = 2;
    const maxSpeed = 20;

    let flightSpeed = minSpeed;
    const boundaryA = 7000;
    const boundaryB = boundaryA + 4000;
    const boundaryC = boundaryB + 2000;
    const boundaryD = boundaryC + 5000;
    const bucket = currentTime % boundaryD;
    if (bucket < boundaryA) {
      flightSpeed = minSpeed;
    } else if (bucket < boundaryB) {
      // Increase from low to high.
      flightSpeed = bucket.map(boundaryA, boundaryB, minSpeed, maxSpeed);
    } else if (bucket < boundaryC) {
      flightSpeed = maxSpeed;
    } else {
      // Decrease from high to low.
      flightSpeed = bucket.map(boundaryC, boundaryD, maxSpeed, minSpeed);
    }

    if (elapsed > 30) {
      const dimensions = V(
        this.canvas.current.width,
        this.canvas.current.height
      );
      const stars = this.starGenerator.generateStars(currentTime, elapsed, flightSpeed, dimensions);
      this.starController.addStars(stars);
      // Updates.
      this.starController.updateStars(currentTime, elapsed, flightSpeed, dimensions);
      // Drawing.
      let context = this.canvas.current.getContext("2d")
      // Draw.
      this.backgroundRenderer.drawBackground(context, dimensions);
      this.starRenderer.drawStars(context, this.starController.getStars());
      
      this.lastUpdated = currentTime;
    }
    requestAnimationFrame(this.drawAnimationFrame);
  }
}
