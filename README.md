# Star Exploration Web Animation

Star Exploration is an HTML website. It can be served as a static web page.

This was deployed to https://star-exploration.web.app with Firebase Hosting.

# Dependencies

1. Install Node.js, npm

    * [https://nodejs.org](https://nodejs.org)

1. Install Firebase CLI

    * [https://firebase.google.com/docs/cli/](https://firebase.google.com/docs/cli/)

# Run website locally

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

* `website/public/index.html`: Main HTML page.
* `website/src/App.js`: Create the React game canvas.
* `website/src/GameCanvas.js`: Most of the website logic is in this file.
* Files that render and draw the graphics
  * `website/src/render/BackgroundRenderer.js`
  * `website/src/render/StarRenderer.js`
* Star update logic
  * `website/src/controller/StarController.js`
* Generate random stars
  * `website/src/generator/StarGenerator.js`
* Data models
  * `website/src/model/Star.js`: Star information
  * `website/src/model/Vector2.js`: We do math with (x, y) coordinates
   to add, subtract, and scale (x, y) coordinates. We shorten the usage in
   most of the code by renaming this class `V` when it is imported using
   `import { V } from './model/Vector2';`
