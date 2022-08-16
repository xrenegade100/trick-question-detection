import { Element, load } from "cheerio";
import axios from "axios";

const getSentencesFromHtmlPage = async (url: string) => {
    const sentences: string[] = [];

    const html = await axios.get(url);
    const $ = load(await html.data);

    $("input").map((i, element) => {
        element.attributes.forEach((attribute) => {
            if (attribute.name === "type" && attribute.value === "checkbox") {
                let sentence = "";
                const dfs = (element: Element) => {
                    const s = [];
                    const explored = new Set();
                    s.push(element);
                    explored.add(element);
                    while (!(s.length === 0)) {
                        const t = s.pop();
                        const children = $(t).children();
                        if (children.length === 0) {
                            sentence += " " + $(t).text() + " ";
                        }
                        $(children).each((_, el) => {
                            if (!explored.has(el)) {
                                s.push(el);
                                explored.add(el);
                            }
                        });
                    }
                };
                $(element)
                    .nextAll()
                    .each((_, el) => {
                        dfs(el);
                    });
                sentences.push(sentence);
            }
        });
    });

    return sentences;
};

export default getSentencesFromHtmlPage;
