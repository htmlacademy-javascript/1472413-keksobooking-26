import { renderSimilarList, mapFilter } from './map.js';
import { setUserFormSubmit } from './form-validation.js';
import { enableForm } from './form.js';
import { createGetError } from './messages.js';
import { getData } from './api.js';
import { onFilterChange } from './form-filter.js';
import { debounce } from './util.js';
import './form-files.js';

getData(
  (objects) => {
    renderSimilarList(objects);
    onFilterChange(debounce(() => renderSimilarList(objects)));
  },
  (message) => {
    enableForm(mapFilter, false);
    createGetError(message);
  }
);

setUserFormSubmit();
