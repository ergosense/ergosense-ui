class Paginated {
  constructor(res) {
    this.res = res;
  }

  data() {
    return this.res.data;
  }

  total() {
    return this.res._pagination.total;
  }

  offset() {
    return this.res._pagination.offset;
  }

  limit() {
    return this.res._pagination.limit;
  }

  hasNext() {
     return !!this.res._links.next;
  }

  next() {
    return Promise.resolve(this.res._links.next);
  }
}

export const paged = (res) => new Paginated(res);

export default Paginated;