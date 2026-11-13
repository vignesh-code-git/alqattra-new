// API client for the Django CRM backend at ../backend
// Routes come from config/api_urls.py:
//   /api/auth/token/        JWT obtain
//   /api/auth/token/refresh JWT refresh
//   /api/crm/...            products, inventory, orders, invoices, cashier,
//                           wallets, zones, routes, masters, dashboard-overview
//   /api/salesman/...       salesmen, trucks, stock-transactions, commissions
//   /api/customers/...      list, statements
//
// DRF currently runs with DEFAULT_PERMISSION_CLASSES = AllowAny, so reads work
// without a token. setAuthToken() is wired up for when that is tightened.

import Constants from 'expo-constants';

const PORT = 8000;

/**
 * Work out where the Django server lives.
 * In Expo Go the bundler host is the dev machine's LAN IP, which is also where
 * Django runs, so we reuse it. Falls back to the known LAN address.
 */
function resolveHost() {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv) return fromEnv.replace(/\/+$/, '');

  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.expoGoConfig?.debuggerHost ||
    '';

  const host = hostUri.split(':')[0];
  if (host) return `http://${host}:${PORT}`;

  return `http://192.168.1.19:${PORT}`;
}

export const API_ROOT = resolveHost();
export const API_BASE = `${API_ROOT}/api`;

let authToken = null;
export function setAuthToken(token) {
  authToken = token;
}
export function getAuthToken() {
  return authToken;
}

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

async function request(path, { method = 'GET', body, params, timeout = 15000 } = {}) {
  const url = new URL(`${API_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.append(k, v);
    });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url.toString(), {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const text = await res.text();
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    if (!res.ok) {
      throw new ApiError(
        typeof data === 'object' && data?.detail ? data.detail : `Request failed (${res.status})`,
        res.status,
        data,
      );
    }
    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new ApiError(`Timed out reaching ${API_ROOT}`, 0, null);
    }
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      `Cannot reach the server at ${API_ROOT}. Is the Django backend running?`,
      0,
      null,
    );
  } finally {
    clearTimeout(timer);
  }
}

/** DRF may or may not paginate depending on settings; normalise both shapes. */
export function listOf(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.results)) return payload.results;
  return [];
}

export function countOf(payload, fallbackList) {
  if (payload && typeof payload.count === 'number') return payload.count;
  return (fallbackList || listOf(payload)).length;
}

export const api = {
  // --- auth -----------------------------------------------------------
  login: (username, password) =>
    request('/auth/token/', { method: 'POST', body: { username, password } }),
  refresh: (refresh) =>
    request('/auth/token/refresh/', { method: 'POST', body: { refresh } }),

  // --- crm ------------------------------------------------------------
  products: (params) => request('/crm/products/', { params }),
  inventory: (params) => request('/crm/inventory/', { params }),
  orders: (params) => request('/crm/orders/', { params }),
  order: (id) => request(`/crm/orders/${id}/`),
  // The serializer accepts the order header only; line items are read-only.
  createOrder: (body) => request('/crm/orders/', { method: 'POST', body }),
  updateOrder: (id, body) => request(`/crm/orders/${id}/`, { method: 'PATCH', body }),
  invoices: (params) => request('/crm/invoices/', { params }),
  cashier: (params) => request('/crm/cashier/', { params }),
  createCashier: (body) => request('/crm/cashier/', { method: 'POST', body }),
  wallets: (params) => request('/crm/wallets/', { params }),
  // Credits the wallet and logs the cashier transaction on the server.
  createWalletRecharge: (body) => request('/crm/wallet-recharges/', { method: 'POST', body }),
  zones: (params) => request('/crm/zones/', { params }),
  routes: (params) => request('/crm/routes/', { params }),
  masters: (params) => request('/crm/masters/', { params }),
  dashboardOverview: (params) => request('/crm/dashboard-overview/', { params }),

  // --- salesman -------------------------------------------------------
  salesmen: (params) => request('/salesman/salesmen/', { params }),
  trucks: (params) => request('/salesman/trucks/', { params }),
  stockTransactions: (params) => request('/salesman/stock-transactions/', { params }),
  commissions: (params) => request('/salesman/commissions/', { params }),

  // --- customers ------------------------------------------------------
  customers: (params) => request('/customers/list/', { params }),
  customer: (id) => request(`/customers/list/${id}/`),
  createCustomer: (body) => request('/customers/list/', { method: 'POST', body }),
  statements: (params) => request('/customers/statements/', { params }),
};

export default api;
