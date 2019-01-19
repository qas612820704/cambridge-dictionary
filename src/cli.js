import yargs from 'yargs';
import ora from 'ora';
import { getExplanation } from './CambridgeDictionary';
import { WordNotFound } from './apis';
import { printExplanation } from './ultis/print';

yargs
  .demandCommand(1)
  .command('<word>', 'Check word meaning in dictionary', (yarg) => {
    yarg
      .positional('word', {
        describe: 'the word you want to search in cambridge dictionary',
      });
  });

main(yargs.argv);

async function main({ _: [word] }) {
  const spinner = ora(`Searching "${word}"...`).start();

  let explanation;
  try {
    explanation = await getExplanation(word);
  } catch (e) {
    if (e instanceof WordNotFound) {
      spinner.fail(`"${word}" not founded!`);
      return;
    }
    spinner.fail('Something went wrong!');
    return;
  }

  spinner.succeed();

  printExplanation(explanation);
}
