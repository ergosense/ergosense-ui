/**
 * Remove this once we have the API call
 */
const temporary = [
  { id: 1, name: 'Test Organization', default: true }
];


export default {
  /**
   * Get a list of organizations this user
   * belongs to
   */
  get: (userId) => {
    return Promise.resolve(temporary);
  },
  /**
   * Get the users default organization
   */
  getDefault: (userId) => {
    return Promise.resolve(temporary)
      .then((res) => res.find(i => i.default));
  }
};