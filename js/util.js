const getRandomPositiveInteger = (firstNumber, secondNumber) => {
  const minNumber = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const maxNumber = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));

  return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
};

const getRandomPositiveFloat = (firstNumber, secondNumber, numbersAfterPoint = 5) => {
  const minNumber = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const maxNumber = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));

  return +(Math.random() * (maxNumber - minNumber + 1) + minNumber).toFixed(numbersAfterPoint);
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

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray};
