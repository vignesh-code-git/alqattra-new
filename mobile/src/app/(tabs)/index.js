import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import Screen from '../../components/Screen';
import AppHeader from '../../components/AppHeader';
import Card from '../../components/Card';
import StatTile from '../../components/StatTile';
import QuickActionTile from '../../components/QuickActionTile';
import IconBadge from '../../components/IconBadge';
import SelectSheet from '../../components/SelectSheet';
import { Loading, ErrorState } from '../../components/StateView';
import useAsync from '../../lib/useAsync';
import api, { listOf } from '../../lib/api';
import { damageStore, useStore } from '../../lib/store';
import { aed, int } from '../../lib/format';
import { colors, spacing, typography, TAB_BAR_CLEARANCE } from '../../theme';

const QUICK_ACTIONS = [
  { icon: 'people-circle', set: 'ios', label: 'Daily Customers', color: colors.blue, href: '/daily-customers' },
  { icon: 'receipt-text-clock', label: 'Credit Orders', color: colors.orange, href: '/credit-orders' },
  { icon: 'file-tray-stacked', set: 'ios', label: 'Customer Assets', color: colors.teal, href: '/customer-assets' },
  { icon: 'wallet', label: 'Customer Wallet', color: colors.purple, href: '/customer-wallet' },
  { icon: 'account-multiple-plus', label: 'Add Assistant', color: colors.green, href: '/add-assistant' },
  { icon: 'package-variant-closed-remove', label: 'Damaged Items', color: colors.red, href: '/damaged-items' },
];

