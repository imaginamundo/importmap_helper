import { bold } from 'https://deno.land/std/fmt/colors.ts';
import { createJson } from '../helpers/file.ts';

export default async function uninstall(importmap, args) {
  const modules = Object.keys(importmap.imports);
  if (modules.includes(args.module)) {
    delete importmap.imports[args.module];

    const encoder = new TextEncoder();
    const impormapString = JSON.stringify(importmap, null, 2);
    const importmapEncoded = encoder.encode(impormapString);

    createJson(args.path, importmapEncoded)
      .then(() => {
        console.log(bold('importmap.json updated'));
      })
      .catch((err) => {
        console.log('Error updating importmap.json');
        console.log(err);
      });
  }
  console.log(`Module ${ args.module } not found on importmap.json`);
}