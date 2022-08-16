import isTrickQuestion from "./trickquestion";
import getSentencesFromHtmlPage from "./dom";

(async () => {
    const sentences = await getSentencesFromHtmlPage(
        "https://www.very.co.uk/account/checkoutregister.page?"
    );
    const results: { sentence: string; score: number }[] = [];
    sentences.forEach((sentence) => {
        results.push({
            sentence: sentence.substring(0, 100) + "...",
            score: isTrickQuestion(sentence)
        });
    });
    console.table(results);
})();
