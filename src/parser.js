import cheerio from 'cheerio';

export function parseSenseHTML(html) {
  const $ = cheerio.load(html);
  const $dataRoot = $('#dataset-cald4');

  return $dataRoot.find('.entry-body__el').map((i, entry) => {
    const $entry = $(entry);
    return {
      pos: $entry.find('.posgram').text(),
      ipa_uk: $entry.find('.uk .ipa').text(),
      ipa_us: $entry.find('.us .ipa').text(),
      senses: $entry.find('.sense-block').map((j, sense) => {
        const $sense = $(sense);
        return {
          guideWord: $sense.find('.guideword').children().first().text(),
          definations: $sense.find('.def-block').map((k, defBlock) => {
            const $defBlock = $(defBlock);
            const $defHead = $defBlock.find('.def-head');
            const $defBody = $defBlock.find('.def-body');
            return {
              level: $defHead.find('.epp-xref').text(),
              domain: $defHead.find('.domain').text(),
              text: clearRedendentSpaces($defHead.find('.def').text()),
              examples: $defBody.find('.examp')
                .map((l, example) => $(example).text()).get()
                .map(text => text.trim())
                .map(clearRedendentSpaces),
            };
          }).get(),
        };
      }).get(),
    };
  }).get();
}

function clearRedendentSpaces(text = '') {
  return text.replace(/[\s\n|\t]+/g, ' ');
}

export default {};
