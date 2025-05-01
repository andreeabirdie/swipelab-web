import Logger from "../utils/logger.ts";

export const localStorageService = {
    get<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        if (!item) return null;

        try {
            return JSON.parse(item) as T;
        } catch (e) {
            Logger.error(`Error parsing localStorage item "${key}":`, {error: e});
            return null;
        }
    },

    set<T>(key: string, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            Logger.error(`Error setting localStorage item "${key}":`, {error: e});
        }
    },

    remove(key: string): void {
        localStorage.removeItem(key);
    },

    clear(): void {
        localStorage.clear();
    }
};