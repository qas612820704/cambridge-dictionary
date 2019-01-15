import fetch from 'node-fetch';
import * as _ from './constants';

const DOMAIN = 'https://dictionary.cambridge.org';

class CambridgeFetchError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CambridgeFetchError';
  }
}

export class WordNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'WordNotFound';
  }
}

// https://dictionary.cambridge.org/dictionary/english/hello
export async function fetchExplanationHTML(word, options = {}) {
  const { from, to } = {
    from: _.ENGLISH,
    to: _.ENGLISH,
    ...options,
  };

  const language = (from !== to) ? `${from}-${to}` : from;

  const response = await fetch(`${DOMAIN}/dictionary/${language}/${word}`, { redirect: 'manual' });

  if (isRedirect(response.status)) throw new WordNotFound(word);

  if (!response.ok) throw new CambridgeFetchError('Fail when getDictionaryHTML.');

  return response.text();
}

export default {
  fetchExplanationHTML,
};

function isRedirect(code) {
  return code > 300 && code < 400;
}
