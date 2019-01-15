import program from 'commander';
import ora from 'ora';
import { version } from '../package.json';
import { parseSenseHTML } from './parser';
import { fetchExplanationHTML, WordNotFound } from './apis';
import { printExplanationJson } from './ultis/print';

let word;
program
  .version(version, '-v, --version')
  .option('--verb', 'Only shows specefic part of speach meaning')
  .option('--noun', 'Only shows specefic part of speach meaning')
  .option('--adj', 'Only shows specefic part of speach meaning')
  .option('--conjunction', 'Only shows specefic part of speach meaning')
  .arguments('<word>')
  .action((w) => { word = w; })
  .parse(process.argv);

if (!word) process.exit(0);

main();

async function main() {
  const spinner = ora(`Searching "${word}"...`).start();

  let senseJson;
  try {
    const html = await fetchExplanationHTML(word);
    senseJson = {
      word,
      explanations: parseSenseHTML(html),
    };
  } catch (e) {
    if (e instanceof WordNotFound) {
      spinner.fail(`"${word}" not founded!`);
      return;
    }
    spinner.fail('Something went wrong!');
    return;
  }

  spinner.succeed();

  printExplanationJson(senseJson);
}
