const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export async function fetchFromAPI(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
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

  // Salesmen & Trucks
  getSalesmen: (city = 'ALL') => fetchFromAPI(`/salesman/salesmen/?city=${city}`),
  getTrucks: () => fetchFromAPI(`/salesman/trucks/`),

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

  // Zones & Routes
  getZones: (city = 'ALL') => fetchFromAPI(`/crm/zones/?city=${city}`),
  getRoutes: () => fetchFromAPI(`/crm/routes/`),

  // Masters
  getMasters: () => fetchFromAPI(`/crm/masters/`),
};
