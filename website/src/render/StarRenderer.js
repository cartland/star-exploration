export class StarRenderer {

  drawStars = (context, stars) => {
    let cost = 0;
    for (const star of Object.values(stars)) {
      cost += this.drawStar(context, star);
    }
    return cost;
  }

  drawStar = (context, star) => {
    const position = star.position;
    const lastPosition = star.position.sub(star.velocity);
    const starVector = lastPosition.sub(position);
    const cost = this.drawStarLine(context, position, starVector, star.proximity);
    return cost;
  }

  drawStarLine = (context, position, starVector, proximity) => {
    // Parameters.
    const standardBrightProximity = 1 / 5000;
    const opacity = Math.max(0, proximity * standardBrightProximity);

    const standardSizeProximity = 1 / 10000;
    const minSize = 1;
    const maxSize = 5;
    const radius = Math.min(maxSize, Math.max(minSize, maxSize * proximity * standardSizeProximity));

    const lineEnd = position.add(starVector);
    // Draw.
    context.save();

    // Blue hint.
    context.beginPath();
    context.globalAlpha = opacity;
    context.strokeStyle = '#0000FF';
    context.lineWidth = radius + 2;
    context.moveTo(position.x, position.y);
    context.lineTo(lineEnd.x, lineEnd.y);
    context.stroke();
    // White star.
    context.beginPath();
    context.globalAlpha = opacity;
    context.strokeStyle = '#FFFFFF';
    context.lineWidth = radius;
    context.moveTo(position.x, position.y);
    context.lineTo(lineEnd.x, lineEnd.y);
    context.stroke();

    context.restore();
    return 2;
  }
}