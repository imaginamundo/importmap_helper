import { bold } from 'https://deno.land/std/fmt/colors.ts';

export async function list(importmap) {
  console.log(bold('Current modules on import map:'))
  console.table(importmap.imports);
};

export default list;