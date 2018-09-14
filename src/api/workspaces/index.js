import { paged } from './../helpers/paginated';

/**
 * Remove this once we have the API call
 */
const temporary = {
  data: [
    { id: 1, name: 'Ergoform Factory' }
  ],
  _pagination: {
    offset: 0,
    limit: 10,
    total: 1
  },
  _links: {
    self: null,
    first: null,
    last: null,
    next: null,
    prev: null
  }
};

export default {
  get: () => {
    // TODO handle paging
    return Promise.resolve(paged(temporary));
  }
}