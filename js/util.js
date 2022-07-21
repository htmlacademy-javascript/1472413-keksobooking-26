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

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getWordEndings, checkData, isEscapeKey, debounce };
