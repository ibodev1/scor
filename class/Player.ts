class Player {
  id: string;
  name: string;
  score: number;

  constructor(name: string, initialScore = 0) {
    this.id = this.genId();
    this.name = name;
    this.score = initialScore;
  }

  private genId() {
    const strArr = [];
    for (let i = 0; i < 4; i++) {
      strArr.push(
        (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
      );
    }
    return strArr.join("-");
  }
}

export default Player;
