import {adForm} from './form.js';

const titleForm = adForm.querySelector('#title');
const priceForm = adForm.querySelector('#price');
const roomNumberForm = adForm.querySelector('#room_number');
const capacityForm = adForm.querySelector('#capacity');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
});

pristine.addValidator(titleForm, (value) => {
  if (value.length > 30 && value.length < 100) {
    return true;
  }
}, 'Длина заголовка должна быть от 30 до 100 символов', 2, true);

pristine.addValidator(priceForm, (value) => {
  if (value <= 100000) {
    return true;
  }
}, 'Цена должна быть меньше 100000', 2, true);

const checkRoomNumberCapacity = () => (roomNumberForm.value !== '100' && capacityForm.value !== '0' && roomNumberForm.value >= capacityForm.value) || (roomNumberForm.value === '100' && capacityForm.value === '0');

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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
