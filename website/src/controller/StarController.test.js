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

import { StarController } from './StarController';
import { Star } from '../model/Star';
import { V } from '../model/Vector2';

describe('StarController', () => {
  let starController;

  beforeEach(() => {
    starController = new StarController();
    // Reset static count on Star for test isolation.
    Star.count = 0;
  });

  it('should initialize with zero stars', () => {
    expect(starController.getStarCount()).toBe(0);
    expect(Object.keys(starController.getStars()).length).toBe(0);
  });

  it('should add a single star', () => {
    const star = new Star(V(10, 10), V(0, 0), 0);
    starController.addStar(star);
    expect(starController.getStarCount()).toBe(1);
    expect(starController.containsStar(star)).toBe(true);
  });

  it('should add multiple stars', () => {
    const stars = [
      new Star(V(10, 10), V(0, 0), 0),
      new Star(V(20, 20), V(0, 0), 0)
    ];
    starController.addStars(stars);
    expect(starController.getStarCount()).toBe(2);
  });

  it('should delete a star', () => {
    const star = new Star(V(10, 10), V(0, 0), 0);
    starController.addStar(star);
    expect(starController.getStarCount()).toBe(1);
    starController.deleteStar(star);
    expect(starController.getStarCount()).toBe(0);
    expect(starController.containsStar(star)).toBe(false);
  });

  describe('updateStars', () => {
    const dimensions = V(800, 600);
    const center = dimensions.scale(0.5); // V(400, 300)
    const maxRadius = center.size();
    const flightSpeed = 10;

    it('should update a star position based on its velocity', () => {
      const star = new Star(center, V(0, 0), 1000);
      starController.addStar(star);

      // Simulate 20ms passing at time 1020.
      starController.updateStars(1020, 20, flightSpeed, dimensions);

      const updatedStar = starController.getStars()[star.key()];
      // Star at center has a special velocity case.
      const expectedVelocityMagnitude = (flightSpeed * 0.05 / maxRadius) * (1 + (1 / 1000) * flightSpeed * 20) * 20;
      expect(updatedStar.velocity.x).toBeCloseTo(expectedVelocityMagnitude);
      expect(updatedStar.position.x).toBeCloseTo(center.x + expectedVelocityMagnitude);
    });

    it('should delete a star that moves outside the screen radius', () => {
      // Create a star that is already near the edge.
      const position = V(center.x + maxRadius - 1, center.y);
      const star = new Star(position, V(0, 0), 0);
      starController.addStar(star);

      // First update: the star is still inside, so its position is updated and it moves off-screen.
      starController.updateStars(100, 30, flightSpeed, dimensions);
      expect(starController.getStarCount()).toBe(1);
      const updatedStar = starController.getStars()[star.key()];
      expect(updatedStar.position.sub(center).size()).toBeGreaterThan(maxRadius);

      // Second update: the star is now outside, so it should be deleted.
      starController.updateStars(130, 30, flightSpeed, dimensions);
      expect(starController.getStarCount()).toBe(0);
    });

    it('should not let elapsed time exceed 30ms for calculations', () => {
      const star = new Star(center, V(0, 0), 1000);
      starController.addStar(star);

      // Simulate 100ms passing, which should be capped at 30ms.
      starController.updateStars(1100, 100, flightSpeed, dimensions);

      const updatedStar = starController.getStars()[star.key()];
      // Calculate expected velocity with a capped elapsed time of 30.
      const expectedVelocityMagnitude = (flightSpeed * 0.05 / maxRadius) * (1 + (1 / 1000) * flightSpeed * 100) * 30;
      expect(updatedStar.velocity.x).toBeCloseTo(expectedVelocityMagnitude);
      expect(updatedStar.position.x).toBeCloseTo(center.x + expectedVelocityMagnitude);
    });
  });
});