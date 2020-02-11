import { bold, dim } from 'https://deno.land/std/fmt/colors.ts';

export default function help(importmap, args) {
console.log(
`${ bold('Deno.js importmap.json utils') }

${ bold('Methods:') }
  --init            Create importmap.json
  --installed       List installed modules
  --install         Add module to importmap.json
  --uninstall       Remove module from importmap.json
  --list            List all standard modules from Deno
  --help            See methods list and command interface
  -ls               Alias to --list
  -h                Alias to --help

${ bold('Command interface:') }
  ${ 'Command'.padEnd(args.command.length) } ${ dim('Path') } *         ${ bold('Method') } *
$ ${ args.command } ${ dim('importmap.json')} ${ bold('--outdated') }

  * optional

If there is no ${ bold('path') }, will look in the folder that the command is executed.
If there is no ${ bold('method') }, will execute with help method.
`
);
}