import { bold, dim } from 'https://deno.land/std/fmt/colors.ts';
import { createCmdReader, waitCmdInput } from '../helpers/cmd_tools.ts';
import { createJson } from '../helpers/file.ts';

export default async function init() {
  const importmap = {
    imports: {}
  };

  const encoder = new TextEncoder();
  const impormapString = JSON.stringify(importmap, null, 2);
  const importmapEncoded = encoder.encode(impormapString);

  const commandReader = createCmdReader();

  console.log("If there's a importmap.json already created, this will overwrite the current.\n");
  console.log(`Do you want to create the import map anyway? ${ dim('Y/n') }`);
  const createImportmap = await waitCmdInput(commandReader) || 'y';

  if (createImportmap.toLowerCase() === 'y') {
    await createJson('importmap.json', importmapEncoded)
      .then(() => {
        console.log(bold('importmap.json created'));
      })
      .catch((err) => {
        console.log('Error creating importmap.json');
        console.log(err);
      });
  } else {
    console.log('importmap.json not created');
  }
}