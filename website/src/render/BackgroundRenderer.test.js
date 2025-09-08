import React from 'react';
import { render } from '@testing-library/react';
import BackgroundRenderer from './BackgroundRenderer';
import 'jest-canvas-mock';

describe('BackgroundRenderer', () => {
  it('should render without crashing', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const renderer = new BackgroundRenderer(context);
    expect(renderer).toBeDefined();
  });
});
