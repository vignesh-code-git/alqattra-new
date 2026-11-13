import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, Alert, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../../components/Screen';
import AppHeader from '../../components/AppHeader';
import Card from '../../components/Card';
import Button from '../../components/Button';
import SearchBar from '../../components/SearchBar';
import SelectSheet from '../../components/SelectSheet';
import UnderlineTabs from '../../components/UnderlineTabs';
import { Loading, ErrorState } from '../../components/StateView';
import useAsync from '../../lib/useAsync';
import api, { listOf } from '../../lib/api';
import { fetchSession } from '../../lib/session';
import { shortDate, dateTime } from '../../lib/format';
import { colors, spacing, radius, typography, TAB_BAR_CLEARANCE } from '../../theme';

const TABS = ['Assigned', 'Completed'];
const COMPLETED = ['Delivered', 'Cancelled'];
const ALL = '__all__';
const PAYMENT_FILTERS = [
  { value: ALL, label: 'All Payments' },
  { value: 'Cash', label: 'Cash' },
  { value: 'Card', label: 'Card' },
  { value: 'Wallet', label: 'Wallet' },
  { value: 'Credit', label: 'Credit' },
];

const STATUS_TONE = {
  Delivered: { bg: colors.greenTint, fg: colors.successText },
  Cancelled: { bg: colors.redTint, fg: colors.red },
};

function MetaLine({ icon, children }) {
  return (
    <View style={styles.metaLine}>
      <Ionicons name={icon} size={14} color={colors.gray} />
      <Text style={styles.metaText} numberOfLines={1}>
        {children}
      </Text>
    </View>
  );
}

