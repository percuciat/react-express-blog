const setStorage = (key, value) => {
  localStorage.setItem(key, value);
};
const getStorage = (name) => {
  return localStorage.getItem(name);
};
const removeStorage = (name) => {
  localStorage.removeItem(name);
};
const clearStorage = () => {
  localStorage.clear();
};
export const Storage = {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
};
