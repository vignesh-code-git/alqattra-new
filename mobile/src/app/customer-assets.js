import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';

import Screen from '../components/Screen';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import CustomerBar from '../components/CustomerBar';
import SelectSheet from '../components/SelectSheet';
import { Loading, ErrorState } from '../components/StateView';
import useAsync from '../lib/useAsync';
import api, { listOf } from '../lib/api';
import { colors, spacing, typography } from '../theme';

/**
 * "Update Customer" / Assets Overview.
 *
 * NOTE: the Django backend has no CustomerAsset model yet, so on-rent /
 * custody / returned / deposit figures have no source. The asset cards are
 * built from the returnable products in the catalogue and read zero until an
 * assets endpoint exists. See README "Backend gaps".
 */

const RETURNABLE_CATEGORIES = ['Accessories & Coolers', 'Dispensers'];
const NO_ENDPOINT = 'The CRM has no customer-assets endpoint yet, so this cannot be saved.';

/** Label above value, as on the design's asset cards. */
function Cell({ label, value }) {
  return (
    <View style={styles.cell}>
      <Text style={styles.cellLabel}>{label}</Text>
      <Text style={styles.cellValue}>{value}</Text>
    </View>
  );
}

function AssetCard({ name }) {
  return (
    <Card style={styles.assetCard}>
      <Text style={styles.assetTitle} numberOfLines={1}>
        {name}
      </Text>

      <View style={styles.row}>
        <Cell label="On Rent" value="0" />
        <Cell label="Sold" value="0" />
      </View>
      <View style={styles.row}>
        <Cell label="Custody" value="0" />
        <Cell label="Returned" value="0" />
        <Cell label="Deposit" value="AED 0" />
      </View>

      <Button
        label="Return Assets"
        tone="yellow"
        size="md"
        onPress={() => Alert.alert('Return Assets', NO_ENDPOINT)}
      />
    </Card>
  );
}

export default function CustomerAssets() {
  const [customerId, setCustomerId] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data, error, loading, refreshing, reload } = useAsync(async () => {
    const [customersRaw, productsRaw] = await Promise.all([api.customers(), api.products()]);
    return { customers: listOf(customersRaw), products: listOf(productsRaw) };
  }, []);

  const customers = data?.customers || [];
  const customer = useMemo(
    () => customers.find((c) => c.id === customerId) || null,
    [customers, customerId],
  );

  const assetProducts = useMemo(
    () =>
      (data?.products || []).filter(
        (p) => RETURNABLE_CATEGORIES.includes(p.category) || /bottle|cooler|stand|pump/i.test(p.name),
      ),
    [data],
  );

  return (
    <Screen>
      <AppHeader title="Update Customer" showBack />

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <>
          <CustomerBar
            name={customer?.name}
            code={customer?.customer_code}
            onPress={() => setSheetOpen(true)}
          />

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
            <Button
              label="Add Asset"
              tone="primary"
              onPress={() => Alert.alert('Add Asset', NO_ENDPOINT)}
            />

            <Text style={styles.section}>Assets Overview</Text>

            {/* As in the design, the overview stays empty until a customer is chosen. */}
            {customer ? assetProducts.map((p) => <AssetCard key={p.id} name={p.name} />) : null}
          </ScrollView>
        </>
      ) : null}

      <SelectSheet
        visible={sheetOpen}
        title="Select Customer"
        value={customerId}
        options={customers.map((c) => ({ value: c.id, label: c.name }))}
        onSelect={setCustomerId}
        onClose={() => setSheetOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.page, paddingBottom: 40, gap: spacing.lg },
  section: { ...typography.title3, fontWeight: '700' },

  assetCard: { gap: spacing.md },
  assetTitle: { ...typography.headline },
  row: { flexDirection: 'row' },
  cell: { flex: 1, alignItems: 'center', gap: 3 },
  cellLabel: { ...typography.footnote },
  cellValue: { ...typography.headline, fontVariant: ['tabular-nums'] },
});
