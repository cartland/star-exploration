# Star Exploration Web Animation

Star Exploration is an HTML website. It can be served as a static web page.

This was deployed to https://star-exploration.web.app with Firebase Hosting.

# Dependencies

1. Install Node.js, npm

    * [https://nodejs.org](https://nodejs.org)

1. Install Firebase CLI

    * [https://firebase.google.com/docs/cli/](https://firebase.google.com/docs/cli/)

# Run website locally

**Note:** This project was created with an older version of `react-scripts`. If you are using a recent version of Node.js (v17+), you may encounter errors after running `npm install`. If `npm start` fails, updating `react-scripts` should resolve the issue: `npm install react-scripts@latest`.

1. Run `npm install` to install dependencies

    ```
        cd website
        npm install
    ```

1. Run `npm start` to run the website locally

    ```
        npm start
    ```

1. View the local website

    [http://localhost:3000](http://localhost:3000)

# Deploy Website with Firebase Hosting

1. Set your Firebase Project ID

    ```
        firebase use --add YOUR_FIREBASE_PROJECT_ID
        # Example: firebase use --add star-exploration
    ```

1. Build the project before deploying

    ```
        npm run build
    ```

1. Deploy the project to a public server with Firebase Hosting

    ```
        firebase deploy
    ```

1. View the public webisite

    `https://YOUR_FIREBASE_PROJECT_ID.web.app`

    Example: [https://star-exploration.web.app](https://star-exploration.web.app)

# Summary of the Source Code

* [`website/public/index.html`](website/public/index.html): Main HTML page.
* [`website/src/App.js`](website/src/App.js): Create the React game canvas.
* [`website/src/GameCanvas.js`](website/src/GameCanvas.js): Most of the website logic is in this file.
* Files that render and draw the graphics
  * [`website/src/render/BackgroundRenderer.js`](website/src/render/BackgroundRenderer.js)
  * [`website/src/render/StarRenderer.js`](website/src/render/StarRenderer.js)
* Star update logic
  * [`website/src/controller/StarController.js`](website/src/controller/StarController.js)
* Generate random stars
  * [`website/src/generator/StarGenerator.js`](website/src/generator/StarGenerator.js)
* Data models
  * [`website/src/model/Star.js`](website/src/model/Star.js): Star information
  * [`website/src/model/Vector2.js`](website/src/model/Vector2.js): We do math with (x, y) coordinates
   to add, subtract, and scale (x, y) coordinates. We shorten the usage in
   most of the code by renaming this class `V` when it is imported using
   `import { V } from './model/Vector2';`

# Copyright

    Copyright 2019 Chris Cartland. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

