/* ============================================================
   VERSIÓN MOCK — deshabilitada
   Guarda todo en un Map en memoria en vez de usar el almacén
   seguro real del dispositivo. Útil para testear sin persistir
   sesión entre recargas, pero NO debe usarse en producción.

const memoryStorage = new Map();

export const TOKEN_KEY = "ucu_mundial_token";

export const secureStorage = {
  get: async (key) => {
    try {
      return memoryStorage.has(key) ? memoryStorage.get(key) : null;
    } catch {
      return null;
    }
  },
  set: async (key, value) => {
    try {
      memoryStorage.set(key, value);
    } catch {
      // silent fail
    }
  },
  remove: async (key) => {
    try {
      memoryStorage.delete(key);
    } catch {
      // silent fail
    }
  },
};

   ============================================================ */

import * as SecureStore from "expo-secure-store";

export const TOKEN_KEY = "ucu_mundial_token";

export const secureStorage = {
    get: async (key) => {
        try {
            return await SecureStore.getItemAsync(key);
        } catch {
            return null;
        }
    },
    set: async (key, value) => {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch {
            // silent fail
        }
    },
    remove: async (key) => {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch {
            // silent fail
        }
    },
};
