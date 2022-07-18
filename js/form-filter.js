import { markerGroup, mapFilter } from './map.js';

const SIMILAR_OBJECT_COUNT = 10;
const DEFAULT_VALUE = 'any';

const priceRange = {
  low: {
    min: 0,
    max: 9999,
  },
  middle: {
    min: 10000,
    max: 49999,
  },
  high: {
    min: 50000,
    max: 100000,
  },
};

const checkObjectType = (object) => {
  const objectTypeValue = document.querySelector('#housing-type').value;
  return objectTypeValue === DEFAULT_VALUE || object.offer.type === objectTypeValue;
};

const checkObjectPrice = (object) => {
  const objectPriceValue = document.querySelector('#housing-price').value;
  return objectPriceValue === DEFAULT_VALUE || object.offer.price <= priceRange[objectPriceValue].max && object.offer.price >= priceRange[objectPriceValue].min;
};

const checkRoomsCount = (object) => {
  const roomsCountValue = document.querySelector('#housing-rooms').value;
  return roomsCountValue === DEFAULT_VALUE || object.offer.rooms === Number(roomsCountValue);
};

const checkGuestsCount = (object) => {
  const guestsCountValue = document.querySelector('#housing-guests').value;
  return guestsCountValue === DEFAULT_VALUE || object.offer.guests === Number(guestsCountValue);
};

const getSelectedFeatures = () => {
  const selectedCheckboxes = document.querySelectorAll('input[name="features"]:checked');
  const values = Array.from(selectedCheckboxes, ({
    value
  }) => value);

  return values;
};

const checkFeatures = (object) => {
  const filtersFeatures = getSelectedFeatures();

  if (object.offer.features) {
    return filtersFeatures.every((feature) => object.offer.features.includes(feature));
  }

  return false;
};

const filterObjects = (objects) => {
  markerGroup.clearLayers();

  const objectsFilter = objects.filter((object) => (checkObjectType(object) && checkObjectPrice(object) && checkRoomsCount(object) && checkGuestsCount(object) && checkFeatures(object))).slice(0, SIMILAR_OBJECT_COUNT);
  return objectsFilter;
};

const onFilterChange = (cb) => {
  mapFilter.addEventListener('change', cb);
};

export { filterObjects, onFilterChange };
