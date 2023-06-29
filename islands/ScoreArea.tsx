// deno-lint-ignore-file ban-ts-comment
import { useSignal, type Signal, effect } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import Player from "../class/Player.ts";
import Score, { ScoreType } from "../class/Score.ts";

interface ScoreAreaProps {
  players: Signal<Player[]>;
  scoreType: ScoreType;
}

export default function ScoreArea({ players, scoreType }: ScoreAreaProps) {
  const playerName = useSignal("");
  const score = useSignal<Score>(new Score(scoreType, players.value));

  const addNewPlayer = (playerName: string) => {
    const newPlayer = new Player(playerName);
    players.value = [...players.value, newPlayer];
    score.value.add(newPlayer);
  };

  const up = (player: Player) => {
    score.value.up(player);
    players.value = [...score.value.result().players];
  };

  return (
    <div class="m-2">
      <ul class="space-y-2 w-96">
        {score.value.result().players.map((p) => {
          return (
            <li
              key={p.id}
              class="flex items-center justify-between w-full h-12 rounded-md bg-indigo-500 text-white overflow-hidden"
            >
              <div class="text-2xl font-bold px-4">{p.name}</div>
              <div class="flex items-center justify-end">
                <div class="w-auto min-w-[3rem] h-12 flex items-center justify-center font-bold text-4xl bg-purple-500">
                  {p.score}
                </div>
                <button
                  class="w-12 h-12 text-2xl font-semibold bg-red-500"
                  onClick={() => up(p)}
                >
                  up
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div class="my-2">
        <input
          type="text"
          name="playerName"
          id="playerName"
          placeholder="Player Name"
          class="border border-gray-100 rounded-md mr-2 px-2 py-1"
          //@ts-ignore
          onInput={(e) => (playerName.value = e.target?.value ?? "")}
        />
        <Button onClick={() => addNewPlayer(playerName.value)}>
          Add Player
        </Button>
        <Button
          onClick={() => {
            alert(
              "Winner! " +
                score.value.result().winner?.name +
                " Score : " +
                score.value.result().winner?.score
            );
            console.log(score.value.result());
          }}
        >
          Skor
        </Button>
      </div>
    </div>
  );
}
