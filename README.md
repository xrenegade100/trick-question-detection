<a name="readme-top"></a>

<p align="center">
<img src="https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff">
  <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
	<a href="https://github.com/xrenegade100/trick-question-detection/issues">
		<img src="https://img.shields.io/github/issues/xrenegade100/trick-question-detection?style=flat-square">
	</a>
	<a href="https://www.linkedin.com/in/antonio-scognamiglio-527968242/">
		<img src="https://img.shields.io/badge/linkedin-0077b5?style=flat-square&logo=linkedin&logocolor=white">
	</a>
</p>
<br />

<div align="center">
  <h3 align="center">trick-question-detection</h3>

  <p align="center">
    Detect the dark pattern <i>trick question</i> in web pages
    <br />
    <br />
    ·
    <a href="https://github.com/xrenegade100/trick-question-detection/issues">Report Bug</a>
    ·
  </p>
</div>

## About

The term dark pattern was originally coined by Harry Brignull in 2010. He defined it as:

> a user interface that has been carefully crafted to trick users into doing things, such as buying insurance with their purchase or signing up for recurring bills

Very often we don't realize it, but while using websites or apps, our choices and actions are influenced by dark patterns, which are reusable design patterns that somehow cause the user to make choices he or she would not normally make.

This algorithm is used to identify instances of the dark pattern _trick question_ within web pages.

## Prerequisites

- NodeJS v16.x

## Usage

```typescript
import { isTrickQuestion, getSentencesFromHtmlPage } from 'trick-question-detection';

const sentences = getSentencesFromHtmlPage('https:/www.google.com');

sentences.forEach((s) => {
  console.log('Sentence:', s + ' | Score: ' + isTrickQuestion(s));
});
```

<p align="right">(<a href="#readme-top">⬆️ back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">⬆️ back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Useful resources about dark patterns:

- [Wikipedia page for dark patterns](https://en.wikipedia.org/wiki/Dark_pattern)
- [deceptive.design by Harry Brignull](https://deceptive.design)
- [UXP2 Lab's website about dark patterns](https://darkpatterns.uxp2.com)

<p align="right">(<a href="#readme-top">⬆️ back to top</a>)</p>
