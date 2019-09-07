import { Star } from "../model/Star";
import { V } from '../model/Vector2';

import { Random } from '../util/Random';

export class StarGenerator {
  constructor() {
    this.prng = null;
  }

  generateStars = (currentTime, elapsed, gameSpeed, dimensions) => {
    elapsed = Math.min(30, elapsed);
    if (this.prng == null) {
      this.prng = new Random(currentTime);
    }
    const count = gameSpeed * elapsed / 10;
    const stars = [];
    for (let i = 0; i < count; i++) {
      // Pick radius and angle.
      const prng = this.prng;
      const x = dimensions.x * prng.nextFloat();
      const y = dimensions.y * prng.nextFloat();
      const position = V(x, y);
      // Calculate velocity.
      const velocity = V(0, 0);
      const star = new Star(position, velocity, currentTime);
      stars.push(star);
    }
    return stars;
  }
}
