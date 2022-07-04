import {getWordEndings, checkData} from './util.js';

const fragment = document.createDocumentFragment();

const template = document.querySelector('#card').content.querySelector('.popup');

const popupTypesMap = new Map();
popupTypesMap.set('flat', 'Квартира');
popupTypesMap.set('bungalow', 'Бунгало');
popupTypesMap.set('house', 'Дом');
popupTypesMap.set('palace', 'Дворец');
popupTypesMap.set('hotel', 'Отель');

const createCustomPopup = ((object) => {
  const card = template.cloneNode(true);
  const popupTitle = card.querySelector('.popup__title');
  const popupAddress = card.querySelector('.popup__text--address');
  const popupPrice = card.querySelector('.popup__text--price');
  const popupTypes = card.querySelector('.popup__type');
  const popupCapacity = card.querySelector('.popup__text--capacity');
  const popupTime = card.querySelector('.popup__text--time');
  const popupList = card.querySelector('.popup__features');
  const popupListItems = popupList.querySelectorAll('.popup__feature');
  const popupDescription = card.querySelector('.popup__description');
  const popupPhotos = card.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');
  const popupAvatar = card.querySelector('.popup__avatar');

  const {
    author: { avatar },
    offer: { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos, },
  } = object;

  const removeUselessItem = (listItems, datasArray, className) => {
    listItems.forEach((listItem) => {
      const isContains = datasArray.some((data) => listItem.classList.contains(`${className}${data}`));
      if (!isContains) {
        listItem.remove();
      }
    });
  };

  const createImgList = (listItems, photosArray, sample) => {
    listItems.replaceChildren(...photosArray.map(
      (photo) => {
        const photoElement = sample.cloneNode(true);
        photoElement.src = photo;

        return photoElement;
      }
    ));
  };

  if (checkData(title, popupTitle)) {
    popupTitle.textContent = title;
  }

  if (checkData(address, popupAddress)) {
    popupAddress.textContent = address;
  }

  if (checkData(price, popupPrice)) {
    popupPrice.textContent = `${price} ₽/ночь`;
  }

  if (checkData(type, popupTypes)) {
    popupTypes.textContent = popupTypesMap.get(type);
  }

  if ((checkData(rooms, popupCapacity)) || (checkData(guests, popupCapacity))) {
    popupCapacity.textContent = `${rooms} ${getWordEndings(rooms, ['комната', 'комнаты', 'комнат'])} для ${guests} ${getWordEndings(guests, ['гостя', 'гостей', 'гостей'])}.`;
  }

  if ((checkData(checkin, popupTime)) || (checkData(checkout, popupTime))) {
    popupTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  }

  if (checkData(features, popupList)) {
    removeUselessItem(popupListItems, features, 'popup__feature--');
  }

  if (checkData(description, popupDescription)) {
    popupDescription.textContent = description;
  }

  if (checkData(photos, popupPhotos)) {
    createImgList(popupPhotos, photos, popupPhoto);
  }

  if (checkData(avatar, popupAvatar)) {
    popupAvatar.src = avatar;
  }

  return fragment.appendChild(card);
});

export { createCustomPopup };
