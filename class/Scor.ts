import Player from "./Player.ts";

export interface Result {
  winner: Player | null;
  changeCount: number;
  syncCount: number;
  players: Player[];
}

export enum ScorType {
  EQUALIZATION = 0,
  REDUCTION = 1,
}

class Scor {
  players: Player[];
  changeCount: number;
  syncCount: number;
  scorType: ScorType;
  count: number;

  constructor(
    scorType: ScorType = ScorType.EQUALIZATION,
    players: Player[] = [],
    count = 1,
  ) {
    this.players = players;
    this.scorType = scorType;
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
      switch (this.scorType) {
        case ScorType.EQUALIZATION:
          this.equalization(findedPlayer, count);
          break;
        case ScorType.REDUCTION:
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
      players: this.players.sort((a, b) => b.scor - a.scor),
    };
  }

  private getTopPlayer(): Player | null {
    const isScoreless = this.players.every((p, _i, arr) =>
      p.scor === arr[0].scor
    );
    if (isScoreless) return null;
    const winner = this.players.reduce((player, currentPlayer) => {
      return currentPlayer.scor > player.scor ? currentPlayer : player;
    });
    if (
      this.players.filter((p) => p !== winner).findIndex((p) =>
        p.scor === winner.scor
      ) >= 0
    ) return null;
    return winner;
  }

  private equalization(player: Player, count = this.count) {
    const winner = this.getTopPlayer();
    if (winner && player !== winner && player.scor + count === winner.scor) {
      winner.scor -= count;
      this.syncCount += 1;
    } else {
      player.scor += count;
    }
    return player;
  }

  private reduction(player: Player, count = this.count) {
    const winner = this.getTopPlayer();
    for (const p of this.players) {
      if (p !== player && p.scor !== 0) {
        p.scor -= count;
      } else if (player === p) {
        player.scor += count;
        if (winner && player !== winner && player.scor === winner.scor) {
          this.syncCount += 1;
        }
      }
    }

    return player;
  }
}

export default Scor;
