import { isEscapeKey } from './util.js';

const templateSucces = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

let generalMessageContainer;

const closeMessageByClickOutside = (evt) => {
  if (evt.target !== generalMessageContainer) {
    generalMessageContainer.remove();
    document.removeEventListener('click', closeMessageByClickOutside);
    document.removeEventListener('keydown', closeMessageByClickOutside);
  }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    generalMessageContainer.remove();
    document.removeEventListener('click', closeMessageByClickOutside);
    document.removeEventListener('keydown', closeMessageByClickOutside);
  }
};

const closeMessageByClickInside = (evt) => {
  if (evt.target === generalMessageContainer) {
    generalMessageContainer.remove();
    document.removeEventListener('click', closeMessageByClickInside);
    document.removeEventListener('keydown', closeMessageByClickInside);
  }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    generalMessageContainer.remove();
    document.removeEventListener('click', closeMessageByClickInside);
    document.removeEventListener('keydown', closeMessageByClickInside);
  }
};

/*const closeMessageByClick = (evt) => {
  if (evt.target !== ad) {
    ad.remove();
    document.removeEventListener('click', closeMessageByClick);
  }
};

const closeMessageByEscape = (ad) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    ad.remove();
    document.removeEventListener('keydown', closeMessageByEscape(ad));
  }
};*/

const createGetError = (message) => {
  const messageContainer = document.createElement('div');
  const messageText = document.createElement('p');
  messageContainer.style.zIndex = '1100';
  messageContainer.style.position = 'absolute';
  messageContainer.style.top = '50%';
  messageContainer.style.left = '25%';
  messageContainer.style.right = '25%';
  messageContainer.style.transform = 'translateY(-50%)';
  messageContainer.style.padding = '20px 100px';
  messageContainer.style.fontSize = '50px';
  messageContainer.style.fontWeight = '700';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.color = '#ffffff';
  messageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  messageContainer.style.backgroundImage = 'url("../img/muffin-red.svg") no-repeat center left';
  messageContainer.style.border = '1px solid #ff5635';
  messageText.style.fontSize = '15px';

  messageText.textContent = 'Ой! Не удалось получить ответ от сервера.';
  messageContainer.textContent = message;

  messageContainer.append(messageText);
  document.body.append(messageContainer);

  generalMessageContainer = messageContainer;
  document.addEventListener('click', closeMessageByClickOutside);
  document.addEventListener('keydown', closeMessageByClickOutside);
};

const createPostError = (() => {
  const message = templateError.cloneNode(true);
  const messageButton = message.querySelector('.error__button');

  generalMessageContainer = message;
  document.addEventListener('click', closeMessageByClickInside);
  document.addEventListener('keydown', closeMessageByClickInside);

  const closeMessageByButton = () => {
    message.remove();
    messageButton.removeEventListener('click', closeMessageByButton);
    document.removeEventListener('click', closeMessageByClickInside);
    document.removeEventListener('keydown', closeMessageByClickInside);
  };

  messageButton.addEventListener('click', closeMessageByButton);

  document.body.append(message);
});

const createPostSuccess = (() => {
  const message = templateSucces.cloneNode(true);

  document.body.append(message);

  generalMessageContainer = message;
  document.addEventListener('click', closeMessageByClickInside);
  document.addEventListener('keydown', closeMessageByClickInside);
});

export { createGetError, createPostError, createPostSuccess };
