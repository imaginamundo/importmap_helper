import getConfig from '../config.ts';
import { requestJson } from '../helpers/request.ts';

export async function listModules() {
  const config = getConfig();

  const notAllowedThirdPartyModules = [
    'deno',
    'deno_gui',
    'deno_init'
  ];

  let [ standard, thirdParty ] = await Promise.all([
    requestJson(config.modules.standard),
    requestJson(config.modules.thirdParty)
  ]);

  // Remove markdown files from standard modules
  standard = standard.filter(moduleObject => !moduleObject.name.endsWith('.md'))

  // Remove not allowed modules on third party modules
  notAllowedThirdPartyModules.forEach(moduleName => {
    delete thirdParty[moduleName];
  });

  return {
    standard, 
    thirdParty
  };
}