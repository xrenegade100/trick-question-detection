import Tagger from 'wink-pos-tagger';
import stem from 'wink-porter2-stemmer';
import nlp from 'wink-nlp-utils';
import ERRORS from '../error';

/**
 * This function takes a string and removes all the punctuation
 * returing a string with only words.
 * @param sentence The string to be cleaned.
 * @returns The cleaned string.
 * @throws Will throw an error if the string is empty
 */
const removePunctuation = (sentence: string) => {
  const tagger = new Tagger();

  let sentNoPunctuation = ` ${sentence}`.slice(1);

  const pos = tagger.tagSentence(sentence);

  // TODO: improve performance - avoid replaceAll if token was already removed
  for (let i = 0; i < pos.length; i += 1) {
    if (pos[i].tag === 'punctuation') {
      sentNoPunctuation = sentNoPunctuation.replaceAll(pos[i].value, '');
    }
  }

  return sentNoPunctuation;
};

/**
 * This function takes a string and stems all the words in it.
 * @param sentence The string to be stemmed.
 * @returns The stemmed string.
 * @throws Will throw an error if the string is empty
 */
const stemSentence = (sentence: string) => {
  const words = nlp.string.removeExtraSpaces(nlp.string.removeHTMLTags(sentence)).split(' ');
  let stemmedString = '';

  for (let i = 0; i < words.length; i += 1) {
    if (i === 0) stemmedString += `${stem(words[i])} `;
    else if (i !== 0 && i !== words.length - 1) {
      stemmedString += `${stem(words[i])} `;
    } else if (i === words.length - 1) stemmedString += stem(words[i]);
  }

  return stemmedString;
};

/**
 * This function takes a string and counts how many words it contains.
 * @param sentence The string to be counted.
 * @returns The number of words in the string.
 */
const countTokens = (sentence: string) => {
  const sentTokens = sentence.split(' ');
  return sentTokens.filter((parola) => parola !== '').length;
};

/**
 * E1
 * This function takes a string and checks if it includes some common patterns
 * @param sentence The string to be checked.
 * @returns True if the string includes some common patterns, false otherwise.
 * @throws Will throw an error if the string is empty
 */
const checkWords = (sentence: string) => {
  const WORDS = ['if you', "don't", 'do not'];
  const check = WORDS.find((word) => sentence.includes(word));
  if (check) return true;
  return false;
};

/**
 * E2
 * This function takes a string and counts how many keywords it contains.
 * @param sentence The string to be counted.
 * @returns The number of keywords in the string.
 */
const countKeywords = (sentence: string) => {
  let numKeywords = 0;
  const keywords = [
    'box',
    'tick',
    'uncheck',
    'receive',
    'email',
    'newsletter',
    'checkbox',
    'please',
    'discount',
    'benefit',
    'offer',
    'promotion',
    'receive',
    'special offer',
    'unsubscribe',
  ];

  keywords.forEach((element) => {
    if (sentence.includes(stem(element))) {
      numKeywords += 1;
    }
  });

  return numKeywords;
};

/**
 * This function takes a string and checks if it contains a comma.
 * @param sentence The string to be checked.
 * @returns True if the string contains a comma, false otherwise.
 */
const checkForComma = (sentence: string) => {
  if (sentence.includes(',')) return true;
  return false;
};

/**
 * This function takes a string and returns a confidence score in the range [0,1]
 * to determine wheter it is a `trick question` or not.
 * @param sentence The string to be checked.
 * @returns A confidence score.
 */
const isTrickQuestion = (sentence: string) => {
  if (sentence.trim().length === 0) throw new Error(ERRORS.EMPTY_STRING);

  const SCORES = {
    E1: 2,
    E2: 2,
    E3: 0.5,
    E4: 1.5,
  };
  let scoresTotal = 0;

  Object.values(SCORES).forEach((score) => {
    scoresTotal += score;
  });

  let score = 0;

  const sentNoPunctuation = removePunctuation(sentence);
  const stemmedSentence = stemSentence(sentNoPunctuation);
  const numWordsInSentence = countTokens(stemmedSentence);

  if (numWordsInSentence >= 11) score += SCORES.E4;

  if (checkWords(stemmedSentence)) score += SCORES.E1;

  if (countKeywords(stemmedSentence) >= 3) score += SCORES.E2;

  if (checkForComma(sentence)) score += SCORES.E3;
  return score / scoresTotal;
};
export default isTrickQuestion;
