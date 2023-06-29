import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import ScoreArea from "../islands/ScoreArea.tsx";
import Player from "../class/Player.ts";
import { ScoreType } from "../class/Score.ts";

interface TypeProps {
  params: {
    type: string;
  };
}

export default function Type(props: TypeProps) {
  const players = useSignal<Player[]>([]);
  return (
    <>
      <Head>
        <title>Score App</title>
      </Head>
      <main class="container">
        <div class="text-center flex items-center justify-center flex-col">
          <h1 class="text-4xl font-bold my-4 mx-2 uppercase">
            {props.params.type}
          </h1>
          <ScoreArea
            players={players}
            scoreType={
              props.params.type === "reduction"
                ? ScoreType.REDUCTION
                : ScoreType.EQUALIZATION
            }
          />
        </div>
      </main>
    </>
  );
}