const COLLECTION_ROWS = [
  { key: 'Cash', icon: 'cash', label: 'Cash Collection', color: colors.green },
  { key: 'Card', icon: 'card', label: 'Card Collection', color: colors.blue },
  { key: 'Wallet', icon: 'wallet', label: 'Wallet Top-up', color: colors.indigo },
  { key: 'Deposit', icon: 'shield-checkmark', label: 'Security Deposits', color: colors.orange },
  { key: 'Settlement', icon: 'checkmark-done', label: 'Credit Settlements', color: colors.teal },
  { key: 'Return', icon: 'return-down-back', label: 'Payment Return', color: colors.red },
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

/** "Route 6350" - without doubling the word when the CRM value already has it. */
function routeLabel(route) {
  if (!route) return 'Route —';
  return /^route/i.test(route) ? route : `Route ${route}`;
}

export default function Dashboard() {
  const damage = useStore(damageStore);
  const [productId, setProductId] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data, error, loading, refreshing, reload } = useAsync(async () => {
    const [salesmenRaw, trucksRaw, productsRaw, ordersRaw, cashierRaw] = await Promise.all([
      api.salesmen(),
      api.trucks(),
      api.products(),
      api.orders({ ordering: '-order_date' }),
      api.cashier(),
    ]);
    return {
      salesmen: listOf(salesmenRaw),
      trucks: listOf(trucksRaw),
      products: listOf(productsRaw),
      orders: listOf(ordersRaw),
      cashier: listOf(cashierRaw),
    };
  }, []);

  const view = useMemo(() => {
    if (!data) return null;
    const today = todayISO();

    const salesman = data.salesmen[0] || null;
    const truck =
      data.trucks.find((t) => t.driver_salesman === salesman?.id) || data.trucks[0] || null;

    const todayOrders = data.orders.filter((o) => String(o.order_date).slice(0, 10) === today);
    // Fall back to the most recent orders so the screen is not blank on a quiet day.
    const scopedOrders = todayOrders.length ? todayOrders : data.orders.slice(0, 25);

    const sales = scopedOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
    const creditSale = scopedOrders
      .filter((o) => o.payment_method === 'Credit')
      .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
    const walletSale = scopedOrders.filter((o) => o.payment_method === 'Wallet').length;

    const todayCash = data.cashier.filter((c) => String(c.created_at).slice(0, 10) === today);
    const scopedCash = todayCash.length ? todayCash : data.cashier.slice(0, 50);
    const collections = scopedCash.reduce((sum, c) => sum + Number(c.amount || 0), 0);

    const byMethod = (method) =>
      scopedCash
        .filter((c) => c.payment_method === method)
        .reduce((sum, c) => sum + Number(c.amount || 0), 0);
    const byType = (type) =>
      scopedCash
        .filter((c) => c.payment_type === type)
        .reduce((sum, c) => sum + Number(c.amount || 0), 0);

    const selected = data.products.find((p) => p.id === productId) || data.products[0] || null;

    const totalStock = Number(selected?.stock_quantity || 0);
    // Damage is reported on the Damaged Items screen and kept on the device.
    const damaged = Number((selected && damage[selected.id]) || 0);
    const sold = scopedOrders.reduce((sum, o) => {
      const items = o.items || [];
      return (
        sum +
        items
          .filter((i) => i.product === selected?.id || i.product_name === selected?.name)
          .reduce((s, i) => s + Number(i.quantity || 0), 0)
      );
    }, 0);

    return {
      salesman,
      truck,
      products: data.products,
      selected,
      summary: { sales, collections, creditSale, walletSale },
      inventory: {
        total: totalStock,
        sold,
        damaged,
        remaining: Math.max(totalStock - sold - damaged, 0),
      },
      collections: {
        Cash: byMethod('Cash'),
        Card: byMethod('Card'),
        Wallet: byMethod('Wallet'),
        Deposit: 0,
        Settlement: byType('Credit Payment'),
        Return: byType('Refund'),
      },
    };
  }, [data, productId, damage]);

  return (
    <Screen>
      <AppHeader
        title="AlQattara Water"
        subtitle="Salesman Dashboard"
        trailingIcon="log-out-outline"
        onTrailingPress={() => {}}
      />

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error && view ? (
        <ScrollView
          contentContainerStyle={styles.scroll}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={reload}
              tintColor={colors.gray}
              colors={[colors.gray]}
            />
          }
        >
          {/* Welcome card */}
          <Card>
            <View style={styles.welcomeRow}>
              <View style={styles.flex}>
                <Text style={styles.welcomeLabel}>Welcome back</Text>
                <Text
                  style={[
                    styles.welcomeName,
                    (view.salesman?.name || '').length > 12 && styles.welcomeNameLong,
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {(view.salesman?.name || 'Salesman').toUpperCase()}
                </Text>
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="bus" size={16} color={colors.textMuted} />
                    <Text style={styles.metaText} numberOfLines={1}>
                      Truck {view.truck?.plate_no || view.truck?.truck_name || '—'}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="git-branch" size={16} color={colors.textMuted} />
                    <Text style={styles.metaText} numberOfLines={1}>
                      {routeLabel(view.salesman?.assigned_route)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.avatar}>
                <Ionicons name="person" size={28} color={colors.blue} />
              </View>
            </View>
          </Card>

          {/* Today's Summary */}
          <Text style={styles.section}>Today&apos;s Summary</Text>
          <Card padded={false}>
            <View style={styles.statRow}>
              <StatTile value={aed(view.summary.sales)} label="Sales" />
              <View style={styles.vline} />
              <StatTile value={aed(view.summary.collections)} label="Collections" />
            </View>
            <View style={styles.hline} />
            <View style={styles.statRow}>
              <StatTile value={aed(view.summary.creditSale)} label="Credit Sale" />
              <View style={styles.vline} />
              <StatTile value={int(view.summary.walletSale)} label="Wallet Sale" />
            </View>
          </Card>

          {/* Product Inventory */}
          <View style={styles.sectionRow}>
            <Text style={[styles.section, styles.sectionInline]}>Product Inventory</Text>
            <Pressable
              style={({ pressed }) => [styles.menuButton, pressed && styles.dim]}
              onPress={() => setSheetOpen(true)}
              hitSlop={8}
              accessibilityRole="button"
            >
              <Text style={styles.menuText} numberOfLines={1}>
                {view.selected?.name || 'Select'}
              </Text>
              <Ionicons name="chevron-expand" size={16} color={colors.blue} />
            </Pressable>
          </View>
          <Card padded={false}>
            <View style={styles.statRow}>
              <StatTile value={int(view.inventory.total)} label="Total Stock" />
              <View style={styles.vline} />
              <StatTile value={int(view.inventory.sold)} label="Sold" color={colors.green} />
              <View style={styles.vline} />
              <StatTile value={int(view.inventory.damaged)} label="Damaged" color={colors.red} />
              <View style={styles.vline} />
              <StatTile value={int(view.inventory.remaining)} label="Remaining" color={colors.blue} />
            </View>
          </Card>

          {/* Quick Actions */}
          <Text style={styles.section}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            {QUICK_ACTIONS.map((a) => (
              <QuickActionTile
                key={a.label}
                icon={a.icon}
                set={a.set}
                label={a.label}
                color={a.color}
                onPress={() => router.push(a.href)}
              />
            ))}
          </View>

          {/* Collection Details */}
          <Text style={styles.section}>Collection Details</Text>
          <Card padded={false}>
            {COLLECTION_ROWS.map((row, i) => (
              <View key={row.key} style={styles.collectionRow}>
                <IconBadge icon={row.icon} color={row.color} />
                <View
                  style={[
                    styles.collectionBody,
                    i < COLLECTION_ROWS.length - 1 && styles.rowDivider,
                  ]}
                >
                  <Text style={styles.collectionLabel}>{row.label}</Text>
                  <Text style={styles.collectionAmount}>{aed(view.collections[row.key])}</Text>
                </View>
              </View>
            ))}
          </Card>
        </ScrollView>
      ) : null}

      <SelectSheet
        visible={sheetOpen}
        title="Select Product"
        value={view?.selected?.id}
        options={(view?.products || []).map((p) => ({ value: p.id, label: p.name }))}
        onSelect={setProductId}
        onClose={() => setSheetOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  dim: { opacity: 0.4 },
  scroll: {
    paddingHorizontal: spacing.page,
    paddingTop: spacing.sm,
    paddingBottom: TAB_BAR_CLEARANCE,
  },

  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },

  // Welcome card
  welcomeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  welcomeLabel: { ...typography.subhead, color: colors.textMuted },
  welcomeName: { ...typography.title1, marginTop: 2 },
  // Long names drop a size so they are not cut off beside the avatar.
  welcomeNameLong: { fontSize: 21, lineHeight: 27 },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: spacing.lg,
    rowGap: 4,
    marginTop: spacing.md,
  },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { ...typography.subhead, color: colors.textMuted },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.blueTint,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Section headers
  section: { ...typography.title2, marginTop: 28, marginBottom: spacing.sm },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginTop: 28,
    marginBottom: spacing.sm,
  },
  sectionInline: { marginTop: 0, marginBottom: 0, flexShrink: 0 },
  menuButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 2,
    paddingBottom: 3,
  },
  menuText: { ...typography.body, color: colors.blue, flexShrink: 1 },

  // Stat grids
  statRow: { flexDirection: 'row', alignItems: 'stretch' },
  vline: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
    marginVertical: spacing.md,
  },
  hline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
    marginHorizontal: spacing.lg,
  },

  // Icons sit straight on the page background, as on the iPhone home screen.
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing.xl,
    paddingTop: spacing.sm,
  },

  // Collection list
  collectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingLeft: spacing.lg,
  },
  collectionBody: {
    flex: 1,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingRight: spacing.lg,
    paddingVertical: 11,
  },
  collectionLabel: { ...typography.body, flexShrink: 1 },
  collectionAmount: {
    ...typography.body,
    fontWeight: '600',
    color: colors.blue,
    fontVariant: ['tabular-nums'],
  },
});
