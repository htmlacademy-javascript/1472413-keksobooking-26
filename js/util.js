const getRandomPositiveInteger = (firstNumber, secondNumber) => {
  const minNumber = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const maxNumber = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));

  return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
};

const getRandomPositiveFloat = (firstNumber, secondNumber, numbersAfterPoint = 5) => {
  const minNumber = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const maxNumber = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));

  return +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed(numbersAfterPoint);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArray = (elements) => {
  const arrayLength = getRandomPositiveInteger(1, elements.length - 1);
  const randomArray = [];

  for (let i = 0; i < arrayLength; i++) {
    let randomArrayElement = getRandomArrayElement(elements);

    while (randomArray.includes(randomArrayElement)) {
      randomArrayElement = getRandomArrayElement(elements);
    }
    randomArray.push(randomArrayElement);
  }
  return randomArray;
};

const getWordEndings = (number, arrayEndings) => {

  let finalEnding, i;
  number = number % 100;

  if (number >= 11 && number <= 19) {
    finalEnding = arrayEndings[2];
  }
  else {
    i = number % 10;
    switch (i)
    {
      case (1): finalEnding = arrayEndings[0]; break;
      case (2):
      case (3):
      case (4): finalEnding = arrayEndings[1]; break;
      default: finalEnding = arrayEndings[2];
    }
  }
  return finalEnding;
};

const checkData = (arrayObject, templateObject) => {
  if (!arrayObject) {
    templateObject.classList.add('hidden');
    return false;
  }
  return true;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray, getWordEndings, checkData, isEscapeKey };
