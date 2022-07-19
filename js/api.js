const SERVER_GET_DATA = 'https://26.javascript.pages.academy/keksobooking/data';
const SERVER_POST_DATA = 'https://26.javascript.pages.academy/keksobooking/';

const getData = (onSuccess, onError) => {
  fetch(SERVER_GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(SERVER_POST_DATA, {
    method: 'POST',
    body,
  },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
