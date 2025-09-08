import React from 'react';
import { render } from '@testing-library/react';
import StarRenderer from './StarRenderer';
import 'jest-canvas-mock';

describe('StarRenderer', () => {
  it('should render without crashing', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const renderer = new StarRenderer(context);
    expect(renderer).toBeDefined();
  });
});
