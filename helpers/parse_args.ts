import { bold } from 'https://deno.land/std/fmt/colors.ts';

export function parseArgs(possibleMethods) {
  const args = {
    command: 'importmap_helper',
    path: './importmap.json',
    method: '-h',
    importmap: true,
    module: null
  };


  const methodCount = [];

  // Verify each argument passed to command to run application
  Deno.args.forEach((arg, index) => {
    if (arg.includes(".json")) args.path = arg;
    if (arg.startsWith("-")) {
      args.method = arg;
      methodCount.push(arg);
      if (arg === '--install' || arg === '--uninstall') {
        if (!Deno.args[index + 1]) {
          console.log('Add module to install after the method, like:\n');
          console.log(`$ ${ args.command } -i ${ bold('module_name') }\n`);
          Deno.exit(1);
        }
        args.module = Deno.args[index + 1];
      }
    }
  });

  // Validation to not verify importmap file
  if (
    args.method === '-h' ||
    args.method === '--help' ||
    args.method === '--init'
  ) {
    args.importmap = false;
  }

  // Verify if there is more than one method
  if (methodCount.length > 1) {
console.log(
`
You can only send one method at time, you sent:
${ bold(methodCount.join(', ')) }.
`);
  Deno.exit(1);
  }

  // Verify if method is possible
  if (!possibleMethods.includes(args.method)) {
console.log(
`
Method ${ bold(args.method) } not found.

Try executing without it to see all the options available.
`);
    Deno.exit(1);
  }

  return args;
}
