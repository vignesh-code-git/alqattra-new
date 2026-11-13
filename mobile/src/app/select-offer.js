import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import Screen from '../components/Screen';
import Card from '../components/Card';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import { Loading, ErrorState, Empty } from '../components/StateView';
import useAsync from '../lib/useAsync';
import api, { listOf } from '../lib/api';
import { colors, spacing, typography } from '../theme';

/**
 * "Select Offer" - shown as a sheet from Customer Wallet > Recharge Wallet.
 *
 * The CRM has no offers model, so offers are read from master items with
 * category "Wallet Offer":
 *   code         "32.5*1"         (offer code; the price is the part before *)
 *   name         "5 gal water"    (items)
 *   description  "Routes: 4116, 6684; Paid: 10; Free: 0"
 */
export const OFFER_CATEGORY = 'Wallet Offer';

function parseOffer(m) {
  const desc = m.description || '';
  const field = (key) => {
    const hit = desc.match(new RegExp(`${key}\\s*:\\s*([^;]+)`, 'i'));
    return hit ? hit[1].trim() : '';
  };
  const price = parseFloat(String(m.code).split('*')[0]);
  return {
    id: m.id,
    code: m.code,
    items: m.name,
    routes: field('Routes'),
    price: Number.isFinite(price) ? price : null,
    paid: field('Paid') || '0',
    free: field('Free') || '0',
  };
}

function OfferCard({ offer, selected, onPress }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="radio" accessibilityState={{ selected }}>
      {({ pressed }) => (
        <Card style={[styles.card, selected && styles.cardSelected, pressed && styles.cardPressed]}>
          <View style={styles.cardTop}>
            <Text style={styles.code}>{offer.code}</Text>
            <Text style={styles.price}>
              {offer.price != null ? `AED ${offer.price}` : '—'}
            </Text>
          </View>
          <View style={styles.cardMid}>
            <Text style={styles.items} numberOfLines={1}>
              Items: {offer.items}
            </Text>
            <Text style={styles.coupons}>
              {offer.paid}P + {offer.free}F
            </Text>
          </View>
          {offer.routes ? <Text style={styles.routes}>Routes: {offer.routes}</Text> : null}
          {selected ? (
            <Ionicons name="checkmark-circle" size={22} color={colors.blue} style={styles.check} />
          ) : null}
        </Card>
      )}
    </Pressable>
  );
}

export default function SelectOffer() {
  const insets = useSafeAreaInsets();
  const { customer, walletId } = useLocalSearchParams();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const { data, error, loading, reload } = useAsync(async () => {
    const raw = await api.masters({ search: OFFER_CATEGORY });
    return listOf(raw)
      .filter((m) => m.category === OFFER_CATEGORY && m.is_active !== false)
      .map(parseOffer);
  }, []);

  const offers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data || [];
    return (data || []).filter((o) =>
      [o.code, o.items, o.routes].some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [data, search]);

  const selected = (data || []).find((o) => o.id === selectedId);
  const close = () => (router.canGoBack() ? router.back() : router.replace('/customer-wallet'));

  const [saving, setSaving] = useState(false);

  const confirm = async () => {
    if (!selected) {
      Alert.alert('Select Offer', 'Choose an offer first.');
      return;
    }
    if (!walletId) {
      Alert.alert('Select Customer', 'Choose a customer on the wallet screen first.');
      return;
    }
    if (selected.price == null) {
      Alert.alert('Confirm Recharge', `Offer ${selected.code} has no price.`);
      return;
    }
    setSaving(true);
    try {
      // The server credits the wallet and logs the cashier transaction, so the
      // CRM website's Wallet and Cashier pages show this recharge too.
      await api.createWalletRecharge({
        wallet: Number(walletId),
        amount: selected.price.toFixed(2),
        bonus: '0.00',
        payment_method: 'Cash',
        transaction_ref: selected.code,
      });
      Alert.alert('Wallet Recharged', `AED ${selected.price} added for ${customer || 'the customer'}.`);
      close();
    } catch (err) {
      Alert.alert('Recharge Failed', err.message || 'The recharge could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen>
      {/* Sheet header: title left, close right */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.title}>Select Offer</Text>
        <Pressable
          onPress={close}
          hitSlop={12}
          style={({ pressed }) => [styles.close, pressed && styles.dim]}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Ionicons name="close" size={22} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.searchWrap}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search offers by code, items, or routes..."
        />
      </View>

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <FlatList
          data={offers}
          keyExtractor={(o) => String(o.id)}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Empty icon="pricetags-outline" label="No Offers Available" />
              {!search ? (
                <Text style={styles.emptyNote}>
                  Offers are added in the CRM under Masters, category &quot;{OFFER_CATEGORY}&quot;.
                </Text>
              ) : null}
            </View>
          }
          renderItem={({ item }) => (
            <OfferCard
              offer={item}
              selected={item.id === selectedId}
              onPress={() => setSelectedId(item.id)}
            />
          )}
        />
      ) : null}

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button label="Cancel" tone="graySolid" style={styles.flex} onPress={close} />
        <Button
          label={saving ? 'Saving…' : 'Confirm Recharge'}
          tone="success"
          style={styles.flex}
          onPress={saving ? undefined : confirm}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  dim: { opacity: 0.4 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.page,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  title: { ...typography.title2 },
  close: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.fill,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchWrap: { paddingHorizontal: spacing.page, paddingTop: spacing.md },
  list: { padding: spacing.page, flexGrow: 1 },

  card: { marginBottom: spacing.md, gap: 4, borderWidth: 1.5, borderColor: 'transparent' },
  cardSelected: { borderColor: colors.blue },
  cardPressed: { backgroundColor: colors.gray5 },
  cardTop: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: spacing.md },
  code: { ...typography.headline, fontSize: 18 },
  price: { ...typography.title3, fontWeight: '700', color: colors.successText },
  cardMid: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  items: { ...typography.callout, flex: 1 },
  coupons: { ...typography.footnote },
  routes: { ...typography.footnote, marginTop: 2 },
  check: { position: 'absolute', right: spacing.md, bottom: spacing.md },

  emptyWrap: { flex: 1, minHeight: 260 },
  emptyNote: { ...typography.footnote, textAlign: 'center', paddingHorizontal: spacing.xl },

  footer: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.page,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
});
