import { bold, dim } from 'https://deno.land/std/fmt/colors.ts';
import { listModules } from '../services/modules.ts';

export async function list() {

  const modules = await listModules();

  console.log(bold('Standard modules:\n'));
  console.log(`${ formatStandardModules(modules.standard) }`);
  console.log('');
  console.log(bold('Third Party modules:\n'));
  console.log(`${ formatThirdPartyModules(modules.thirdParty) }`);
}

function formatStandardModules(modules) {
  return modules
    .map(module => {
      return `• ${ bold(module.name) } \n${ module.html_url }\n`;
    })
    .join('\n');
}

function formatThirdPartyModules(modules) {
  return Object.keys(modules)
    .map(module => {
      return `• ${ bold(module) }: ${ dim(modules[module].desc || '') }  \n${ createRepoUrl(modules[module]) }\n`;
    })
    .join('\n');
}

function createRepoUrl(module) {
  return `https://${ module.type }.com/${ module.owner }/${ module.repo }`;
}

export default list;