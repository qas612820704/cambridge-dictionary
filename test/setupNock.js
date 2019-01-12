import nock from 'nock';
import fs from 'fs';
import path from 'path';

export default () => {
  nock.disableNetConnect();
  nock('https://dictionary.cambridge.org')
    .get('/dictionary/english/challenge')
    .reply(200, fs.readFileSync(path.resolve(__dirname, 'challenge.html')));
};
