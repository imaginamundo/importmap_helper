import { bold } from 'https://deno.land/std/fmt/colors.ts';
import getConfig from '../config.ts';
import { listModules } from '../services/modules.ts';
import { createJson } from '../helpers/file.ts';

export default async function install(importmap, args) {
  const config = getConfig();
  const modules = await listModules();

  const isStandard = findOnStandard(args.module, modules.standard);
  if (isStandard) {
    console.log(`Standard module ${ args.module } found`);
    importmap.imports[ args.module ] = `${ config.path.standard }/${ args.module }/mod.ts`;
  }

  const isThirdParty = findOnThirdParty(args.module, modules.thirdParty);
  if (!isStandard && isThirdParty) {
    console.log(`Third party module ${ args.module } found`);
    importmap.imports[ args.module ] = `${ config.path.thirdParty }/${ args.module }/mod.ts`;
  }

  if (isStandard || isThirdParty) {
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
    return;
  }
  console.log('Module not found on standard or third party deno modules.');
}

function findOnStandard(moduleToInstall, standardModules) {
  const foundModule = standardModules.filter(standardModule => standardModule.name === moduleToInstall);
  return foundModule[0];
}

function findOnThirdParty(moduleToInstall, thidPartyModules) {
  return Object.keys(thidPartyModules).includes(moduleToInstall) && thidPartyModules[moduleToInstall];
}