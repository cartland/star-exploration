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

import { StarGenerator } from './StarGenerator';
import { V } from '../model/Vector2';

// Create a simple, predictable mock for the Random class.
const createMockPrng = () => {
  let i = 0;
  const values = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 0.1];
  return {
    nextFloat: () => {
      const result = values[i];
      i = (i + 1) % values.length;
      return result;
    }
  };
};

describe('StarGenerator', () => {
  it('should generate a predictable number of stars', () => {
    const mockPrng = createMockPrng();
    const starGenerator = new StarGenerator(mockPrng);
    const stars = starGenerator.generateStars(1000, 20, 10, V(800, 600));
    // flightSpeed * elapsed / 10 = 10 * 20 / 10 = 20
    expect(stars.length).toBe(20);
  });

  it('should cap elapsed time at 30ms for star count calculation', () => {
    const mockPrng = createMockPrng();
    const starGenerator = new StarGenerator(mockPrng);
    const stars = starGenerator.generateStars(1000, 100, 10, V(800, 600));
    // flightSpeed * capped_elapsed / 10 = 10 * 30 / 10 = 30
    expect(stars.length).toBe(30);
  });

  it('should generate stars with predictable positions based on the injected PRNG', () => {
    const mockPrng = createMockPrng();
    const starGenerator = new StarGenerator(mockPrng);
    const dimensions = V(800, 600);
    const stars = starGenerator.generateStars(1000, 20, 1, dimensions);
    // flightSpeed * elapsed / 10 = 1 * 20 / 10 = 2 stars
    expect(stars.length).toBe(2);

    // First star position is based on the first two mocked float values (0.2, 0.3)
    expect(stars[0].position.x).toBe(dimensions.x * 0.2);
    expect(stars[0].position.y).toBe(dimensions.y * 0.3);

    // Second star position is based on the next two mocked float values (0.4, 0.5)
    expect(stars[1].position.x).toBe(dimensions.x * 0.4);
    expect(stars[1].position.y).toBe(dimensions.y * 0.5);
  });

  it('should generate stars with zero initial velocity and correct creation time', () => {
    const mockPrng = createMockPrng();
    const starGenerator = new StarGenerator(mockPrng);
    const stars = starGenerator.generateStars(12345, 20, 1, V(800, 600));
    expect(stars.length).toBe(2);
    expect(stars[0].velocity.x).toBe(0);
    expect(stars[0].velocity.y).toBe(0);
    expect(stars[0].creationTime).toBe(12345);
    expect(stars[1].creationTime).toBe(12345);
  });
});
