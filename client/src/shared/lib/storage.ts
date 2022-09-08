function setItem(name: string, value: string) {
  localStorage.setItem(name, value);
}

function getItem(name: string): string | null {
  return localStorage.getItem(name);
}

function removeItem(key: string) {
  localStorage.removeItem(key);
}

function clearItems() {
  localStorage.clear();
}

type IStorage = {
  setItem: (a: string, b: string) => void;
  getItem: (n: any) => string | null;
  removeItem: (key: string) => void;
  clearItems: () => void;
};

export const storage: IStorage = {
  setItem,
  getItem,
  removeItem,
  clearItems,
};
