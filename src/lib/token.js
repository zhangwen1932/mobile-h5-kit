const STORAGE_TOKEN_NAME = 'lorealToken';

export default {
  get() {
    if (localStorage.getItem(STORAGE_TOKEN_NAME)) {
      return localStorage.getItem(STORAGE_TOKEN_NAME);
    }
    return null;
  },
  save(token) {
    localStorage.setItem(STORAGE_TOKEN_NAME, token);
  },
  remove() {
    localStorage.removeItem(STORAGE_TOKEN_NAME);
  },
};
