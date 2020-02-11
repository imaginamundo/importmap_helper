import { BufReader } from "https://deno.land/std/io/bufio.ts";

export function createCmdReader() {
  // Create the reader for command line
  return new BufReader(Deno.stdin);
}

export async function waitCmdInput(stdinReader) {
  // Get the input value from command line
  const encoder = new TextEncoder();
  await Deno.stdout.write(encoder.encode("> "));
  return ((await stdinReader.readString("\n")) as string).trim();
}
