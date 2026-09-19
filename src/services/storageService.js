/**
 * Storage Service Abstraction (Dependency Inversion Principle)
 * Encapsulates localStorage interactions with serialization and error handling.
 */

class BrowserStorageService {
  constructor(storage = window.localStorage) {
    this.storage = storage;
  }

  getItem(key, defaultValue = null) {
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`[StorageService] Error reading key "${key}":`, error);
      return defaultValue;
    }
  }

  setItem(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`[StorageService] Error setting key "${key}":`, error);
      return false;
    }
  }

  removeItem(key) {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`[StorageService] Error removing key "${key}":`, error);
      return false;
    }
  }

  clear() {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error("[StorageService] Error clearing storage:", error);
      return false;
    }
  }
}

export const storageService = new BrowserStorageService();
