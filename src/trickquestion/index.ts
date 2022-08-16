import Tagger from "wink-pos-tagger";
import ERRORS from "../error/";
const stem = require("wink-porter2-stemmer");
const nlp = require("wink-nlp-utils");

/**
 * This function takes a string and removes all the punctuation and returns a string with only the words.
 * @param sentence The string to be cleaned.
 * @returns The cleaned string.
 * @throws Will throw an error if the string is empty
 */
const removePunctuation = (sentence: string) => {
    if (sentence.trim().length === 0)
        throw new Error(ERRORS.EMPTY_STRING_PUNCTUATION);
    const tagger = new Tagger();

    let sentNoPunctuation = (" " + sentence).slice(1);

    const pos = tagger.tagSentence(sentence);

    //in realtà si potrebbe migliorare se tipo togliamo la virgola una volta non controlliamo se ce ne sta un altra dopo
    for (let i = 0; i < pos.length; i++) {
        if (pos[i].tag === "punctuation") {
            sentNoPunctuation = sentNoPunctuation.replaceAll(pos[i].value, "");
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
    if (sentence.trim().length === 0)
        throw new Error(ERRORS.EMPTY_STRING_STEMMED);
    const words = nlp.string
        .removeExtraSpaces(nlp.string.removeHTMLTags(sentence))
        .split(" ");
    let stemmedString = "";

    for (let i = 0; i < words.length; i++) {
        if (i === 0) stemmedString += stem(words[i]) + " ";
        else if (i !== 0 && i !== words.length - 1)
            stemmedString += stem(words[i]) + " ";
        else if (i === words.length - 1) stemmedString += stem(words[i]);
    }

    return stemmedString;
};

/**
 * This function takes a string and counts how many words it contains.
 * @param sentence The string to be counted.
 * @returns The number of words in the string.
 */
const countTokens = (sentence: string) => {
    const sentTokens = sentence.split(" ");
    return sentTokens.filter((parola) => parola !== "").length;
};

/**
 * E1
 * This function takes a string and checks if it includes some common patterns
 * @param sentence The string to be checked.
 * @returns True if the string includes some common patterns, false otherwise.
 * @throws Will throw an error if the string is empty
 */
const checkWords = (sentence: string) => {
    if (sentence.trim().length === 0)
        throw new Error(ERRORS.EMPTY_STRING_CHECKWORDS);
    const WORDS = ["if you", "don't", "do not"];
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
        "box",
        "tick",
        "uncheck",
        "receive",
        "email",
        "newsletter",
        "checkbox",
        "please",
        "discount",
        "benefit",
        "offer",
        "promotion",
        "receive",
        "special offer",
        "unsubscribe"
    ];

    keywords.forEach((element) => {
        if (sentence.includes(stem(element))) {
            numKeywords++;
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
    if (sentence.includes(",")) return true;
    return false;
};

/**
 * This function takes a string and give a confidence score to determine if it is a trick question or not.
 * @param sentence The string to be checked.
 * @returns A confidence score.
 */
const isTrickQuestion = (sentence: string) => {
    const SCORES = {
        E1: 2,
        E2: 2,
        E3: 0.5,
        E4: 1.5
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
