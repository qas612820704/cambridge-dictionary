import { fetchExplanationHTML } from './apis';
import { parseSenseHTML } from './parser';

//  TODO: options
export async function getExplanation(word) {
  const explanationHTML = await fetchExplanationHTML(word);
  const explanations = parseSenseHTML(explanationHTML);
  return {
    word,
    explanations,
  };
}

export default {
  getExplanation,
};
