# Star Exploration: Testing and Stability Plan

This document outlines a systematic plan to improve the test coverage, stability, and overall code quality of the Star Exploration project. The primary goal is to increase confidence that the application works as expected, with a strict requirement of no user-visible changes to behavior or appearance.

The plan is broken down into phases and steps. Each step should be completed in its own Pull Request, which must pass all CI checks before being merged.

---

### Phase 1: Foundational Unit Tests (Core Logic)

This phase focuses on testing the pure, reusable logic that the rest of the application depends on. These are the easiest and most critical tests to add first.

-   [x] **Step 1.1: Test the Vector Math (`Vector2.js`)**
    -   **Action:** Create `Vector2.test.js`.
    -   **Goal:** Write comprehensive unit tests for all methods (`add`, `sub`, `scale`, `size`). This ensures all position and velocity calculations are mathematically correct and reliable.

-   [ ] **Step 1.2: Test the Random Number Generation (`Random.js`)**
    -   **Action:** Create `Random.test.js`.
    -   **Goal:** Write unit tests to verify that the random number and integer generators produce values within the expected ranges.

---

### Phase 2: Business Logic Unit Tests

This phase tests the modules that contain the core "business logic" of the starfield simulation.

-   [ ] **Step 2.1: Test the Star State Management (`StarController.js`)**
    -   **Action:** Create `StarController.test.js`.
    -   **Goal:** Write unit tests to verify that the controller correctly adds, deletes, and updates stars. We will simulate the passage of time and check that star positions and velocities are updated according to the rules.

-   [ ] **Step 2.2: Test the Star Generation (`StarGenerator.js`)**
    -   **Action:** Create `StarGenerator.test.js`.
    -   **Goal:** Write unit tests to ensure the generator creates the correct number of stars with the expected properties. This will require "mocking" the `Random.js` utility so that the tests are deterministic and repeatable.

---

### Phase 3: Refactoring for Testability

The `GameCanvas.js` component currently mixes React lifecycle logic with the core animation loop logic. Separating these concerns will make the code cleaner and much easier to test.

-   [ ] **Step 3.1: Refactor the Animation Loop**
    -   **Action:** Create a new, plain JavaScript class or module (e.g., `src/animation/AnimationLoop.js`). Move the core animation logic (the `drawAnimationFrame` function and its related state like `lastUpdated`) from `GameCanvas.js` into this new module. The `GameCanvas.js` component will then simply create an instance of this `AnimationLoop` and start it.
    -   **Goal:** Isolate the animation logic from the React framework, improving separation of concerns. This is a pure refactoring step with no behavior change.

-   [ ] **Step 3.2: Test the Animation Loop**
    -   **Action:** Create `AnimationLoop.test.js`.
    -   **Goal:** Write unit tests for the new `AnimationLoop`. We can now test the animation logic in isolation, mocking `requestAnimationFrame` to simulate time passing and verifying that the controller, generator, and renderers are called correctly.

---

### Phase 4: Renderer and Component Testing

This phase focuses on ensuring the rendering logic and React components are behaving as expected.

-   [ ] **Step 4.1: Test the Renderers (`BackgroundRenderer.js`, `StarRenderer.js`)**
    -   **Action:** Create test files for each renderer.
    -   **Goal:** Using the existing `jest-canvas-mock` library, write tests that verify the renderers make the correct drawing calls to the canvas context (e.g., `fillRect`, `beginPath`, `moveTo`). These tests confirm the logic is executing, but do not verify the final visual output.

-   [ ] **Step 4.2: Enhance Component Tests (`App.js`, `GameCanvas.js`)**
    -   **Action:** Update the existing `App.test.js` and create `GameCanvas.test.js`.
    -   **Goal:** Use `@testing-library/react` to write more robust rendering tests. Verify that the components mount without errors and that the `<canvas>` element is successfully created and added to the DOM.

---

### Phase 5: Advanced Stability (Future Goals)

After completing the unit test foundation, these steps would provide the ultimate confidence in the "pixel-perfect" behavior of the application.

-   [ ] **Step 5.1: Introduce Visual Regression Testing**
    -   **Action:** Integrate a visual regression testing tool like Storybook with an addon (e.g., Storybook Visual Tests) or a dedicated service like Percy or Chromatic.
    -   **Goal:** This is the key to "pixel-perfect" validation. These tools take screenshots of your components and compare them against a baseline. The tests will fail if even a single pixel changes, giving you absolute confidence that visual behavior has not been altered.
