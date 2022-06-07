function getRandomInteger(firstNumber, secondNumber) {
  if ((firstNumber < 0) || (secondNumber < 0)) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль');
  }
  return Math.floor(Math.random() * (Math.abs(secondNumber - firstNumber) + 1)) + Math.min(firstNumber, secondNumber);
}

getRandomInteger(0, 5);

/* floating point random number function  */
function getFloatingPointRandomNumber(firstNumber, secondNumber, numbersAfterPoint) {
  if ((firstNumber < 0) || (secondNumber < 0)) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль');
  }
  const randomNumber = Math.random() * (Math.abs(secondNumber - firstNumber) + 1) + Math.min(firstNumber, secondNumber);
  return randomNumber.toPrecision(numbersAfterPoint + Math.floor(randomNumber).toString().length);
}

getFloatingPointRandomNumber(4.1681515616, 15.25, 5);
