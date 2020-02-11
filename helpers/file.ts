import { bold, red } from "https://deno.land/std/fmt/colors.ts";

export async function getJson(path) {
  const file = await Deno.readFile(path)
    .catch(() => {
      console.log(bold(red("File not found.")));
      return Deno.exit(0);
    });

  const text = new TextDecoder("utf-8").decode(file);

  let data;

  try {
    data = JSON.parse(text);
  } catch(err) {
    console.log(bold(red("Failed to parse JSON.")));
    return Deno.exit(0);
  }

  return data;
}

export async function createJson(path, content) {
  return Deno.writeFile(path, content)
}