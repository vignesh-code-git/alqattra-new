import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import Screen from '../components/Screen';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import CustomerBar from '../components/CustomerBar';
import SearchBar from '../components/SearchBar';
import SelectSheet from '../components/SelectSheet';
import { Loading, ErrorState } from '../components/StateView';
import useAsync from '../lib/useAsync';
import api, { listOf } from '../lib/api';
import { shortDate } from '../lib/format';
import { colors, spacing, typography } from '../theme';

const money = (value) => {
  const n = Number(value || 0);
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
};

function Stat({ icon, color, label, value }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function RechargeCard({ recharge }) {
  const paid = Number(recharge.amount || 0);
  const free = Number(recharge.bonus || 0);

  return (
    <Card padded={false} style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.flex}>
          <Text style={styles.amount}>AED {money(paid)}</Text>
          <Text style={styles.date}>{shortDate(recharge.created_at)}</Text>
          <Text style={styles.invoice} numberOfLines={1}>
            Invoice: {recharge.transaction_ref || '—'}
          </Text>
          <Text style={styles.offer}>Offer: {free > 0 ? `+${money(free)} free` : 'None'}</Text>
          <View style={styles.itemsLine}>
            <Ionicons name="cart" size={15} color={colors.gray} />
            <Text style={styles.itemsText}>Paid by: {recharge.payment_method}</Text>
          </View>
        </View>
        <Button
          label="Print"
          icon="receipt"
          tone="primary"
          size="md"
          style={styles.printBtn}
          onPress={() =>
            Alert.alert(
              'Print Receipt',
              'Printing needs a Bluetooth printer integration, which is not set up yet.',
            )
          }
        />
      </View>

      <View style={styles.stats}>
        <Stat icon="pricetag" color={colors.blue} label="Paid" value={money(paid)} />
        <Stat icon="gift" color={colors.green} label="Free" value={money(free)} />
        <Stat icon="checkmark-circle" color={colors.teal} label="Active" value={money(paid + free)} />
      </View>
    </Card>
  );
}

export default function CustomerWallet() {
  const [walletId, setWalletId] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState('');

  const { data, error, loading, refreshing, reload } = useAsync(async () => {
    const walletsRaw = await api.wallets();
    return { wallets: listOf(walletsRaw) };
  }, []);

  const wallets = data?.wallets || [];
  const wallet = useMemo(
    () => wallets.find((w) => w.id === walletId) || null,
    [wallets, walletId],
  );

  const recharges = useMemo(() => {
    const all = wallet?.recharges || [];
    const q = search.trim().toLowerCase();
    if (!q) return all;
    return all.filter((r) =>
      [r.transaction_ref, r.payment_method, r.amount, shortDate(r.created_at)]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [wallet, search]);

  return (
    <Screen>
      <AppHeader title="Customer Wallet" showBack />

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <>
          <CustomerBar
            name={wallet?.customer_name}
            code={wallet?.customer_code}
            onPress={() => setSheetOpen(true)}
          />

          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={reload}
                tintColor={colors.gray}
                colors={[colors.gray]}
              />
            }
          >
            <Button
              label="Recharge Wallet"
              icon="logo-usd"
              tone="success"
              onPress={() =>
                router.push({
                  pathname: '/select-offer',
                  params: wallet ? { customer: wallet.customer_name, walletId: String(wallet.id) } : {},
                })
              }
            />

            <View style={styles.historyHead}>
              <Text style={styles.section}>Recharge History</Text>
              <Pressable
                onPress={() => {
                  setSearching((s) => !s);
                  setSearch('');
                }}
                style={({ pressed }) => [styles.searchCircle, pressed && styles.dim]}
                accessibilityRole="button"
                accessibilityLabel="Search recharge history"
              >
                <Ionicons name={searching ? 'close' : 'search'} size={18} color={colors.blue} />
              </Pressable>
            </View>

            {searching ? (
              <SearchBar value={search} onChangeText={setSearch} placeholder="Search history" />
            ) : null}

            {recharges.length === 0 ? (
              <View style={styles.empty}>
                <Ionicons name="time-outline" size={40} color={colors.gray2} />
                <Text style={styles.emptyText}>No recharge history found</Text>
              </View>
            ) : (
              recharges.map((r) => <RechargeCard key={r.id} recharge={r} />)
            )}
          </ScrollView>
        </>
      ) : null}

      <SelectSheet
        visible={sheetOpen}
        title="Select Customer"
        value={walletId}
        options={wallets.map((w) => ({ value: w.id, label: w.customer_name }))}
        onSelect={setWalletId}
        onClose={() => setSheetOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  dim: { opacity: 0.4 },
  scroll: { padding: spacing.page, paddingBottom: 40, gap: spacing.lg, flexGrow: 1 },

  historyHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  section: { ...typography.title3, fontWeight: '700' },
  searchCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.blueTint,
    alignItems: 'center',
    justifyContent: 'center',
  },

  empty: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xxl },
  emptyText: { ...typography.subhead, color: colors.textMuted },

  card: {},
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.lg,
  },
  amount: { ...typography.title2, color: colors.successText, fontVariant: ['tabular-nums'] },
  date: { ...typography.footnote, marginTop: 2 },
  invoice: { ...typography.subhead, marginTop: 1 },
  offer: { ...typography.callout, fontWeight: '600', marginTop: spacing.md },
  itemsLine: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  itemsText: { ...typography.subhead, color: colors.textMuted },
  printBtn: { height: 34, paddingHorizontal: spacing.md },

  stats: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
  stat: { flex: 1, alignItems: 'center', gap: 3 },
  statLabel: { ...typography.footnote },
  statValue: { ...typography.headline, fontVariant: ['tabular-nums'] },
});
