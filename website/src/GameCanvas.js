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
import { AnimationLoop } from './animation/AnimationLoop';

class Canvas extends Component {
  constructor(props) {
    super(props);
    // Global state.
    this.state = {
      dimensions: V(800, 600)
    };

    this.canvas = React.createRef();
    this.backgroundRenderer = new BackgroundRenderer();
    this.starRenderer = new StarRenderer();
    this.starController = new StarController();
    this.starGenerator = new StarGenerator(new Random(new Date().getTime()));
    this.animationLoop = new AnimationLoop(
      this.canvas,
      this.starGenerator,
      this.starController,
      this.backgroundRenderer,
      this.starRenderer
    );
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    this.animationLoop.start();
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
      <div>
        <canvas id="mainCanvas" ref={this.canvas} width={this.state.dimensions.x} height={this.state.dimensions.y} />
      </div>
    )
  }
}

export default Canvas;
