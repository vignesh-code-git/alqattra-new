/**
 * Translation between the Django CRM API and the shapes the website pages
 * render.
 *
 * The pages were first built against hand-written demo records. Rather than
 * rewrite every table and modal, records from the API are mapped into that
 * same shape here, and page edits are mapped back into API payloads. All
 * field knowledge lives in this one file.
 *
 * The mobile app (alqattara-RactiNative) writes to the same API, so anything
 * it saves comes through these mappers too.
 */

/** DRF returns a bare array, or { results: [] } when paginated. */
export function listOf(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.results)) return payload.results;
  return [];
}

/** ISO date -> DD/MM/YYYY, the format the pages display and filter on. */
export function toDisplayDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

// The API stores cities as "AL AIN"; the pages use "AL_AIN".
const cityToPage = (city) => (city ? city.replace(/ /g, "_") : "");
const cityToApi = (city) => (city ? city.replace(/_/g, " ").toUpperCase() : "AL AIN");

const API_CITIES = ["AL AIN", "ABU DHABI", "DUBAI"];

// ---------------------------------------------------------------- customers

/**
 * API customer -> page customer.
 * `context` adds data that lives on other endpoints: wallet balance and the
 * most recent order date.
 */
export function customerFromApi(c, context = {}) {
  const { walletByCustomer = new Map(), lastOrderByCustomer = new Map() } = context;
  const wallet = walletByCustomer.get(c.id);
  return {
    id: c.id,
    name: c.name || "",
    customer_id: c.customer_code || "",
    contact: c.phone || "",
    alt_contact: "N/A",
    email: c.email || "",
    registered_on: toDisplayDate(c.created_at),
    recent_order: toDisplayDate(lastOrderByCustomer.get(c.id)),
    city: cityToPage(c.city),
    zone: c.zone || "",
    route: c.route || "",
    address: c.address || "",
    apartment: "-",
    location: "",
    delivery_day: "",
    language: "EN",
    created_by: "",
    representative: "N/A",
    is_company: c.customer_type && c.customer_type !== "Individual",
    is_credit: Number(c.credit_limit) > 0,
    is_verified: c.status === "Active",
    wallet_balance: wallet ? Number(wallet.balance) : 0,
    coupon_available: wallet ? Number(wallet.reward_points) : 0,
    pending_payment: Number(c.current_balance || 0).toFixed(2),
    pricing: [],
    status: c.status,
  };
}

/** API customer marked Deleted -> row for the "Deleted Customers" view. */
export function deletedCustomerFromApi(c, context = {}) {
  const page = customerFromApi(c, context);
  return {
    id: page.id,
    name: page.name,
    customer_id: page.customer_id,
    contact: page.contact,
    registered_on: page.registered_on,
    recent_delivery: page.recent_order,
    wallet_balance: String(page.wallet_balance),
    city: page.city,
    address: page.address,
    status: "Inactive",
    caption: "",
  };
}

/** Page customer form -> API payload (fields the backend model has). */
export function customerToApi(form, { isNew } = {}) {
  const city = cityToApi(form.city);
  const payload = {
    name: form.name.trim(),
    phone: form.contact.trim(),
    city: API_CITIES.includes(city) ? city : "AL AIN",
    zone: form.zone || "",
    route: form.route || "",
    address: [form.address, form.apartment && form.apartment !== "-" ? form.apartment : ""]
      .filter(Boolean)
      .join(", "),
    customer_type: form.is_company ? "Corporate" : "Individual",
  };
  if (form.location) payload.address = [payload.address, `GPS: ${form.location}`].filter(Boolean).join("\n");
  if (isNew) {
    payload.customer_code = form.customer_id?.trim() || `CUST-${Date.now().toString().slice(-7)}`;
    payload.status = "Active";
  }
  return payload;
}

// ------------------------------------------------------------------- orders

/**
 * Orders saved by the mobile app carry their line items in `notes`, as
 * "5 Gallon Drinking Water x3 @ 7.50 (SOLD); ..." - the API cannot store
 * line items for new orders yet. Parse them back out so the website shows
 * the items either way.
 */
