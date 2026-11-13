import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import Screen from '../components/Screen';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import SelectSheet from '../components/SelectSheet';
import { Loading, ErrorState, Empty } from '../components/StateView';
import useAsync from '../lib/useAsync';
import api, { listOf } from '../lib/api';
import { saleCustomerStore } from '../lib/store';
import { colors, spacing, typography } from '../theme';

const ALL_ZONES = '__all__';

export default function SelectCustomer() {
  const [search, setSearch] = useState('');
  const [zone, setZone] = useState(ALL_ZONES);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data, error, loading, refreshing, reload } = useAsync(async () => {
    const raw = await api.customers({ search: search || undefined });
    return listOf(raw).filter((c) => c.status !== 'Deleted');
  }, [search]);

  const zones = useMemo(
    () => [...new Set((data || []).map((c) => c.zone).filter(Boolean))].sort(),
    [data],
  );

  const customers = useMemo(
    () => (data || []).filter((c) => zone === ALL_ZONES || c.zone === zone),
    [data, zone],
  );

  const choose = (customer) => {
    saleCustomerStore.set(customer);
    if (router.canGoBack()) router.back();
    else router.replace('/new-sale');
  };

  const filtered = zone !== ALL_ZONES;

  return (
    <Screen>
      <AppHeader title="Select Customer" showBack />

      <View style={styles.top}>
        <Text style={styles.title}>Select a Customer</Text>
        <View style={styles.searchRow}>
          <View style={styles.flex}>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder="Search customers, names, IDs..."
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
            accessibilityLabel="Filter by zone"
          >
            <Ionicons name="filter" size={18} color={filtered ? colors.textInverse : colors.text} />
          </Pressable>
        </View>
      </View>

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <FlatList
          data={customers}
          keyExtractor={(c) => String(c.id)}
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
            <Text style={styles.count}>
              {customers.length} customer{customers.length === 1 ? '' : 's'} found
            </Text>
          }
          ListEmptyComponent={<Empty icon="people-outline" label="No Customers Found" />}
          renderItem={({ item }) => (
            <Pressable onPress={() => choose(item)} accessibilityRole="button">
              {({ pressed }) => (
                <Card style={[styles.card, pressed && styles.cardPressed]}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.meta}>ID: {item.customer_code}</Text>
                  <Text style={styles.zone} numberOfLines={1}>
                    Zone: {(item.zone || '—').toUpperCase()}
                  </Text>
                </Card>
              )}
            </Pressable>
          )}
        />
      ) : null}

      <SelectSheet
        visible={sheetOpen}
        title="Select Zone"
        value={zone}
        options={[
          { value: ALL_ZONES, label: 'All Zones' },
          ...zones.map((z) => ({ value: z, label: z })),
        ]}
        onSelect={setZone}
        onClose={() => setSheetOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  dim: { opacity: 0.4 },

  top: { paddingHorizontal: spacing.page, paddingTop: spacing.lg, gap: spacing.md },
  title: { ...typography.title3, fontWeight: '700' },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.fill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBtnActive: { backgroundColor: colors.blue },

  list: { paddingHorizontal: spacing.page, paddingTop: spacing.md, paddingBottom: 40 },
  count: { ...typography.footnote, fontStyle: 'italic', marginBottom: spacing.sm },

  card: { marginBottom: spacing.sm, paddingVertical: spacing.md, gap: 2 },
  cardPressed: { backgroundColor: colors.gray5 },
  name: { ...typography.headline },
  meta: { ...typography.footnote },
  zone: { ...typography.footnote, color: colors.blue, fontWeight: '600' },
});
