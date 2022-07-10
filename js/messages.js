import { isEscapeKey } from './util.js';

const templateSucces = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

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

  document.addEventListener('click', (evt) => {
    if (evt.target !== messageContainer) {
      messageContainer.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      messageContainer.remove();
    }
  });
};

const createPostError = (() => {
  const message = templateError.cloneNode(true);
  const messageButton = message.querySelector('.error__button');

  messageButton.addEventListener('click', () => {
    message.remove();
  });

  document.addEventListener('click', (evt) => {
    if (evt.target !== message) {
      message.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      message.remove();
    }
  });

  document.body.append(message);
});

const createPostSuccess = (() => {
  const message = templateSucces.cloneNode(true);

  document.body.append(message);

  document.addEventListener('click', () => {
    message.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      message.remove();
    }
  });
});

export { createGetError, createPostError, createPostSuccess };