function itemsFromNotes(notes) {
  if (!notes) return [];
  return notes
    .split(";")
    .map((part) => part.trim().match(/^(.+?) x(\d+) @ ([\d.]+)(?: \((\w+)\))?$/))
    .filter(Boolean)
    .map(([, product, qty, price, type]) => ({
      product,
      lend_type: type ? type.charAt(0) + type.slice(1).toLowerCase() : "Sold",
      quantity: Number(qty),
      unit_price: Number(price),
      coupon_qty: 0,
    }));
}

/** API order -> page order. */
export function orderFromApi(o, context = {}) {
  const { customerById = new Map(), invoiceByOrder = new Map(), truckBySalesman = new Map() } = context;
  const customer = customerById.get(o.customer);
  const lineItems = (o.items || []).map((it) => ({
    product: it.product_name,
    lend_type: "Sold",
    quantity: Number(it.quantity),
    unit_price: Number(it.unit_price),
    coupon_qty: 0,
  }));
  const total = Number(o.total_amount || 0);
  const paid = o.payment_status === "Paid";
  return {
    id: o.id,
    delivery_note: o.order_no,
    invoice_no: invoiceByOrder.get(o.id) || "",
    customer_name: o.customer_name || customer?.name || "",
    customer_id: o.customer_code || customer?.customer_code || "",
    customer_pk: o.customer,
    salesman_name: o.salesman_name || "",
    order_date: toDisplayDate(o.created_at || o.order_date),
    truck: truckBySalesman.get(o.salesman) || o.route || "",
    zone: customer?.zone || "",
    status: o.status,
    total_amount: total.toFixed(2),
    balance: paid ? "0.00" : total.toFixed(2),
    payment_method: o.payment_method,
    payment_status: (o.payment_status || "Unpaid").toUpperCase(),
    notes: o.notes || "",
    items: lineItems.length ? lineItems : itemsFromNotes(o.notes),
  };
}

const itemsToNotes = (items) =>
  items
    .filter((it) => it.product)
    .map(
      (it) =>
        `${it.product} x${Number(it.quantity) || 1} @ ${(Number(it.unit_price) || 0).toFixed(2)} (${String(
          it.lend_type || it.type || "Sold"
        ).toUpperCase()})`
    )
    .join("; ");

/** New-order form -> API payload. `customer` is the API customer record. */
export function newOrderToApi(form, customer, total) {
  return {
    order_no: `DN-${form.truck_id || "WEB"}-${Date.now().toString().slice(-6)}`,
    customer: customer.id,
    status: "Pending",
    total_amount: total.toFixed(2),
    payment_method: "Cash",
    payment_status: "Unpaid",
    route: form.truck_id || customer.route || "",
    city: customer.city,
    notes: [itemsToNotes(form.items), form.notes].filter(Boolean).join("; "),
  };
}

/** Edited page order -> API PATCH payload. */
export function orderUpdateToApi(order) {
  const total = order.items.reduce(
    (sum, it) => sum + Number(it.quantity || 0) * Number(it.unit_price || 0),
    0
  );
  const payload = {
    status: order.status,
    total_amount: total.toFixed(2),
    payment_method: order.payment_method,
    payment_status:
      order.payment_status === "PAID" ? "Paid" : order.payment_status === "PARTIAL" ? "Partial" : "Unpaid",
  };
  // Keep note-carried items in step with the edit (orders with real line
  // items are read-only on the API side).
  if (order.notes !== undefined) payload.notes = itemsToNotes(order.items);
  return payload;
}

// ------------------------------------------------------------ shared loaders

/** Lookup maps several pages need. */
export function buildContext({ customers = [], wallets = [], orders = [], invoices = [], salesmen = [] }) {
  const customerById = new Map(customers.map((c) => [c.id, c]));
  const walletByCustomer = new Map(wallets.map((w) => [w.customer, w]));
  const invoiceByOrder = new Map(invoices.filter((i) => i.order != null).map((i) => [i.order, i.invoice_no]));
  const lastOrderByCustomer = new Map();
  orders.forEach((o) => {
    const when = o.created_at || o.order_date;
    const prev = lastOrderByCustomer.get(o.customer);
    if (!prev || when > prev) lastOrderByCustomer.set(o.customer, when);
  });
  const truckBySalesman = new Map();
  salesmen.forEach((s) => {
    const truck = s.trucks?.[0];
    if (truck) truckBySalesman.set(s.id, truck.plate_no || truck.truck_name);
  });
  return { customerById, walletByCustomer, invoiceByOrder, lastOrderByCustomer, truckBySalesman };
}

