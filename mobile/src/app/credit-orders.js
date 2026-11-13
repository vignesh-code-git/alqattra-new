import { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../components/Screen';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import SelectSheet from '../components/SelectSheet';
import Button from '../components/Button';
import { Loading, ErrorState, Empty } from '../components/StateView';
import useAsync from '../lib/useAsync';
import api, { listOf } from '../lib/api';
import { shortDate } from '../lib/format';
import { colors, spacing, radius, typography } from '../theme';

const ALL_ZONES = '__all__';

function Chip({ icon, label }) {
  return (
    <View style={styles.chip}>
      <Ionicons name={icon} size={12} color={colors.blue} />
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

function OrderCard({ order, zone, expanded, onToggle, onCall }) {
  const items = order.items || [];
  const qty = items.reduce((s, i) => s + Number(i.quantity || 0), 0);
  const balance = Number(order.total_amount || 0) - Number(order.paid_amount || 0);

  return (
    <Card padded={false} style={styles.orderCard}>
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => [styles.orderMain, pressed && styles.rowPressed]}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
      >
        <View style={styles.orderHead}>
          <Text style={styles.orderNo} numberOfLines={1}>
            #{order.order_no}
          </Text>
          <Chip icon="cube" label={`${items.length} items`} />
          <Chip icon="grid" label={`Qty: ${qty}`} />
          <View style={styles.flex} />
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.textMuted}
          />
        </View>

        <View style={styles.line}>
          <Ionicons name="person" size={16} color={colors.blue} />
          <Text style={styles.customer} numberOfLines={1}>
            {(order.customer_name || 'Unknown customer').toUpperCase()}
          </Text>
        </View>

        <View style={styles.line}>
          <Ionicons name="location" size={16} color={colors.textMuted} />
          <Text style={styles.metaText} numberOfLines={1}>
            {[zone, order.city].filter(Boolean).join(', ').toUpperCase() || '—'}
          </Text>
        </View>

        <View style={styles.dateRow}>
          <View style={styles.line}>
            <Ionicons name="time-outline" size={16} color={colors.textMuted} />
            <Text style={styles.metaText}>{shortDate(order.order_date)}</Text>
          </View>
          <Text style={styles.amount}>{Number(order.total_amount || 0).toFixed(2)} AED</Text>
        </View>

        {balance > 0 ? (
          <View style={styles.balanceBadge}>
            <Ionicons name="time-outline" size={15} color={colors.warningText} />
            <Text style={styles.balanceText}>Balance: {balance.toFixed(2)} AED</Text>
          </View>
        ) : null}

        <View style={styles.line}>
          <Ionicons name="card" size={15} color={colors.textMuted} />
          <Text style={styles.metaText}>{order.payment_method}</Text>
        </View>
      </Pressable>

      {expanded ? (
        <View style={styles.details}>
          <Text style={styles.detailsTitle}>Order Details:</Text>

          {items.length === 0 ? (
            <Text style={styles.metaText}>{order.notes || 'No line items recorded.'}</Text>
          ) : (
            items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Ionicons name="cube" size={18} color={colors.blue} />
                <View style={styles.flex}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.product_name}
                  </Text>
                  <Text style={styles.itemMeta}>
                    Unit: {Number(item.unit_price).toFixed(2)} AED
                  </Text>
                </View>
                <View style={styles.itemRight}>
                  <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                  <Text style={styles.itemPrice}>{Number(item.total_price).toFixed(2)} AED</Text>
                </View>
              </View>
            ))
          )}

          <View style={styles.actions}>
            <Button
              label="Update Order"
              icon="pencil"
              tone="primary"
              size="md"
              style={styles.flex}
              onPress={() =>
                Alert.alert('Update Order', 'Editing an order from the phone is not available yet.')
              }
            />
            <Button
              label="Call Customer"
              icon="call"
              tone="outlineGreen"
              size="md"
              style={styles.flex}
              onPress={onCall}
            />
          </View>
        </View>
      ) : null}
    </Card>
  );
}

