import chalk from 'chalk';
import wrap from 'word-wrap';

export function print(text = '', options = {}) {
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

export function printExplanation({ word = '', explanations = [] }) {
  const posLength = explanations.length;

  print();
  explanations.forEach(({
    pos, ipa_us: ipaUS, senses,
  }, i) => {
    if (posLength > 1) {
      print(`[${i + 1}/${posLength}] `, { end: '' });
    }
    print(`${chalk.bold(word)} /${ipaUS}/ ${chalk.bgWhite.black(` ${pos}. `)}`);
    print();
    senses.forEach(({ definations }) => {
      definations.forEach(({
        level, domain, text, examples,
      }) => {
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
            const highlightedExample = example.replace(new RegExp(word, 'gi'), w => chalk.bold.underline.white(w));
            print('- ', { indent: 2, end: '' });
            print(highlightedExample, { indent: 4, trimStart: true });
            print();
          },
        );
      });
    });
  });
}

export default {
  print,
  printExplanation,
};
