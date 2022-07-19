import { createPostError, createPostSuccess } from './messages.js';
import { sendData } from './api.js';
import { resetMap, resetMapFilter, resetlocationInput } from './map.js';
import { resetPhotos } from './form-files.js';

const MAX_PRICE = 100000;
const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const NOT_LIVING_ROOM = '100';
const PEOPLE_COUNT = '0';

const houseMinPriceMap = new Map();
houseMinPriceMap.set('bungalow', '0');
houseMinPriceMap.set('flat', '1000');
houseMinPriceMap.set('hotel', '3000');
houseMinPriceMap.set('house', '5000');
houseMinPriceMap.set('palace', '10000');

const adForm = document.querySelector('.ad-form');
const titleForm = adForm.querySelector('#title');
const priceForm = adForm.querySelector('#price');
const roomNumberForm = adForm.querySelector('#room_number');
const capacityForm = adForm.querySelector('#capacity');
const houseTypeForm = adForm.querySelector('#type');
const timeinForm = adForm.querySelector('#timein');
const timeoutForm = adForm.querySelector('#timeout');
const sliderForm = adForm.querySelector('.ad-form__slider');
const submitFormButton = adForm.querySelector('.ad-form__submit');
const resetFormButton = adForm.querySelector('.ad-form__reset');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
});

pristine.addValidator(titleForm, (value) => {
  if (value.length > MIN_LENGTH && value.length < MAX_LENGTH) {
    return true;
  }
}, 'Длина заголовка должна быть от 30 до 100 символов', 2, true);

pristine.addValidator(priceForm, (value) => {
  if (value <= MAX_PRICE && value >= Number(houseMinPriceMap.get(houseTypeForm.value))) {
    return true;
  }
}, () => `Цена должна быть больше ${houseMinPriceMap.get(houseTypeForm.value)} меньше 100000`, 2, true);

const checkRoomNumberCapacity = () => (roomNumberForm.value !== NOT_LIVING_ROOM && capacityForm.value !== PEOPLE_COUNT && roomNumberForm.value >= capacityForm.value) || (roomNumberForm.value === NOT_LIVING_ROOM && capacityForm.value === PEOPLE_COUNT);

pristine.addValidator(capacityForm, checkRoomNumberCapacity, 'Количество гостей не соответствует количеству комнат', 2, true);
pristine.addValidator(roomNumberForm, checkRoomNumberCapacity, 'Количество гостей не соответствует количеству комнат', 2, true);

const onRoomsChange = () => {
  pristine.validate(capacityForm);
  pristine.validate(roomNumberForm);
};
capacityForm.addEventListener('change',  onRoomsChange);

const onGuestsChange = () => {
  pristine.validate(capacityForm);
  pristine.validate(roomNumberForm);
};
roomNumberForm.addEventListener('change', onGuestsChange);

const onHouseTypeChange = () => {
  sliderForm.noUiSlider.updateOptions({
    range: {
      min: Number(houseMinPriceMap.get(houseTypeForm.value)),
      max: MAX_PRICE,
    }
  });
  priceForm.placeholder = houseMinPriceMap.get(houseTypeForm.value);
  //priceForm.value = houseMinPriceMap.get(houseTypeForm.value);
  sliderForm.noUiSlider.set(Number(priceForm.value));
  //pristine.validate(priceForm);
};
houseTypeForm.addEventListener('change', onHouseTypeChange);

const onPriceChange = () => {
  sliderForm.noUiSlider.set(Number(priceForm.value));
};
priceForm.addEventListener('change', onPriceChange);

const onTimeInChange = () => {
  timeoutForm.value = timeinForm.value;
};
timeinForm.addEventListener('change', onTimeInChange);

const onTimeOutChange = () => {
  timeinForm.value = timeoutForm.value;
};
timeoutForm.addEventListener('change', onTimeOutChange);

noUiSlider.create(sliderForm, {
  start: [Number(houseMinPriceMap.get(houseTypeForm.value))],
  step: 10,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed();
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
  range: {
    'min': Number(houseMinPriceMap.get(houseTypeForm.value)),
    'max': MAX_PRICE,
  },
});

sliderForm.noUiSlider.on('slide', () => {
  priceForm.value = sliderForm.noUiSlider.get();
});

const resetPage = () => {
  resetMap();
  resetMapFilter();
  adForm.reset();
  sliderForm.noUiSlider.reset();
  resetlocationInput();
  resetPhotos();
};

resetFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

const blockSubmitButton = () => {
  submitFormButton.setAttribute('disabled', true);
  submitFormButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitFormButton.removeAttribute('disabled');
  submitFormButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          createPostSuccess();
        },
        () => {
          unblockSubmitButton();
          createPostError();
        },
        new FormData(evt.target),
      );
      resetPage();
    }
  });
};

export { setUserFormSubmit };
