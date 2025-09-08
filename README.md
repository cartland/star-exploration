# Star Exploration

A simple and mesmerizing 2D starfield animation built with React and HTML5 Canvas. This project simulates flying through space, with stars emerging from the center of the screen and accelerating outwards, creating a "warp speed" visual effect.

The animation is deployed and viewable at: **[star-exploration.web.app](https://star-exploration.web.app/)**

![Star Exploration Screenshot](https://raw.githubusercontent.com/cartland/star-exploration/main/website/public/screenshot.png)

*(Note: You can replace this with an animated GIF to better capture the effect!)*

## Features

-   **Infinite Starfield:** Procedurally generates stars for a continuous animation.
-   **Dynamic Speed:** The flight speed dynamically changes, creating periods of acceleration and deceleration for a more engaging visual experience.
-   **Responsive Canvas:** The animation canvas resizes to fill the entire browser viewport.

## Technology Stack

-   **React:** For component-based UI structure.
-   **HTML5 Canvas:** For rendering the 2D graphics.
-   **JavaScript (ES6+):** For the core application logic.
-   **Firebase Hosting:** For easy deployment of the static website.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need [Node.js](https://nodejs.org) (and [npm](https://www.npmjs.com/)) installed on your system.

### Installation & Running Locally

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/cartland/star-exploration.git
    cd star-exploration/website
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```
    *Note: This project was created with an older version of `react-scripts`. If you are using a recent version of Node.js (v17+), you may need to update `react-scripts` to resolve potential issues: `npm add react-scripts@latest`.*

3.  **Run the development server:**
    ```sh
    npm start
    ```
    This will open the application in your default browser at [http://localhost:3000](http://localhost:3000).

### Available Scripts

-   `npm start`: Runs the app in development mode.
-   `npm test`: Launches the test runner.
-   `npm build`: Builds the app for production to the `build` folder.

## Deployment

This project is configured for easy deployment using [Firebase Hosting](https://firebase.google.com/docs/hosting).

1.  **Install the Firebase CLI:**
    ```sh
    npm install -g firebase-tools
    ```

2.  **Set your Firebase Project ID:**
    ```sh
    # Example: firebase use --add star-exploration
    firebase use --add YOUR_FIREBASE_PROJECT_ID
    ```

3.  **Build the project:**
    ```sh
    npm build
    ```

4.  **Deploy to Firebase:**
    ```sh
    firebase deploy
    ```

## License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for details.
