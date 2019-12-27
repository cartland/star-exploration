import React, { Component } from 'react';
import getViewport from './getViewport';
import { V } from './model/Vector2';

import { BackgroundRenderer } from './render/BackgroundRenderer';
import { StarController } from './controller/StarController';
import { StarGenerator } from './generator/StarGenerator';
import { StarRenderer } from './render/StarRenderer';

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
    this.starGenerator = new StarGenerator();
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
    const flightSpeed = 10.0;

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
    const context = this.canvas.current.getContext("2d");
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
