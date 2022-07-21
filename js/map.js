import { createCustomPopup } from './popup.js';
import { enableForm } from './form.js';
import { filterObjects } from './form-filter.js';
import { defaultObjects } from './main.js';

const BASIC_MAP_SETUP = {
  lat: 35.65294,
  lng: 139.7807,
  scale: 12,
  digits: 5
};

const mapFilter = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const popupFragment = document.querySelector('#map-canvas');
const locationInput = document.querySelector('#address');

enableForm(mapFilter, false);
enableForm(adForm, false);

const map = L.map(popupFragment)
  .on('load', () => {
    enableForm(mapFilter, true);
    enableForm(adForm, true);
    locationInput.value = `${BASIC_MAP_SETUP.lat}, ${BASIC_MAP_SETUP.lng}`;
  })
  .setView({
    lat: BASIC_MAP_SETUP.lat,
    lng: BASIC_MAP_SETUP.lng,
  }, BASIC_MAP_SETUP.scale);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: BASIC_MAP_SETUP.lat,
    lng: BASIC_MAP_SETUP.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  locationInput.value = `${evt.target.getLatLng().lat.toFixed(BASIC_MAP_SETUP.digits)}, ${evt.target.getLatLng().lng.toFixed(BASIC_MAP_SETUP.digits)}`;
});

const icon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {lat, lng} = point.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(point));
};

const renderSimilarList = (objects) => {

  const similarObjects = filterObjects(objects.slice());

  similarObjects.forEach((point) => {
    createMarker(point);
  });
};

const resetMap = () => {
  map
    .setView({
      lat: BASIC_MAP_SETUP.lat,
      lng: BASIC_MAP_SETUP.lng,
    }, BASIC_MAP_SETUP.scale)
    .closePopup();
  mainPinMarker
    .setLatLng({
      lat: BASIC_MAP_SETUP.lat,
      lng: BASIC_MAP_SETUP.lng,
    });
  renderSimilarList(defaultObjects);
};

const resetMapFilter = () => mapFilter.reset();

const resetlocationInput = () => {
  locationInput.value = `${BASIC_MAP_SETUP.lat}, ${BASIC_MAP_SETUP.lng}`;
};

export { renderSimilarList, mapFilter, resetMap, resetMapFilter, resetlocationInput, markerGroup };
