// deno-lint-ignore-file ban-ts-comment
import { useSignal, type Signal, effect } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import Player from "../class/Player.ts";
import Scor, { ScorType } from "../class/Scor.ts";

interface ScorAreaProps {
  players: Signal<Player[]>;
  scorType: ScorType;
}

export default function ScorArea({ players, scorType }: ScorAreaProps) {
  const playerName = useSignal("");
  const scor = useSignal<Scor>(new Scor(scorType, players.value));

  const addNewPlayer = (playerName: string) => {
    const newPlayer = new Player(playerName);
    players.value = [...players.value, newPlayer];
    scor.value.add(newPlayer);
  };

  const up = (player: Player) => {
    scor.value.up(player);
    players.value = [...scor.value.result().players];
  };

  return (
    <div class="m-2">
      <ul class="space-y-2 w-96">
        {scor.value.result().players.map((p) => {
          return (
            <li
              key={p.id}
              class="flex items-center justify-between w-full h-12 rounded-md bg-indigo-500 text-white overflow-hidden"
            >
              <div class="text-2xl font-bold px-4">{p.name}</div>
              <div class="flex items-center justify-end">
                <div class="w-auto min-w-[3rem] h-12 flex items-center justify-center font-bold text-4xl bg-purple-500">
                  {p.scor}
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
                scor.value.result().winner?.name +
                " Scor : " +
                scor.value.result().winner?.scor
            );
            console.log(scor.value.result());
          }}
        >
          Skor
        </Button>
      </div>
    </div>
  );
}
