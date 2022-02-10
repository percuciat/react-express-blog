function setItemStorage(name: string, value: string) {
    localStorage.setItem(name, value);
}

function getItemStorage(name: string): string | null {
    return localStorage.getItem(name);
}

function removeItemStorage(key: string) {
    localStorage.removeItem(key);
}

function clearItemsStorage() {
    localStorage.clear();
}

type IStorage = {
    setItemStorage: (a: string, b: string) => void;
    getItemStorage: (n: any) => string | null;
    removeItemStorage: (key: string) => void;
    clearItemsStorage: () => void;
};

export const storage: IStorage = {
    setItemStorage,
    getItemStorage,
    removeItemStorage,
    clearItemsStorage,
};