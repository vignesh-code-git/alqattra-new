import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../components/Screen';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import SelectSheet from '../components/SelectSheet';
import { Loading, ErrorState } from '../components/StateView';
import useAsync from '../lib/useAsync';
import api, { listOf } from '../lib/api';
import { fetchSession } from '../lib/session';
import { damageStore, useStore } from '../lib/store';
import { int } from '../lib/format';
import { colors, spacing, radius, typography } from '../theme';

const QUANTITIES = [1, 2, 3, 5, 10];

function InfoCell({ label, value }) {
  return (
    <View style={styles.infoCell}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function StockCell({ icon, color, label, value }) {
  return (
    <View style={styles.stockCell}>
      <Ionicons name={icon} size={16} color={color} />
      <Text style={styles.stockLabel}>{label}</Text>
      <Text style={styles.stockValue}>{int(value)}</Text>
    </View>
  );
}

export default function DamagedItems() {
  const damage = useStore(damageStore);
  const [reportFor, setReportFor] = useState(null); // product being reported
  const [loadedAt, setLoadedAt] = useState(null);

  const { data, error, loading, refreshing, reload } = useAsync(async () => {
    const [session, productsRaw, ordersRaw] = await Promise.all([
      fetchSession(),
      api.products(),
      api.orders(),
    ]);
    setLoadedAt(new Date());
    return { session, products: listOf(productsRaw), orders: listOf(ordersRaw) };
  }, []);

  const rows = useMemo(() => {
    if (!data) return [];
    const transactions = data.session.truck?.stock_transactions || [];
    return data.products.map((p) => {
      const mine = transactions.filter((t) => t.product_name === p.name);
      const sum = (type) =>
        mine.filter((t) => t.transaction_type === type).reduce((s, t) => s + Number(t.quantity || 0), 0);

      // With no truck loads recorded, fall back to the warehouse quantity so the
      // figures agree with the dashboard.
      const added = sum('Load') || Number(p.stock_quantity || 0);
      const delivered = data.orders.reduce(
        (s, o) =>
          s +
          (o.items || [])
            .filter((i) => i.product === p.id)
            .reduce((q, i) => q + Number(i.quantity || 0), 0),
        0,
      );
      const returned = sum('Return');
      const damaged = Number(damage[p.id] || 0);
      return {
        product: p,
        added,
        delivered,
        returned,
        damaged,
        current: Math.max(added - delivered - damaged, 0),
      };
    });
  }, [data, damage]);

  const { salesman, truck } = data?.session || {};

  return (
    <Screen>
      <AppHeader title="Damaged Items" showBack />

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error ? (
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
          {/* Truck information */}
          <Card>
            <View style={styles.cardHead}>
              <Ionicons name="bus" size={20} color={colors.blue} />
              <Text style={styles.cardTitle}>Truck Information</Text>
              <Pressable
                onPress={reload}
                hitSlop={10}
                style={({ pressed }) => [styles.refresh, pressed && styles.dim]}
                accessibilityLabel="Refresh"
              >
                <Ionicons name="refresh" size={16} color={colors.blue} />
              </Pressable>
            </View>

            <View style={styles.infoGrid}>
              <InfoCell label="Truck ID" value={truck?.plate_no || truck?.truck_name || '—'} />
              <InfoCell label="Salesman" value={salesman?.salesman_code || '—'} />
              <InfoCell label="Route" value={salesman?.assigned_route || truck?.route || '—'} />
              <InfoCell label="City" value={salesman?.city || '—'} />
            </View>

            <View style={styles.updated}>
              <Ionicons name="time-outline" size={14} color={colors.gray} />
              <Text style={styles.updatedText}>
                Last Updated: {loadedAt ? loadedAt.toLocaleString('en-AE') : '—'}
              </Text>
            </View>
          </Card>

          <View style={styles.sectionRow}>
            <Ionicons name="file-tray-full" size={22} color={colors.blue} />
            <Text style={styles.section}>Product Inventory</Text>
          </View>

          {rows.map(({ product, added, delivered, returned, damaged, current }) => (
            <Card key={product.id} style={styles.productCard}>
              <Text style={styles.productName} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.productId}>ID: {product.code}</Text>

              <View style={styles.currentRow}>
                <Ionicons name="cube" size={16} color={colors.blue} />
                <Text style={styles.currentLabel}>Current Stock</Text>
                <Text style={styles.currentValue}>{int(current)}</Text>
              </View>

              <View style={styles.stockGrid}>
                <StockCell icon="add-circle" color={colors.green} label="Added" value={added} />
                <StockCell icon="bus" color={colors.blue} label="Delivered" value={delivered} />
                <StockCell
                  icon="return-down-back"
                  color={colors.orange}
                  label="Returned"
                  value={returned}
                />
                <StockCell icon="warning" color={colors.red} label="Damaged" value={damaged} />
              </View>

              <Button
                label="Report Damage"
                icon="alert-circle"
                tone="warning"
                size="md"
                onPress={() => setReportFor(product)}
              />
              {damaged > 0 ? (
                <Pressable
                  onPress={() => damageStore.set((prev) => ({ ...prev, [product.id]: 0 }))}
                  hitSlop={8}
                  style={({ pressed }) => [styles.reset, pressed && styles.dim]}
                >
                  <Text style={styles.resetText}>Clear damage report</Text>
                </Pressable>
              ) : null}
            </Card>
          ))}
        </ScrollView>
      ) : null}

      <SelectSheet
        visible={reportFor != null}
        title="Damaged Quantity"
        value={null}
        options={QUANTITIES.map((q) => ({ value: q, label: `${q} ${q === 1 ? 'unit' : 'units'}` }))}
        onSelect={(qty) =>
          damageStore.set((prev) => ({
            ...prev,
            [reportFor.id]: Number(prev[reportFor.id] || 0) + qty,
          }))
        }
        onClose={() => setReportFor(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  dim: { opacity: 0.4 },
  scroll: { paddingHorizontal: spacing.page, paddingTop: spacing.lg, paddingBottom: 40 },

  cardHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  cardTitle: { ...typography.headline, flex: 1 },
  refresh: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.blueTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.md, rowGap: spacing.md },
  infoCell: { width: '50%' },
  infoLabel: { ...typography.sectionHeader, fontSize: 12 },
  infoValue: { ...typography.headline, marginTop: 1 },
  updated: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
  updatedText: { ...typography.footnote },

  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 28,
    marginBottom: spacing.md,
  },
  section: { ...typography.title3, fontWeight: '700' },

  productCard: { marginBottom: spacing.md, gap: spacing.sm },
  productName: { ...typography.headline },
  productId: { ...typography.footnote, marginTop: -6 },
  currentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.blueTint,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 40,
  },
  currentLabel: { ...typography.subhead, color: colors.blue, flex: 1 },
  currentValue: { ...typography.headline, color: colors.blue, fontVariant: ['tabular-nums'] },

  stockGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  stockCell: {
    flexGrow: 1,
    flexBasis: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 38,
  },
  stockLabel: { ...typography.footnote, flex: 1 },
  stockValue: { ...typography.subhead, fontWeight: '600', fontVariant: ['tabular-nums'] },

  reset: { alignSelf: 'center', paddingVertical: 2 },
  resetText: { ...typography.footnote, color: colors.blue },
});
