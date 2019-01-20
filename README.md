# Cambridge Dictionary

This repository fetch and parse Cambridge Dictionary HTML. It provides CLI tools and library output with JSON format.

## Try it out!

```bash
$ npx cambridge-dictionary lego
```

## Installation

```bash
$ yarn global add cambridge-dictionary
```

## Usage

examples

- [Basic](./example/basic.js)

```js
import cambridgeDictionary from '../src';

cambridgeDictionary('hello')
  .then(console.log)
  .catch(console.error);

/*
{
  "word": "hello",
  "explanations": [
    {
      "pos": "exclamation, noun",
      "ipa_uk": "heˈləʊ",
      "ipa_us": "heˈloʊ",
      "senses": [
        {
          "guideWord": "",
          "definations": [
            {
              "level": "A1",
              "domain": "",
              "text": "used when meeting or greeting someone: ",
              "examples": [
                "Hello, Paul. I haven't seen you for ages.",
                "I know her vaguely - we've exchanged hellos a few times.",
                "I just thought I'd call by and say hello.",
                "And a big hello (= welcome) to all the parents who've come to see the show."
              ]
            },
            ...
*/
```
