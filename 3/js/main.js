const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const INTEGER_MIN = 0;
const INTEGER_MAX = 100;

const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;

const SIMILAR_OBJECT_NEARBY_COUNT = 10;

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

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(INTEGER_MIN, elements.length - 1)];

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

const createObject = (index) => {
  const latitude = getRandomPositiveFloat(LATITUDE_MIN, LATITUDE_MAX);
  const longitude = getRandomPositiveFloat(LONGITUDE_MIN, LONGITUDE_MAX);

  return {
    author: {
      avatar: `img/avatars/user${index < 9 ? '0' : ''}${index + 1}.png`
    },
    offer: {
      title: 'Сногшибательное предложение!',
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(INTEGER_MIN, INTEGER_MAX),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomPositiveInteger(INTEGER_MIN, INTEGER_MAX),
      guests: getRandomPositiveInteger(INTEGER_MIN, INTEGER_MAX),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomArray(FEATURES),
      description: 'Современное и уютное место специально для тех, кто хочет отдохнуть от шумного города, но не готов отказываться от комофрта',
      photos: getRandomArray(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    }
  };
};

const similarObjects = () => Array.from({length: SIMILAR_OBJECT_NEARBY_COUNT}, (item, index) => createObject(index));

similarObjects();
