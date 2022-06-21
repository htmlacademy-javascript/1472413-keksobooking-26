const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const disableForm = (form) => {
  form.classList.add(`${form.className}--disabled`);
  [...form.children].forEach((innerItem) => {
    innerItem.disabled = true;
  });
};

const enableForm = (form) => {
  form.classList.remove(form.classList.item(1));
  [...form.children].forEach((innerItem) => {
    innerItem.disabled = false;
  });
};

disableForm(adForm);
enableForm(adForm);
disableForm(mapFilter);
enableForm(mapFilter);
