[Türkçesi için tıkla.](/README.tr.md)

# Scor Algorithm Project

One day while watching a tennis match at home, I was intrigued by the scoreboard. Then I wanted to write my own scoring algorithm. This project contains a use case of the algorithm I developed using `Typescript`.

![Algorithm](/algorithm.png)

## Equalization

In this scoring method, when a player's score is increased, if the player has not yet scored or is already ranked first, his score is increased as normal. However, if he is not ranked first and his increased score is equal to the first player's score before he increases his score, he decreases the first player's score instead of increasing his score. In this way the scores are equalized.

## Reduction

In this scoring method, before increasing a player's score, it is checked whether the scores of the other players are zero. If the scores of the other players are not zero, then before increasing that player's score, he decreases the scores of the other players and then increases his own score. In this way, a player's aim is to bring down the scores of the other players.

## Usage

[Player.ts](/class/Player.ts)
Represents the player. Takes a string as a parameter and sets the player's name. Returns the player's name, score and id.

```ts
const player = new Player("player 1");
```

[Scor.ts](/class/Scor.ts)
Represents the scoring system. As a parameter you can enter the type of scoring, the players and the number of increments.

```ts
const scor = new Scor(ScorType.EQUALIZATION, [player])
```

##### .add(player) function
Adds a new one to the players.

```ts
scor.add(player)
```

##### .up(player) function
Updates the given player's score.

```ts
scor.up(player)
```

##### .result() function
Returns the results.

```ts
scor.result()

interface Result {
  winner: Player | null;
  changeCount: number;
  syncCount: number;
  players: Player[];
}
```

- winner: Returns the winning player. Returns `null` if the result is tied.
- changeCount: Returns the number of times a change occurred.
- syncCount: Returns the number of times the value of the player whose value was increased was synchronized.
- players: Returns the players in order from first to last.

## Development

```
deno task start
```
