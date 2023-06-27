import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import ScorArea from "../islands/ScorArea.tsx";
import Player from "../class/Player.ts";
import { ScorType } from "../class/Scor.ts";

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
        <title>Scor App</title>
      </Head>
      <main class="container mx-auto">
        <h1 class="text-4xl font-bold my-4 mx-2 uppercase">{props.params.type}</h1>
        <ScorArea players={players} scorType={props.params.type === "reduction" ? ScorType.REDUCTION : ScorType.EQUALIZATION} />
      </main>
    </>
  );
}
