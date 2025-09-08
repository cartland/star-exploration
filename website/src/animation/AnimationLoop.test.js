import { AnimationLoop } from './AnimationLoop';

describe('AnimationLoop', () => {
  let animationLoop;
  let canvas, starGenerator, starController, backgroundRenderer, starRenderer;
  let requestAnimationFrameSpy;

  beforeEach(() => {
    canvas = {
      current: {
        getContext: jest.fn().mockReturnValue({}),
        width: 800,
        height: 600,
      },
    };
    starGenerator = { generateStars: jest.fn().mockReturnValue([]) };
    starController = {
      addStars: jest.fn(),
      updateStars: jest.fn(),
      getStars: jest.fn().mockReturnValue([]),
    };
    backgroundRenderer = { drawBackground: jest.fn() };
    starRenderer = { drawStars: jest.fn() };

    animationLoop = new AnimationLoop(
      canvas,
      starGenerator,
      starController,
      backgroundRenderer,
      starRenderer
    );

    requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      // Do not call the callback automatically
      return 1; // Return a mock request ID
    });
  });

  afterEach(() => {
    requestAnimationFrameSpy.mockRestore();
  });

  it('should exist', () => {
    expect(AnimationLoop).toBeDefined();
  });

  it('should request an animation frame when started', () => {
    animationLoop.start();
    expect(requestAnimationFrameSpy).toHaveBeenCalledWith(animationLoop.drawAnimationFrame);
  });

  it('should update and draw a frame when time passes', () => {
    // Start the loop
    animationLoop.start();

    // Simulate the first frame
    animationLoop.drawAnimationFrame(100);

    // Expectations for the first frame
    expect(starGenerator.generateStars).toHaveBeenCalled();
    expect(starController.addStars).toHaveBeenCalled();
    expect(starController.updateStars).toHaveBeenCalled();
    expect(backgroundRenderer.drawBackground).toHaveBeenCalled();
    expect(starRenderer.drawStars).toHaveBeenCalled();

    // Simulate the second frame
    animationLoop.drawAnimationFrame(200);

    // Expectations for the second frame
    expect(starGenerator.generateStars).toHaveBeenCalledTimes(2);
    expect(starController.addStars).toHaveBeenCalledTimes(2);
    expect(starController.updateStars).toHaveBeenCalledTimes(2);
    expect(backgroundRenderer.drawBackground).toHaveBeenCalledTimes(2);
    expect(starRenderer.drawStars).toHaveBeenCalledTimes(2);
  });
});
