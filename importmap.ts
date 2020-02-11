import { parseArgs } from "./helpers/parse_args.ts";
import { getJson } from "./helpers/file.ts";

import init from './methods/init.ts';
import install from './methods/install.ts';
import uninstall from './methods/uninstall.ts';
import installed from './methods/installed.ts';
import list from './methods/list.ts';
import help from './methods/help.ts';

console.clear();

const methods = {
  '--init': init,
  '--install': install,
  '--uninstall': uninstall,
  '--installed': installed,
  '--list': list,
  '-ls': list,
  '--help': help,
  '-h': help
};
const possibleMethods = Object.keys(methods);
const args = parseArgs(possibleMethods);
let importmap = {};

if (args.importmap) {
  importmap = await getJson(args.path);
}

const method = methods[args.method];
method(importmap, args);