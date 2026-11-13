import { useSyncExternalStore } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Tiny shared state. Pass a storage key to keep the value on the device
 * between launches.
 */
function createStore(initial, storageKey) {
  let state = initial;
  const listeners = new Set();
  const emit = () => listeners.forEach((listener) => listener());

  if (storageKey) {
    AsyncStorage.getItem(storageKey)
      .then((raw) => {
        if (raw == null) return;
        state = JSON.parse(raw);
        emit();
      })
      .catch(() => {});
  }

  return {
    get: () => state,
    set: (next) => {
      state = typeof next === 'function' ? next(state) : next;
      if (storageKey) AsyncStorage.setItem(storageKey, JSON.stringify(state)).catch(() => {});
      emit();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export function useStore(store) {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}

/** Customer picked on the Select Customer screen for the New Sale tab. */
export const saleCustomerStore = createStore(null);

/** Salesman ids chosen as assistants. Device-only: the CRM has no assistant model. */
export const assistantsStore = createStore([], 'alqattara.assistants');

/** Damaged quantity per product id. Device-only: the CRM has no damaged-items model. */
export const damageStore = createStore({}, 'alqattara.damage');