/** Code for a new record: readable prefix + upper-cased slug + time suffix. */
export function makeCode(prefix, text) {
  const slug = String(text || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 20);
  return `${prefix}-${slug || "NEW"}-${Date.now().toString().slice(-5)}`;
}

// ------------------------------------------------------------ zones & routes

/** API zone -> page zone. The routes that belong to it are listed by code. */
export function zoneFromApi(z, routes = []) {
  const codes = routes.filter((r) => r.zone === z.id).map((r) => r.code);
  return {
    id: z.id,
    zone: z.name,
    route_id: codes.join(", "),
    city: cityToPage(z.city),
    // The Zone model has no timestamps; show "-" rather than an invented date.
    creation_date: "-",
    updated_at: "-",
  };
}

/** API route -> page route. A route's city is its zone's city. */
export function routeFromApi(r, zonesById = new Map()) {
  const zone = zonesById.get(r.zone);
  return {
    id: r.id,
    route_id: r.code,
    name: r.name,
    zone: r.zone_name || zone?.name || "",
    city: cityToPage(zone?.city),
    salesman: r.salesman_name || "",
    creation_date: "-",
    updated_at: "-",
  };
}

// ------------------------------------------------------------------ salesmen

export function salesmanFromApi(s) {
  return {
    id: s.id,
    salesman_id: s.salesman_code,
    salesman_name: s.name,
    city: cityToPage(s.city),
    commission_schemes: Number(s.commission_rate) ? `${Number(s.commission_rate)}%` : "",
    access: "Salesman",
    registered_on: toDisplayDate(s.created_at),
    mobile: s.mobile,
    route: s.assigned_route || "",
  };
}

/** "5%" or "5" -> 5.00; anything else keeps the backend default. */
const parseRate = (text) => {
  const n = parseFloat(String(text || "").replace("%", ""));
  return Number.isFinite(n) ? n.toFixed(2) : undefined;
};

export function salesmanToApi(form, { isNew } = {}) {
  const city = cityToApi(form.city);
  const payload = {
    name: form.salesman_name.trim(),
    city: API_CITIES.includes(city) ? city : "AL AIN",
  };
  const rate = parseRate(form.commission_schemes);
  if (rate !== undefined) payload.commission_rate = rate;
  if (isNew) {
    payload.salesman_code = form.salesman_id.trim();
    // Mobile is required by the model but not asked for on this form.
    payload.mobile = form.mobile || "-";
  }
  return payload;
}

// ----------------------------------------------------------- wallets/recharges

/**
 * One row per recharge, plus one row for each wallet that has never been
 * recharged, so every wallet balance is visible.
 */
export function walletRowsFromApi(wallets = []) {
  const rows = [];
  wallets.forEach((w) => {
    const recharges = w.recharges || [];
    if (!recharges.length) {
      rows.push({
        id: `w${w.id}`,
        wallet_id: w.id,
        recharge_id: "-",
        customer_id: w.customer_code || "",
        customer_name: w.customer_name || "",
        coupon: "-",
        quantity: 0,
        amount: 0,
        salesman: "-",
        used_coupons: 0,
        remaining: Number(w.reward_points || 0),
        balance: Number(w.balance || 0),
        updated_on: toDisplayDate(w.updated_at),
      });
      return;
    }
    recharges.forEach((r) => {
      const paid = Number(r.amount || 0);
      const free = Number(r.bonus || 0);
      rows.push({
        id: `r${r.id}`,
        wallet_id: w.id,
        recharge_id: r.transaction_ref || `WR-${String(r.id).padStart(6, "0")}`,
        customer_id: w.customer_code || "",
        customer_name: w.customer_name || "",
        coupon: r.payment_method || "-",
        quantity: paid + free,
        amount: paid,
        salesman: "-",
        used_coupons: 0,
        remaining: Number(w.reward_points || 0),
        balance: Number(w.balance || 0),
        updated_on: toDisplayDate(r.created_at),
      });
    });
  });
  return rows.sort((a, b) => String(b.updated_on).localeCompare(String(a.updated_on)));
}

