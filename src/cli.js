import program from 'commander';
import chalk from 'chalk';
import wrap from 'word-wrap';
import { version } from '../package.json';
import { parseDictionaryHTML } from './parser';
import { getDictionaryHTML } from './apis';

import setupNock from '../test/setupNock';

setupNock();

let word;
program
  .version(version, '-v, --version')
  .option('--verb', 'Only shows the verb meaning of word')
  .option('--noun', 'Only shows the noun meaning of word')
  .option('--adj', 'Only shows the noun meaning of word')
  .arguments('<word>')
  .action((w) => { word = w; })
  .parse(process.argv);

if (!word) process.exit(0);

getDictionaryHTML(word)
  .then(parseDictionaryHTML)
  .then(printDictionary);

function print(text = '', options = {}) {
  const { indent, trimStart, end } = {
    indent: 0,
    trimStart: false,
    end: '\n',
    ...options,
  };

  const wrappedText = wrap(text, {
    indent: ' '.repeat(indent),
    width: process.stdout.columns - indent * 2,
  });

  const trimedText = trimStart ? wrappedText.trimLeft() : wrappedText;

  process.stdout.write(trimedText + end);
}

function printDictionary(posgrams = []) {
  if (posgrams.length > 1) {
    print();
    const allPosString = posgrams.map(g => chalk.bgWhite.black(` ${g.pos}. `)).join(' ');
    print(`${chalk.bold(word)} ${allPosString}`);
  }
  print();
  posgrams.forEach(({
    pos, ipa_us: ipaUS, senses,
  }, i) => {
    print(`${chalk.bold(word)} ${chalk.bgWhite.black(` ${pos}. `)} /${ipaUS}/`);
    print();
    senses.forEach(({ definations }) => {
      definations.forEach(({
        level, domain, text, examples,
      }, j) => {
        print(chalk.bgYellow.black('  Defination:  '), { indent: 2, end: '' });
        print(domain ? chalk.bgWhite.black(` [${domain}] `) : '', { end: '' });
        print(level ? ` [${level}] ` : '');
        print();
        print(text, { indent: 4 });
        print();
        if (examples.length > 0) {
          print(`${chalk.bgCyan.black('  Examples:  ')}`, { indent: 2 });
          print();
        }
        examples.forEach(
          (example) => {
            const highlightedExample = example.replace(new RegExp(word, 'g'), chalk.bold.underline.white(word));
            print('- ', { indent: 2, end: '' });
            print(highlightedExample, { indent: 4, trimStart: true });
            print();
          },
        );
      });

    });
  });
}
