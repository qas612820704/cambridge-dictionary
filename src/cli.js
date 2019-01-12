import program from 'commander';
import { version } from '../package.json';
import { parseDictionaryHTML } from './parser';
import * as apis from './apis';

program
  .version(version, '-v, --version')
  .command('[word]')
  .parse(process.argv);

console.log(program.word);
