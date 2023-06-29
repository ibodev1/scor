import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Score App</title>
      </Head>
      <main class="container mx-auto">
        <a href="/equalization" class="underline text-indigo-500 hover:text-indigo-600 p-2">equalization</a>
        <a href="/reduction" class="underline text-indigo-500 hover:text-indigo-600 p-2">reduction</a>
      </main>
    </>
  );
}
