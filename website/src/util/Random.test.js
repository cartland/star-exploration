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

import { Random } from './Random';

describe('Random', () => {
  it('should produce deterministic values from a seed', () => {
    const random1 = new Random(12345);
    const random2 = new Random(12345);
    expect(random1.next()).toBe(random2.next());
    expect(random1.nextFloat()).toBe(random2.nextFloat());
    expect(random1.nextWithMax(100)).toBe(random2.nextWithMax(100));
  });

  it('should produce different values for different seeds', () => {
    const random1 = new Random(1);
    const random2 = new Random(2);
    expect(random1.next()).not.toBe(random2.next());
  });

  it('next() should return a value within the expected range [1, 2147483646]', () => {
    const random = new Random(1);
    const result = random.next();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThan(2147483647);
  });

  it('nextWithMax() should return a value within the specified range [0, max)', () => {
    const random = new Random(1);
    const max = 50;
    // Run it a few times to be sure.
    for (let i = 0; i < 100; i++) {
      const result = random.nextWithMax(max);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(max);
    }
  });

  it('nextFloat() should return a value in the range [0, 1)', () => {
    const random = new Random(1);
    // Run it a few times to be sure.
    for (let i = 0; i < 100; i++) {
      const result = random.nextFloat();
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(1);
    }
  });

  it('should handle a seed of 0', () => {
    const random = new Random(0);
    expect(random._seed).toBe(2147483646);
    expect(random.next()).toBeGreaterThan(0);
  });

  it('should handle a negative seed', () => {
    const random = new Random(-100);
    expect(random._seed).toBeGreaterThan(0);
    expect(random.next()).toBeGreaterThan(0);
  });
});