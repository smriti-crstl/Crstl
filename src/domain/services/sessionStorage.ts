const setItemInSessionStorage = (key: string, value: string): void =>
  sessionStorage.setItem(key, value);

const getItemFromSessionStorage = (key: string): string | null =>
  sessionStorage.getItem(key);

const removeItemFromSessionStorage = (key: string): void =>
  sessionStorage.removeItem(key);

const clearSessionStorage = (): void => sessionStorage.clear();

export {
  setItemInSessionStorage,
  getItemFromSessionStorage,
  clearSessionStorage,
  removeItemFromSessionStorage,
};
