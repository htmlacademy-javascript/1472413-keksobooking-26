import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray} from './util.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const INTEGER_MIN = 0;
const INTEGER_MAX = 100;
const SINGLE_DIGIT_INDEX = 9;

const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;

const SIMILAR_OBJECT_NEARBY_COUNT = 10;

const createObject = (index) => {
  const latitude = getRandomPositiveFloat(LATITUDE_MIN, LATITUDE_MAX);
  const longitude = getRandomPositiveFloat(LONGITUDE_MIN, LONGITUDE_MAX);

  return {
    author: {
      avatar: `img/avatars/user${index < SINGLE_DIGIT_INDEX ? '0' : ''}${index + 1}.png`
    },
    offer: {
      title: 'Сногшибательное предложение!',
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(INTEGER_MIN, INTEGER_MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(INTEGER_MIN, INTEGER_MAX),
      guests: getRandomPositiveInteger(INTEGER_MIN, INTEGER_MAX),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArray(FEATURES),
      description: 'Современное и уютное место специально для тех, кто хочет отдохнуть от шумного города, но не готов отказываться от комфорта',
      photos: getRandomArray(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    }
  };
};

const createObjects = () => Array.from({length: SIMILAR_OBJECT_NEARBY_COUNT}, (item, index) => createObject(index));

export { createObjects };
