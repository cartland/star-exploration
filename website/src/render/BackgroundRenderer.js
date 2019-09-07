export class BackgroundRenderer {

  drawBackground = (context, dimensions) => {
    context.save();
    context.fillStyle = '#000000';
    context.fillRect(0, 0, dimensions.x, dimensions.y);
    context.restore();
  }
}
