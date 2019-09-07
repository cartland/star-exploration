import { V } from '../model/Vector2';

export class StarController {
  constructor() {
    this.stars = {};
    this.starCount = 0;
  }

  getStars = () => {
    return this.stars;
  }

  containsStar = (star) => {
    return star.key() in this.stars;
  }

  addStar = (star) => {
    this.stars[star.key()] = star;
    this.starCount++;
  }

  addStars = (stars) => {
    stars.forEach((star) => {
      this.addStar(star);
    });
  }

  deleteStar = (star) => {
    delete this.stars[star.key()];
    this.starCount--;
  }

  getStarCount = () => {
    return this.starCount;
  }

  updateStars = (currentTime, elapsed, gameSpeed, dimensions) => {
    elapsed = Math.min(30, elapsed);
    // Display information.
    const center = dimensions.scale(0.5);
    const maxRadius = center.size();
    for (const star of Object.values(this.stars)) {
      // Check if star should be deleted.
      const distance = star.position.sub(center).size();
      if (distance > maxRadius) {
        this.deleteStar(star);
        continue;
      }
      // Update proximity.
      const age = currentTime - star.creationTime;
      star.age = age;
      star.proximity = gameSpeed * age;
      // Calculate outward velocity.
      const pixelsPerMillisecondAtRadius = gameSpeed * 0.05 / maxRadius;
      const proximityFactor = 1 / 1000;
      let outwardVelocity = star.position.sub(center).scale(pixelsPerMillisecondAtRadius);
      let outwardSpeed = outwardVelocity.size();
      if (outwardSpeed === 0) {
        outwardVelocity = V(1, 0).scale(pixelsPerMillisecondAtRadius);
        outwardSpeed = pixelsPerMillisecondAtRadius;
      }
      const proximityMultiplier = 1 + proximityFactor * star.proximity;
      const proximityVelocity = outwardVelocity.scale(proximityMultiplier);
      const frameVelocity = proximityVelocity.scale(elapsed);
      star.velocity = frameVelocity;
      // Update position.
      star.position = star.position.add(star.velocity);
    }
  }
}
