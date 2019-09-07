export class Star {
  static count = 0;
  constructor(position, velocity, creationTime) {
    if (typeof creationTime !== 'number') {
      throw new Error('Creation time must be a number')
    }
    this._key = Star.count++;
    this.position = position;
    this.velocity = velocity;
    this.age = 0;
    this.proximity = 0;
    this.creationTime = creationTime;
  }

  key = () => {
    return this._key;
  }
}
