const RAW_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
const API_BASE_URL = RAW_URL.replace(/\/+$/, "");

export async function fetchFromAPI(endpoint, options = {}) {
  try {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const res = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      throw new Error(`API error ${res.status}: ${errBody || res.statusText}`);
    }
    // Deletes, restores and soft deletes change what is in the Bin, so tell
    // the sidebar to refresh its Bin icon straight away.
    const method = (options.method || "GET").toUpperCase();
    const touchesBin =
      method === "DELETE" ||
      (method === "POST" && (cleanEndpoint.includes("soft_delete") || cleanEndpoint.startsWith("/crm/bin/")));
    if (typeof window !== "undefined" && touchesBin) {
      window.dispatchEvent(new Event("bin-changed"));
    }
    // Return json if content-type is json or body exists
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    }
    return { success: true };
  } catch (error) {
    console.warn(`Failed API call ${endpoint}:`, error.message);
    return null;
  }
}

export const apiService = {
  // Dashboard
  getDashboardOverview: (city = 'ALL') => fetchFromAPI(`/crm/dashboard-overview/?city=${city}`),

  // Customers CRUD
  getCustomers: (city = 'ALL') => fetchFromAPI(`/customers/list/?city=${city}`),
  getCustomer: (id) => fetchFromAPI(`/customers/list/${id}/`),
  createCustomer: (data) => fetchFromAPI(`/customers/list/`, { method: "POST", body: JSON.stringify(data) }),
  updateCustomer: (id, data) => fetchFromAPI(`/customers/list/${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteCustomer: (id) => fetchFromAPI(`/customers/list/${id}/`, { method: "DELETE" }),
  // Moves a customer to Deleted Customers (status "Deleted"); restore with updateCustomer.
  softDeleteCustomer: (id) => fetchFromAPI(`/customers/list/${id}/soft_delete/`, { method: "POST" }),

  // Orders CRUD
  getOrders: (city = 'ALL') => fetchFromAPI(`/crm/orders/?city=${city}`),
  getOrder: (id) => fetchFromAPI(`/crm/orders/${id}/`),
  createOrder: (data) => fetchFromAPI(`/crm/orders/`, { method: "POST", body: JSON.stringify(data) }),
  updateOrder: (id, data) => fetchFromAPI(`/crm/orders/${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteOrder: (id) => fetchFromAPI(`/crm/orders/${id}/`, { method: "DELETE" }),

  // Invoices CRUD
  getInvoices: () => fetchFromAPI(`/crm/invoices/`),
  getInvoice: (id) => fetchFromAPI(`/crm/invoices/${id}/`),
  createInvoice: (data) => fetchFromAPI(`/crm/invoices/`, { method: "POST", body: JSON.stringify(data) }),
  updateInvoice: (id, data) => fetchFromAPI(`/crm/invoices/${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteInvoice: (id) => fetchFromAPI(`/crm/invoices/${id}/`, { method: "DELETE" }),

  // Inventory / Utilities CRUD
  getInventory: () => fetchFromAPI(`/crm/inventory/`),
  createInventory: (data) => fetchFromAPI(`/crm/inventory/`, { method: "POST", body: JSON.stringify(data) }),
  updateInventory: (id, data) => fetchFromAPI(`/crm/inventory/${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteInventory: (id) => fetchFromAPI(`/crm/inventory/${id}/`, { method: "DELETE" }),
  getProducts: () => fetchFromAPI(`/crm/products/`),
  createProduct: (data) => fetchFromAPI(`/crm/products/`, { method: "POST", body: JSON.stringify(data) }),
  updateProduct: (id, data) => fetchFromAPI(`/crm/products/${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteProduct: (id) => fetchFromAPI(`/crm/products/${id}/`, { method: "DELETE" }),

  // Salesmen & Trucks
  getSalesmen: (city = 'ALL') => fetchFromAPI(`/salesman/salesmen/?city=${city}`),
  createSalesman: (data) => fetchFromAPI(`/salesman/salesmen/`, { method: "POST", body: JSON.stringify(data) }),
  updateSalesman: (id, data) => fetchFromAPI(`/salesman/salesmen/${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteSalesman: (id) => fetchFromAPI(`/salesman/salesmen/${id}/`, { method: "DELETE" }),
  getTrucks: () => fetchFromAPI(`/salesman/trucks/`),
  createTruck: (data) => fetchFromAPI(`/salesman/trucks/`, { method: "POST", body: JSON.stringify(data) }),
  deleteTruck: (id) => fetchFromAPI(`/salesman/trucks/${id}/`, { method: "DELETE" }),
  createStockTransaction: (data) => fetchFromAPI(`/salesman/stock-transactions/`, { method: "POST", body: JSON.stringify(data) }),

  // Cashier CRUD
  getCashierTransactions: () => fetchFromAPI(`/crm/cashier/`),
  createCashier: (data) => fetchFromAPI(`/crm/cashier/`, { method: "POST", body: JSON.stringify(data) }),
  updateCashier: (id, data) => fetchFromAPI(`/crm/cashier/${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteCashier: (id) => fetchFromAPI(`/crm/cashier/${id}/`, { method: "DELETE" }),

  // Wallets CRUD
  getWallets: () => fetchFromAPI(`/crm/wallets/`),
  createWallet: (data) => fetchFromAPI(`/crm/wallets/`, { method: "POST", body: JSON.stringify(data) }),
  updateWallet: (id, data) => fetchFromAPI(`/crm/wallets/${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteWallet: (id) => fetchFromAPI(`/crm/wallets/${id}/`, { method: "DELETE" }),
  // Credits the wallet and records the cashier transaction on the server, atomically.
  createWalletRecharge: (data) => fetchFromAPI(`/crm/wallet-recharges/`, { method: "POST", body: JSON.stringify(data) }),

  // Zones & Routes
  getZones: (city = 'ALL') => fetchFromAPI(`/crm/zones/?city=${city}`),
  createZone: (data) => fetchFromAPI(`/crm/zones/`, { method: "POST", body: JSON.stringify(data) }),
  deleteZone: (id) => fetchFromAPI(`/crm/zones/${id}/`, { method: "DELETE" }),
  getRoutes: () => fetchFromAPI(`/crm/routes/`),
  createRoute: (data) => fetchFromAPI(`/crm/routes/`, { method: "POST", body: JSON.stringify(data) }),
  deleteRoute: (id) => fetchFromAPI(`/crm/routes/${id}/`, { method: "DELETE" }),

  // Masters
  getMasters: () => fetchFromAPI(`/crm/masters/`),

  // Staff users (Masters page) and access levels (Privileges page)
  getStaffUsers: () => fetchFromAPI(`/crm/staff-users/`),
  createStaffUser: (data) => fetchFromAPI(`/crm/staff-users/`, { method: "POST", body: JSON.stringify(data) }),
  updateStaffUser: (id, data) => fetchFromAPI(`/crm/staff-users/${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteStaffUser: (id) => fetchFromAPI(`/crm/staff-users/${id}/`, { method: "DELETE" }),

  // Bin: deleted records kept for 30 days
  getBin: () => fetchFromAPI(`/crm/bin/`),
  restoreBinItem: (id) => fetchFromAPI(`/crm/bin/${id}/restore/`, { method: "POST" }),
  purgeBinItem: (id) => fetchFromAPI(`/crm/bin/${id}/`, { method: "DELETE" }),
  emptyBin: () => fetchFromAPI(`/crm/bin/empty/`, { method: "POST" }),
  getAccessLevels: () => fetchFromAPI(`/crm/access-levels/`),
  createAccessLevel: (data) => fetchFromAPI(`/crm/access-levels/`, { method: "POST", body: JSON.stringify(data) }),
  deleteAccessLevel: (id) => fetchFromAPI(`/crm/access-levels/${id}/`, { method: "DELETE" }),

  // Report records
  deleteStockTransaction: (id) => fetchFromAPI(`/salesman/stock-transactions/${id}/`, { method: "DELETE" }),
  deleteCommission: (id) => fetchFromAPI(`/salesman/commissions/${id}/`, { method: "DELETE" }),
};