function OrderCard({ order, zone, invoiceNo, truckName }) {
  const items = order.items || [];
  const credit = order.payment_method === 'Credit';
  const tone = STATUS_TONE[order.status] || { bg: colors.orangeTint, fg: colors.warningText };

  return (
    <Card style={styles.card}>
      <View style={styles.head}>
        <Text style={styles.orderNo} numberOfLines={1}>
          #{order.order_no}
        </Text>
        {credit ? (
          <View style={styles.creditBadge}>
            <Text style={styles.creditText}>CREDIT</Text>
          </View>
        ) : null}
        <View style={[styles.statusBadge, { backgroundColor: tone.bg }]}>
          <Text style={[styles.statusText, { color: tone.fg }]}>{order.status.toUpperCase()}</Text>
        </View>
      </View>

      {invoiceNo ? (
        <View style={styles.invChip}>
          <Ionicons name="document-text" size={13} color={colors.textMuted} />
          <Text style={styles.invText}>INV: {invoiceNo}</Text>
        </View>
      ) : null}

      <View style={styles.personLine}>
        <Ionicons name="person" size={16} color={colors.textMuted} />
        <Text style={styles.customer} numberOfLines={1}>
          {order.customer_name || 'Unknown customer'}
        </Text>
      </View>
      <View style={styles.personLine}>
        <Ionicons name="location" size={16} color={colors.textMuted} />
        <Text style={styles.place} numberOfLines={1}>
          {[zone, order.city].filter(Boolean).join(', ').toUpperCase() || '—'}
        </Text>
      </View>

      <Text style={styles.itemsTitle}>Order Items ({items.length})</Text>
      {items.length === 0 ? (
        order.notes ? <Text style={styles.notes}>{order.notes}</Text> : null
      ) : (
        <View style={styles.itemGroup}>
          {items.map((item, i) => (
            <View key={item.id} style={[styles.itemRow, i < items.length - 1 && styles.itemDivider]}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.product_name}
              </Text>
              <View style={styles.itemBottom}>
                <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                <Text style={styles.itemPrice}>{Number(item.unit_price).toFixed(2)} AED</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      <View>
        <Text style={styles.total}>{Number(order.total_amount || 0)} AED</Text>
        <Text style={styles.payment}>{order.payment_method}</Text>
      </View>

      <View style={styles.metaBlock}>
        {truckName ? <MetaLine icon="bus">Truck: {truckName}</MetaLine> : null}
        <MetaLine icon="time-outline">{dateTime(order.created_at || order.order_date)}</MetaLine>
        {order.delivery_date ? (
          <MetaLine icon="bus-outline">Delivered: {shortDate(order.delivery_date)}</MetaLine>
        ) : null}
      </View>

      <Button
        label="Print Invoice"
        icon="print"
        tone="primary"
        size="md"
        onPress={() =>
          Alert.alert('Print Invoice', 'Printing needs a Bluetooth printer integration, which is not set up yet.')
        }
      />
      <Button
        label="Generate IR Number"
        icon="print"
        tone="primary"
        size="md"
        onPress={() => Alert.alert('Generate IR Number', 'The CRM has no IR number endpoint yet.')}
      />
    </Card>
  );
}

export default function Orders() {
  const [tab, setTab] = useState('Assigned');
  const [search, setSearch] = useState('');
  const [payment, setPayment] = useState(ALL);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data, error, loading, refreshing, reload } = useAsync(async () => {
    const [ordersRaw, customersRaw, invoicesRaw, session] = await Promise.all([
      api.orders(),
      api.customers(),
      api.invoices(),
      fetchSession(),
    ]);
    return {
      orders: listOf(ordersRaw),
      customers: listOf(customersRaw),
      invoices: listOf(invoicesRaw),
      session,
    };
  }, []);

  const zoneByCustomer = useMemo(() => {
    const map = new Map();
    (data?.customers || []).forEach((c) => map.set(c.id, c.zone));
    return map;
  }, [data]);

  const invoiceByOrder = useMemo(() => {
    const map = new Map();
    (data?.invoices || []).forEach((inv) => inv.order != null && map.set(inv.order, inv.invoice_no));
    return map;
  }, [data]);

  const inTab = useMemo(
    () =>
      (data?.orders || []).filter((o) =>
        tab === 'Completed' ? COMPLETED.includes(o.status) : !COMPLETED.includes(o.status),
      ),
    [data, tab],
  );

  const orders = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inTab.filter((o) => {
      if (payment !== ALL && o.payment_method !== payment) return false;
      if (!q) return true;
      return [o.order_no, o.customer_name, zoneByCustomer.get(o.customer), o.city, o.route]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [inTab, search, payment, zoneByCustomer]);

  const truck = data?.session?.truck;
  const filtered = payment !== ALL;

  return (
    <Screen>
      <AppHeader title="Orders" />
      <UnderlineTabs options={TABS} value={tab} onChange={setTab} />

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <FlatList
          data={orders}
          keyExtractor={(o) => String(o.id)}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={reload}
              tintColor={colors.gray}
              colors={[colors.gray]}
            />
          }
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <View style={styles.searchRow}>
                <View style={styles.flex}>
                  <SearchBar
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search orders, customers, zones..."
                  />
                </View>
                <Pressable
                  onPress={() => setSheetOpen(true)}
                  style={({ pressed }) => [
                    styles.filterBtn,
                    filtered && styles.filterBtnActive,
                    pressed && styles.dim,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Filter orders"
                >
                  <Ionicons name="filter" size={18} color={filtered ? colors.textInverse : colors.text} />
                </Pressable>
              </View>
              <Text style={styles.count}>
                {orders.length} of {inTab.length} orders
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="clipboard" size={56} color={colors.gray3} />
              <Text style={styles.emptyTitle}>No orders found</Text>
              <Text style={styles.emptyBody}>Pull down to refresh</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.cardWrap}>
              <OrderCard
                order={item}
                zone={zoneByCustomer.get(item.customer)}
                invoiceNo={invoiceByOrder.get(item.id)}
                truckName={truck?.plate_no || truck?.truck_name}
              />
            </View>
          )}
        />
      ) : null}

      <SelectSheet
        visible={sheetOpen}
        title="Filter Orders"
        value={payment}
        options={PAYMENT_FILTERS}
        onSelect={setPayment}
        onClose={() => setSheetOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  dim: { opacity: 0.4 },
  list: { paddingBottom: TAB_BAR_CLEARANCE, flexGrow: 1 },

  listHeader: {
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
    marginBottom: spacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.page,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  filterBtn: {
    width: 40,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.fill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBtnActive: { backgroundColor: colors.blue },
  count: { ...typography.subhead, color: colors.textMuted, paddingHorizontal: spacing.page, paddingVertical: 9 },

  cardWrap: { paddingHorizontal: spacing.page },
  card: { marginBottom: spacing.md, gap: spacing.sm },
  head: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  orderNo: { ...typography.title3, fontWeight: '700', flex: 1 },
  creditBadge: {
    backgroundColor: colors.red,
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  creditText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3, color: colors.textInverse },
  statusBadge: { borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.3 },

  invChip: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginLeft: spacing.lg,
  },
  invText: { fontSize: 12, fontWeight: '600', color: colors.textMuted },

  personLine: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  customer: { ...typography.headline, flex: 1 },
  place: { ...typography.subhead, color: colors.textMuted, flex: 1 },

  itemsTitle: { ...typography.subhead, fontWeight: '600', marginTop: spacing.xs },
  notes: { ...typography.footnote },
  itemGroup: { backgroundColor: colors.surfaceAlt, borderRadius: radius.md },
  itemRow: { paddingHorizontal: spacing.md, paddingVertical: 10, gap: 3 },
  itemDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.separator },
  itemName: { ...typography.subhead, fontWeight: '600' },
  itemBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemQty: { ...typography.footnote },
  itemPrice: { fontSize: 13, fontWeight: '700', color: colors.successText, fontVariant: ['tabular-nums'] },

  total: { ...typography.title3, fontWeight: '700', color: colors.red, marginTop: spacing.xs, fontVariant: ['tabular-nums'] },
  payment: { ...typography.footnote, marginTop: 1 },

  metaBlock: { gap: 3, marginBottom: spacing.xs },
  metaLine: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { ...typography.footnote, flexShrink: 1 },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4, paddingTop: 60, paddingBottom: 60 },
  emptyTitle: { ...typography.headline, color: colors.textMuted, marginTop: spacing.md },
  emptyBody: { ...typography.subhead, color: colors.textSubtle },
});
