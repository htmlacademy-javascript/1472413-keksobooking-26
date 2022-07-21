import { renderSimilarList, mapFilter } from './map.js';
import { setUserFormSubmit } from './form-validation.js';
import { enableForm } from './form.js';
import { createGetError } from './messages.js';
import { getData } from './api.js';
import { onFilterChange } from './form-filter.js';
import { debounce } from './util.js';
import './form-files.js';

let defaultObjects = [];

getData(
  (objects) => {
    defaultObjects = objects;
    renderSimilarList(objects);
    onFilterChange(debounce(() => renderSimilarList(objects)));
  },
  (message) => {
    enableForm(mapFilter, false);
    createGetError(message);
  }
);

setUserFormSubmit();

export { defaultObjects };
