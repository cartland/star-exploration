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

import React, { Component } from 'react';
import getViewport from './getViewport';
import { V } from './model/Vector2';

import { BackgroundRenderer } from './render/BackgroundRenderer';
import { StarRenderer } from './render/StarRenderer';
import { StarController } from './controller/StarController';
import { StarGenerator } from './generator/StarGenerator';
import { Random } from './util/Random';

// eslint-disable-next-line no-extend-native
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

class Canvas extends Component {
  constructor(props) {
    super(props);
    // Global state.
    this.state = {
      dimensions: V(800, 600)
    };
    this.lastUpdated = null;

    this.backgroundRenderer = new BackgroundRenderer();
    this.starRenderer = new StarRenderer();
    this.starController = new StarController();
    this.starGenerator = new StarGenerator(new Random(new Date().getTime()));
    // Canvas.
    this.canvas = React.createRef();
    this.image = React.createRef();
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
      const stars = this.starGenerator.generateStars(currentTime, elapsed, flightSpeed, this.state.dimensions);
      this.starController.addStars(stars);
      // Updates.
      this.starController.updateStars(currentTime, elapsed, flightSpeed, this.state.dimensions);
      // Drawing.
      let context = this.canvas.current.getContext("2d")
      // Draw.
      this.backgroundRenderer.drawBackground(context, this.state.dimensions);
      let starCost = this.starRenderer.drawStars(context, this.starController.getStars());
      // Profiling.
      if (false) {
        const fps = 1000 / elapsed;
        console.log('Count:', this.starController.getStarCount(), 'Cost:', starCost, 'FPS', fps.toPrecision(3));
      }
      this.lastUpdated = currentTime;
    }
    requestAnimationFrame(this.drawAnimationFrame);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    if (!this.canvas.current) {
      return;
    }
    const context = this.canvas.current.getContext("2d");
    if (!context) {
      return;
    }
    const viewport = getViewport();
    // Set canvas width and height to match the viewport.
    context.canvas.width = viewport.width;
    context.canvas.height = viewport.height;
    this.setState({
      dimensions: V(viewport.width, viewport.height)
    });
    console.log('Viewport', viewport);
    setTimeout(() => {
      window.scrollTo(viewport.width / 2, viewport.height / 2);
    }, 500);
  }

  render() {
    return (
      <div style={this.state.fullScreenStyle}>
        <canvas id="mainCanvas" ref={this.canvas} width={this.state.dimensions.x} height={this.state.dimensions.y} />
      </div>
    )
  }
}

export default Canvas
