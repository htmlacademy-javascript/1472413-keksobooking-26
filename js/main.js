import { renderSimilarList, mapFilter } from './map.js';
import { setUserFormSubmit } from './form-validation.js';
import { enableForm } from './form.js';
import { createGetError } from './messages.js';
import { getData } from './api.js';

const SIMILAR_OBJECT_NEARBY_COUNT = 10;

getData(
  (objects) => renderSimilarList(objects.slice(0, SIMILAR_OBJECT_NEARBY_COUNT)),
  (message) => {
    enableForm(mapFilter, false);
    createGetError(message);
  }
);

setUserFormSubmit();
