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

import { V } from './Vector2';

describe('Vector2', () => {
  it('should create a vector with x and y properties', () => {
    const vec = V(1, 2);
    expect(vec.x).toBe(1);
    expect(vec.y).toBe(2);
  });

  it('should add two vectors correctly', () => {
    const vecA = V(1, 2);
    const vecB = V(3, 4);
    const result = vecA.add(vecB);
    expect(result.x).toBe(4);
    expect(result.y).toBe(6);
  });

  it('should subtract two vectors correctly', () => {
    const vecA = V(5, 5);
    const vecB = V(1, 2);
    const result = vecA.sub(vecB);
    expect(result.x).toBe(4);
    expect(result.y).toBe(3);
  });

  it('should scale a vector by a factor', () => {
    const vec = V(2, 3);
    const result = vec.scale(3);
    expect(result.x).toBe(6);
    expect(result.y).toBe(9);
  });

  it('should calculate the size (magnitude) of a vector', () => {
    const vec = V(3, 4);
    expect(vec.size()).toBe(5); // 3-4-5 right triangle
  });

  it('should handle normalization of a zero vector', () => {
    const vec = V(0, 0);
    expect(vec.normalize()).toBeNull();
  });

  it('should normalize a vector to unit length', () => {
    const vec = V(3, 4);
    const normalized = vec.normalize();
    expect(normalized.x).toBeCloseTo(0.6);
    expect(normalized.y).toBeCloseTo(0.8);
    expect(normalized.size()).toBeCloseTo(1.0);
  });

  it('should calculate the left orthogonal vector', () => {
    const vec = V(2, 3);
    const orthogonal = vec.orthogonalLeft();
    expect(orthogonal.x).toBe(3);
    expect(orthogonal.y).toBe(-2);
  });

  it('should calculate the right orthogonal vector', () => {
    const vec = V(2, 3);
    const orthogonal = vec.orthogonalRight();
    expect(orthogonal.x).toBe(-3);
    expect(orthogonal.y).toBe(2);
  });
});
