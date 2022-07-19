const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileAvatarChooser = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const previewAvatarDefaultSrc = previewAvatar.src;

const filePhotoChooser = document.querySelector('.ad-form__input');
const photoContainer = document.querySelector('.ad-form__photo');

const createImage = (addressLink) => {
  const image = document.createElement('img');
  image.alt = 'Фотография жилья';
  image.style = 'width: 100%; height: 100%; object-fit: cover';
  image.src = addressLink;

  photoContainer.append(image);
};

fileAvatarChooser.addEventListener('change', () => {
  const file = fileAvatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

filePhotoChooser.addEventListener('change', () => {
  const file = filePhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoContainer.innerHTML = '';
    createImage(URL.createObjectURL(file));
  }
});

const resetPhotos = () => {
  previewAvatar.src = previewAvatarDefaultSrc;
  photoContainer.innerHTML = '';
};

export { resetPhotos };
