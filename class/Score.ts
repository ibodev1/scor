import Player from "./Player.ts";

export interface Result {
  winner: Player | null;
  changeCount: number;
  syncCount: number;
  players: Player[];
}

export enum ScoreType {
  EQUALIZATION = 0,
  REDUCTION = 1,
}

class Score {
  players: Player[];
  changeCount: number;
  syncCount: number;
  scoreType: ScoreType;
  count: number;

  constructor(
    scoreType: ScoreType = ScoreType.EQUALIZATION,
    players: Player[] = [],
    count = 1,
  ) {
    this.players = players;
    this.scoreType = scoreType;
    this.changeCount = 0;
    this.syncCount = 0;
    this.count = count;
  }

  public add(player: Player) {
    if (player instanceof Player) this.players.push(player);
  }

  public up(player: Player, count = this.count) {
    const findedPlayer = this.players.find((p) => p === player);
    if (findedPlayer) {
      switch (this.scoreType) {
        case ScoreType.EQUALIZATION:
          this.equalization(findedPlayer, count);
          break;
        case ScoreType.REDUCTION:
          this.reduction(findedPlayer, count);
          break;
      }
      this.changeCount += 1;
    }
  }

  public result(): Result {
    return {
      winner: this.getTopPlayer(),
      changeCount: this.changeCount,
      syncCount: this.syncCount,
      players: this.players.sort((a, b) => b.score - a.score),
    };
  }

  private getTopPlayer(): Player | null {
    const isScoreless = this.players.every((p, _i, arr) =>
      p.score === arr[0].score
    );
    if (isScoreless) return null;
    const winner = this.players.reduce((player, currentPlayer) => {
      return currentPlayer.score > player.score ? currentPlayer : player;
    });
    if (
      this.players.filter((p) => p !== winner).findIndex((p) =>
        p.score === winner.score
      ) >= 0
    ) return null;
    return winner;
  }

  private equalization(player: Player, count = this.count) {
    const winner = this.getTopPlayer();
    if (winner && player !== winner && player.score + count === winner.score) {
      winner.score -= count;
      this.syncCount += 1;
    } else {
      player.score += count;
    }
    return player;
  }

  private reduction(player: Player, count = this.count) {
    const winner = this.getTopPlayer();
    for (const p of this.players) {
      if (p !== player && p.score !== 0) {
        p.score -= count;
      } else if (player === p) {
        player.score += count;
        if (winner && player !== winner && player.score === winner.score) {
          this.syncCount += 1;
        }
      }
    }

    return player;
  }
}

export default Score;