// ------------------------------------------------------------------ invoices

export function invoiceFromApi(inv, context = {}) {
  const { orderById = new Map(), customerById = new Map(), truckBySalesman = new Map() } = context;
  const order = orderById.get(inv.order);
  const customer = customerById.get(inv.customer);
  const mapped = order ? orderFromApi(order, { customerById, truckBySalesman }) : null;
  return {
    id: inv.id,
    invoice_no: inv.invoice_no,
    customer_name: inv.customer_name || customer?.name || "",
    customer_id: inv.customer_code || customer?.customer_code || "",
    salesman_name: mapped?.salesman_name || "",
    order_date: toDisplayDate(inv.invoice_date),
    truck: mapped?.truck || "",
    zone: customer?.zone || "",
    status: inv.status === "Paid" ? "Delivered" : inv.status,
    invoice_status: inv.status,
    subtotal: Number(inv.subtotal || 0).toFixed(2),
    tax_amount: Number(inv.tax_amount || 0).toFixed(2),
    total_amount: Number(inv.total_amount || 0).toFixed(2),
    items: mapped?.items || [],
  };
}

/** Orders with no invoice yet, grouped per customer - the "non-billed" list. */
export function nonBilledFromApi(orders = [], invoices = [], context = {}) {
  const { customerById = new Map(), truckBySalesman = new Map() } = context;
  const billed = new Set(invoices.map((i) => i.order).filter((x) => x != null));
  const groups = new Map();
  orders
    .filter((o) => !billed.has(o.id) && o.status !== "Cancelled")
    .forEach((o) => {
      const key = o.customer;
      const customer = customerById.get(o.customer);
      const g = groups.get(key) || {
        id: key,
        customer_pk: key,
        customer_name: o.customer_name || customer?.name || "",
        customer_id: o.customer_code || customer?.customer_code || "",
        truck_id: truckBySalesman.get(o.salesman) || o.route || "",
        pending_orders: 0,
        total: 0,
        orders: [],
      };
      g.pending_orders += 1;
      g.total += Number(o.total_amount || 0);
      g.orders.push(o);
      groups.set(key, g);
    });
  return [...groups.values()].map((g) => ({ ...g, total_amount: g.total.toFixed(2) }));
}

/** One invoice per order; UAE VAT is 5% on top of the order total. */
export function invoiceForOrder(order, sequence) {
  const subtotal = Number(order.total_amount || 0);
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const due = new Date();
  due.setDate(due.getDate() + 30);
  return {
    invoice_no: `INV-${new Date().getFullYear()}-${String(sequence).padStart(4, "0")}-${Date.now()
      .toString()
      .slice(-4)}`,
    order: order.id,
    customer: order.customer,
    due_date: due.toISOString().slice(0, 10),
    subtotal: subtotal.toFixed(2),
    tax_amount: tax.toFixed(2),
    total_amount: (subtotal + tax).toFixed(2),
    paid_amount: order.payment_status === "Paid" ? (subtotal + tax).toFixed(2) : "0.00",
    status: order.payment_status === "Paid" ? "Paid" : "Sent",
  };
}

// ------------------------------------------------------------------- cashier

/** Per-salesman collection summary: what they sold vs. what was handed in. */
export function salesmanCollectionsFromApi({ salesmen = [], orders = [], cashier = [] }) {
  return salesmen.map((s) => {
    const mine = orders.filter((o) => o.salesman === s.id && o.status !== "Cancelled");
    const total = mine.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
    const received = cashier
      .filter((t) => t.salesman === s.id)
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
    const latest = [...mine.map((o) => o.created_at), ...cashier.filter((t) => t.salesman === s.id).map((t) => t.created_at)]
      .filter(Boolean)
      .sort()
      .pop();
    return {
      id: s.id,
      salesman_pk: s.id,
      salesman_id: s.salesman_code,
      salesman_name: s.name,
      route_id: s.assigned_route || "",
      total_orders: mine.length,
      total_amount: total.toFixed(2),
      received_amount: received.toFixed(2),
      pending_amount: Math.max(0, total - received).toFixed(2),
      last_updated: toDisplayDate(latest),
    };
  });
}

