import cheerio from 'cheerio';
import { TextDecoder } from 'util';

export function parseDictionaryHTML(html) {
  const $ = cheerio.load(html);
  const $dataRoot = $('#dataset-cald4');

  return $dataRoot.find('.entry-body__el').map((i, entry) => {
    const $entry = $(entry);
    return {
      pos: $entry.find('.posgram .pos').text(),
      pron_uk: $entry.find('.uk .ipa').text(),
      pron_us: $entry.find('.us .ipa').text(),
      senses: $entry.find('.sense-block').map((j, sense) => {
        const $sense = $(sense);
        return {
          guideWord: $sense.find('.guideword').children().first().text(),
          level: $sense.find('.epp-xref').text() || null,
          defination: clearRedendentSpaces($sense.find('.def').text()),
          examples: $sense.find('.examp')
            .map((k, example) => $(example).text()).get()
            .map(clearRedendentSpaces),
        };
      }).get(),
    };
  }).get();
}

function clearRedendentSpaces(text = '') {
  return text.replace(/[\s\n|\t]+/g, ' ');
}

export default {};
