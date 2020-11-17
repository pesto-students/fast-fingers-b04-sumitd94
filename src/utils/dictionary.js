let DICTIONARY = {};
let repeatedWords = {};

export const loadDictionary = async (minLength, maxLength) => {
  const wordArray = await (
    await fetch(
      'https://raw.githubusercontent.com/pesto-students/fast-fingers-b04-sumitd94/master/data/dictionary.json'
    )
  ).json();
  DICTIONARY = wordArray.reduce((dictinoaryObj, word) => {
    const length = word.length;

    if (length < minLength || length > maxLength) {
      return dictinoaryObj;
    }

    if (dictinoaryObj[length]) {
      dictinoaryObj[length].push(word);
    } else {
      dictinoaryObj[length] = [word];
    }

    return dictinoaryObj;
  }, {});

  return DICTIONARY;
};

export const getRandomWordFromDictionary = (length) => {
  const words = DICTIONARY[length];

  if (!words) {
    return null;
  }

  const randomIndex = parseInt(Math.random() * words.length);
  const word = words[randomIndex];
  if (repeatedWords[word]) {
    return getRandomWordFromDictionary(length);
  }
  repeatedWords[word] = true;
  return word;
};