export function collectedPaymentFromApi(t, salesmenById = new Map()) {
  const salesman = salesmenById.get(t.salesman);
  return {
    id: t.id,
    date: toDisplayDate(t.created_at),
    salesman_id: salesman?.salesman_code || (t.customer_name ? "-" : ""),
    amount: `AED ${Number(t.amount || 0).toFixed(2)}`,
    method: t.payment_method,
    from: t.salesman ? "Salesman" : "Customer",
    note: t.reference_note || t.payment_type || "-",
  };
}

/** Customers who owe money, with their unpaid orders. */
export function customerCreditsFromApi({ customers = [], orders = [] }) {
  return customers
    .filter((c) => c.status !== "Deleted" && Number(c.current_balance) > 0)
    .map((c) => {
      const unpaid = orders.filter((o) => o.customer === c.id && o.payment_status !== "Paid");
      const last = unpaid.map((o) => o.created_at || o.order_date).sort().pop();
      return {
        id: c.id,
        customer_pk: c.id,
        customer_id: c.customer_code,
        name: c.name,
        mobile: c.phone,
        total_due: Number(c.current_balance).toFixed(2),
        last_pending: toDisplayDate(last),
        pending_orders: unpaid.length,
      };
    });
}

/** A collection the cashier receives - from a salesman or a customer. */
export function collectionToApi({ amount, method, note, salesmanPk, customerPk }) {
  const methods = ["Cash", "Card", "Wallet", "Cheque", "Bank Transfer"];
  return {
    transaction_no: `CL-${Date.now().toString().slice(-8)}`,
    amount: Number(amount).toFixed(2),
    payment_type: customerPk ? "Credit Payment" : "Collection",
    payment_method: methods.includes(method) ? method : "Cash",
    reference_note: note || "",
    salesman: salesmanPk ?? null,
    customer: customerPk ?? null,
  };
}

// ------------------------------------------------------- products & trucks

export function storeItemFromApi(p) {
  const low = Number(p.stock_quantity) <= Number(p.min_stock);
  return {
    id: p.id,
    product_id: p.code,
    item: p.name,
    description: p.category,
    current_stock: String(p.stock_quantity),
    old_stock: "N/A",
    damaged: "N/A",
    discarded: "N/A",
    stock_color: low ? "amber" : "emerald",
    selling_price: p.selling_price,
  };
}

export function productToApi(form) {
  return {
    code: form.product_id.trim(),
    name: form.item.trim(),
    category: "Water 5 Gallon",
    unit: "Bottle",
    selling_price: form.price ? Number(form.price).toFixed(2) : "0.00",
    stock_quantity: 0,
  };
}

/** Load / Unload / Return movements -> per-product truck stock rows. */
function truckStocks(transactions = []) {
  const byItem = new Map();
  transactions.forEach((t) => {
    const row = byItem.get(t.product_name) || {
      item: t.product_name,
      added: 0,
      delivered: 0,
      used: 0,
      damaged: 0,
      balance: 0,
      returned: 0,
    };
    const qty = Number(t.quantity || 0);
    if (t.transaction_type === "Load") row.added += qty;
    else if (t.transaction_type === "Unload") row.delivered += qty;
    else if (t.transaction_type === "Return") row.returned += qty;
    row.balance = row.added - row.delivered - row.returned;
    byItem.set(t.product_name, row);
  });
  return [...byItem.values()];
}

export function truckFromApi(t) {
  const txs = t.stock_transactions || [];
  const latest = txs.map((x) => x.date).sort().pop() || t.last_service_date;
  return {
    id: t.id,
    truck_id: t.plate_no,
    truck_name: t.truck_name,
    in_charge: t.driver_name || "-",
    assistants: "-",
    route: t.route || "",
    status: t.status,
    last_updated: toDisplayDate(latest),
    last_updated_full: latest ? new Date(latest).toLocaleString() : "-",
    stocks: truckStocks(txs),
  };
}

/** Loaded vs delivered vs returned per product across every truck. */
export function productSummaryFromTrucks(trucks = []) {
  const byName = new Map();
  trucks.forEach((t) =>
    t.stocks.forEach((s) => {
      const row = byName.get(s.item) || { name: s.item, loaded: 0, delivered: 0, returned: 0 };
      row.loaded += s.added;
      row.delivered += s.delivered;
      row.returned += s.returned;
      byName.set(s.item, row);
    })
  );
  return [...byName.values()];
}

