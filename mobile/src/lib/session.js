import api, { listOf } from './api';

/**
 * Who is using the app. There is no login screen in the designs and the API
 * is open, so the session is the first salesman the CRM returns, with the
 * truck assigned to them.
 */
export async function fetchSession() {
  const salesmen = listOf(await api.salesmen());
  const salesman = salesmen[0] || null;
  const truck = salesman?.trucks?.[0] || null;
  return { salesman, truck, salesmen };
}

/** Short code used in order numbers, e.g. the truck plate. */
export function truckCode(truck) {
  return (truck?.plate_no || truck?.truck_name || 'APP').replace(/\s+/g, '');
}
