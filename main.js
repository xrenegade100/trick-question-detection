const posTagger = require("wink-pos-tagger");
const stem = require("wink-porter2-stemmer");
const nlp = require("wink-nlp-utils");

const arrayParole = [
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
  "unsubscribe",
];

let contatore = 0;
let contatoreParole = 0;
let contatoreVerbi = 0;

const stringaInput =
  "If you DON'T want to receive these emails, please tick this box.";

const tagger = posTagger();

let stringaSenzaPunteggiatura = (" " + stringaInput).slice(1);

const analisi = tagger.tagSentence(stringaInput);

//in realtà si potrebbe migliorare se tipo togliamo la virgola una volta non controlliamo se ce ne sta un altra dopo
for (let k = 0; k < analisi.length; k++) {
  if (analisi[k].tag === "punctuation") {
    stringaSenzaPunteggiatura = stringaSenzaPunteggiatura.replaceAll(
      analisi[k].value,
      ""
    );
  }
}

const words = stringaSenzaPunteggiatura.split(" ");
let stemmedString = "";

for (let i = 0; i < words.length; i++) {
  if (i === 0) stemmedString += stem(words[i]) + " ";
  else if (i !== 0 && i !== words.lenght - 1)
    stemmedString += stem(words[i]) + " ";
  else if (i === words.length - 1) stemmedString += stem(words[i]);
}

const stringhePerContareParole = stemmedString.split(" ");

const numeroParoleFrase = stringhePerContareParole.filter(
  (parola) => parola !== ""
).length;

if (numeroParoleFrase >= 11) contatore += 1.5;

if (
  stemmedString.includes("if you") ||
  stemmedString.includes("don't") ||
  stemmedString.includes("do not")
) {
  contatore += 2;
}

arrayParole.forEach((element) => {
  if (stemmedString.includes(stem(element))) {
    contatoreParole++;
  }
});

if (contatoreParole >= 3) contatore += 2;

if (stringaInput.includes(",")) {
  contatore += 0.5;
}

// togliere tipo do you want to go che prende sia want e go (deve essere preso solo un verbo)
/*
for (let k = 0; k < analisiStemmed.length; k++) {
  if (
    analisiStemmed[k].pos.includes("VB") &&
    analisiStemmed[k].value !== "do"
  ) {
    contatoreVerbi++;
  }
}
*/

if (contatoreVerbi >= 2) contatore += 3;

console.log("contatore: " + contatore);
let media = contatore / 6;
console.log("media: " + media);
