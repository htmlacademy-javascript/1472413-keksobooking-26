const enableForm = (form, isEnable) => {
  if (isEnable) {
    form.classList.remove(form.classList.item(1));
    [...form.children].forEach((innerItem) => {
      innerItem.disabled = !isEnable;
    });
  } else {
    form.classList.add(`${form.className}--disabled`);
    [...form.children].forEach((innerItem) => {
      innerItem.disabled = isEnable;
    });
  }
};

export { enableForm };