export default function CreditOrders() {
  const [search, setSearch] = useState('');
  const [zone, setZone] = useState(ALL_ZONES);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const { data, error, loading, refreshing, reload } = useAsync(async () => {
    const [ordersRaw, customersRaw, zonesRaw] = await Promise.all([
      api.orders({ search: search || undefined }),
      api.customers(),
      api.zones(),
    ]);
    return {
      orders: listOf(ordersRaw),
      customers: listOf(customersRaw),
      zones: listOf(zonesRaw),
    };
  }, [search]);

  const customerById = useMemo(() => {
    const map = new Map();
    (data?.customers || []).forEach((c) => map.set(c.id, c));
    return map;
  }, [data]);

  const creditOrders = useMemo(() => {
    const all = (data?.orders || []).filter((o) => o.payment_method === 'Credit');
    if (zone === ALL_ZONES) return all;
    return all.filter((o) => customerById.get(o.customer)?.zone === zone);
  }, [data, zone, customerById]);

  const zoneOptions = useMemo(
    () => [
      { value: ALL_ZONES, label: 'All Zones' },
      ...(data?.zones || []).map((z) => ({ value: z.name, label: z.name })),
    ],
    [data],
  );

  const callCustomer = (order) => {
    const phone = customerById.get(order.customer)?.phone;
    if (phone) Linking.openURL(`tel:${phone}`);
  };

  const filtered = zone !== ALL_ZONES;

  return (
    <Screen>
      <AppHeader title="Credit Orders" showBack />

      <View style={styles.filters}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search by customer name..."
        />
        <Pressable
          style={({ pressed }) => [
            styles.zonePill,
            filtered && styles.zonePillActive,
            pressed && styles.dim,
          ]}
          onPress={() => setSheetOpen(true)}
          accessibilityRole="button"
        >
          <Ionicons name="location" size={15} color={filtered ? colors.blue : colors.text} />
          <Text style={[styles.zoneText, filtered && styles.zoneTextActive]} numberOfLines={1}>
            {filtered ? zone : 'Zone'}
          </Text>
          <Ionicons name="chevron-down" size={14} color={filtered ? colors.blue : colors.text} />
        </Pressable>
      </View>

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <FlatList
          data={creditOrders}
          keyExtractor={(o) => String(o.id)}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={reload}
              tintColor={colors.gray}
              colors={[colors.gray]}
            />
          }
          ListHeaderComponent={
            <Text style={styles.count}>
              {creditOrders.length} credit order{creditOrders.length === 1 ? '' : 's'} found
            </Text>
          }
          ListEmptyComponent={<Empty icon="receipt-outline" label="No Credit Orders" />}
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              zone={customerById.get(item.customer)?.zone}
              expanded={expandedId === item.id}
              onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
              onCall={() => callCustomer(item)}
            />
          )}
        />
      ) : null}

      <SelectSheet
        visible={sheetOpen}
        title="Select Zone"
        value={zone}
        options={zoneOptions}
        onSelect={setZone}
        onClose={() => setSheetOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  dim: { opacity: 0.4 },

  filters: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.page,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  zonePill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 34,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.gray4,
    maxWidth: '80%',
  },
  zonePillActive: { borderColor: colors.blue, backgroundColor: colors.blueTint },
  zoneText: { ...typography.subhead, flexShrink: 1 },
  zoneTextActive: { color: colors.blue, fontWeight: '600' },

  list: { padding: spacing.page, paddingBottom: 40 },
  count: { ...typography.footnote, marginBottom: spacing.sm },

  orderCard: { marginBottom: spacing.md },
  orderMain: { padding: spacing.lg, gap: 7 },
  rowPressed: { backgroundColor: colors.gray5 },
  orderHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  orderNo: { ...typography.headline, color: colors.blue, flexShrink: 1 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.blueTint,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  chipText: { fontSize: 12, fontWeight: '600', color: colors.blue },

  line: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  customer: { ...typography.headline, flex: 1 },
  metaText: { ...typography.subhead, color: colors.textMuted, flexShrink: 1 },
  dateRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  amount: { ...typography.headline, color: colors.red, fontVariant: ['tabular-nums'] },

  balanceBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.orangeTint,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  balanceText: { fontSize: 14, fontWeight: '700', color: colors.warningText },

  details: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
  detailsTitle: { ...typography.subhead, fontWeight: '700' },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderLeftWidth: 3,
    borderLeftColor: colors.blue,
    borderRadius: radius.sm,
    padding: spacing.md,
  },
  itemName: { ...typography.subhead, fontWeight: '700' },
  itemMeta: { ...typography.footnote, marginTop: 1 },
  itemRight: { alignItems: 'flex-end' },
  itemQty: { ...typography.subhead, fontWeight: '700', color: colors.blue },
  itemPrice: { ...typography.subhead, fontWeight: '700', color: colors.red, marginTop: 1 },

  actions: { flexDirection: 'row', gap: spacing.sm },
});
