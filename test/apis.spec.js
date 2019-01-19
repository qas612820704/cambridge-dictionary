import fs from 'fs';
import path from 'path';
import nock from 'nock';
import { expect, use } from 'chai';
import { fetchExplanationHTML, WordNotFound } from '../src/apis';

nock.disableNetConnect();

use(require('chai-as-promised'));

describe('apis.fetchExplanationHTML', () => {
  // TODO: it should throw when word === ''

  it('should just work' /* TODO: when no option */, async () => {
    nock('https://dictionary.cambridge.org/dictionary/english')
      .get('/unicorn')
      .reply(200, fs.readFileSync(path.resolve(__dirname, 'unicorn.html')));

    await expect(fetchExplanationHTML('unicorn')).to.be.fulfilled;
  });

  it("should throw WordNotFound (ex: word === 'kerker')", async () => {
    nock('https://dictionary.cambridge.org/dictionary/english')
      .get('/kerker')
      .reply(302);

    await expect(fetchExplanationHTML('kerker')).to.be.rejectedWith(WordNotFound);
  });
});