// ------------------------------------------------------------------- reports
// Each report row keeps the id of the database record behind it, so Delete
// on a report removes that record.

const aed = (n) => Number(n || 0).toFixed(2);

/** Salesman collection report: one row per salesman (Delete -> the salesman). */
export function salesmanReportFromApi({ salesmen = [], orders = [], cashier = [] }) {
  return salesmen.map((s) => {
    const mine = orders.filter((o) => o.salesman === s.id && o.status !== "Cancelled");
    const by = (m) => mine.filter((o) => o.payment_method === m).reduce((t, o) => t + Number(o.total_amount || 0), 0);
    const total = mine.reduce((t, o) => t + Number(o.total_amount || 0), 0);
    const collected = cashier.filter((t) => t.salesman === s.id).reduce((t, x) => t + Number(x.amount || 0), 0);
    return {
      id: s.id,
      salesman_pk: s.id,
      salesman: `${s.salesman_code} - ${s.name}`,
      route: s.assigned_route || "-",
      orders: mine.length,
      cash: aed(by("Cash")),
      card: aed(by("Card")),
      wallet: aed(by("Wallet")),
      credit: aed(by("Credit")),
      total: aed(total),
      collected: aed(collected),
      pending: aed(Math.max(0, total - collected)),
    };
  });
}

/** Customer report: one row per active customer (Delete -> moves the customer to Deleted). */
export function customerReportFromApi({ customers = [], orders = [], wallets = [] }) {
  return customers
    .filter((c) => c.status !== "Deleted")
    .map((c) => {
      const mine = orders.filter((o) => o.customer === c.id && o.status !== "Cancelled");
      const last = mine.map((o) => o.delivery_date || o.order_date || o.created_at).filter(Boolean).sort().pop();
      const wallet = wallets.find((w) => w.customer === c.id);
      const recharged = (wallet?.recharges || []).reduce((t, r) => t + Number(r.amount || 0), 0);
      return {
        id: c.customer_code,
        customer_pk: c.id,
        name: c.name,
        recent_delivery: toDisplayDate(last),
        total_orders: mine.length,
        order_revenue: `AED ${aed(mine.reduce((t, o) => t + Number(o.total_amount || 0), 0))}`,
        security_deposit: `AED ${aed(c.security_deposit)}`,
        wallet_recharge: `AED ${aed(recharged)}`,
        pending_payment: `AED ${aed(c.current_balance)}`,
      };
    });
}

/** Truck report: one row per truck per day of stock movements (Delete -> those stock transactions). */
export function truckReportFromApi(trucks = []) {
  const rows = [];
  trucks.forEach((t) => {
    const byDay = new Map();
    (t.stock_transactions || []).forEach((x) => {
      const day = toDisplayDate(x.date);
      const row = byDay.get(day) || {
        key: `${t.id}-${day}`,
        truck_pk: t.id,
        truck_id: t.plate_no,
        salesman: t.driver_name || "-",
        route: t.route || "-",
        date: day,
        loaded: 0,
        delivered: 0,
        returned: 0,
        messages: 0,
        tx_ids: [],
      };
      const q = Number(x.quantity || 0);
      if (x.transaction_type === "Load") row.loaded += q;
      else if (x.transaction_type === "Unload") row.delivered += q;
      else if (x.transaction_type === "Return") row.returned += q;
      row.messages += 1;
      row.tx_ids.push(x.id);
      byDay.set(day, row);
    });
    rows.push(...byDay.values());
  });
  return rows;
}

/** Commission report: one row per commission record (Delete -> that record). */
export function commissionReportFromApi(salesmen = []) {
  const rows = [];
  salesmen.forEach((s) =>
    (s.commissions || []).forEach((c) =>
      rows.push({
        id: c.id,
        salesman: s.name,
        city: s.city || "-",
        schemes: c.period || "-",
        total_sales: aed(c.total_sales),
        fixed_comm: "-",
        pct_comm: `${Number(s.commission_rate || 0)}%`,
        total_comm: aed(c.commission_amount),
      })
    )
  );
  return rows;
}
