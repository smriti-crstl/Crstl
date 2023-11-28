const setItemInLocalStorage = (key: string, value: string): void =>
  localStorage.setItem(key, value);

const getItemFromLocalStorage = (key: string): string | null =>
  localStorage.getItem(key);

const clearLocalStorage = (): void => localStorage.clear();

const removeItemFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

function setWithExpiry(key: string, value: unknown, ttl: number) {
  const item = {
    value: value,
    expiry: new Date().getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key: string) {
  const itemString = window.localStorage.getItem(key);
  if (!itemString) return null;

  const item = JSON.parse(itemString);
  const isExpired = new Date().getTime() > item.expiry;

  if (isExpired) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

export {
  setItemInLocalStorage,
  getItemFromLocalStorage,
  clearLocalStorage,
  removeItemFromLocalStorage,
  setWithExpiry,
  getWithExpiry,
};
