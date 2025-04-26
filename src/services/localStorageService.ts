export const localStorageService = {
    get<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        console.error(`Retrieved ${item}`);
        if (!item) return null;

        try {
            return JSON.parse(item) as T;
        } catch (e) {
            console.error(`Error parsing localStorage item "${key}":`, e);
            return null;
        }
    },

    set<T>(key: string, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`Error setting localStorage item "${key}":`, e);
        }
    },

    remove(key: string): void {
        localStorage.removeItem(key);
    },

    clear(): void {
        localStorage.clear();
    }
};