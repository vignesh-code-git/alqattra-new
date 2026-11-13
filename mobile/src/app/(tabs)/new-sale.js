import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import Screen from '../../components/Screen';
import AppHeader from '../../components/AppHeader';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Notice from '../../components/Notice';
import SelectSheet from '../../components/SelectSheet';
import SegmentedControl from '../../components/SegmentedControl';
import { Field, TextField, SelectField } from '../../components/Field';
import { Loading, ErrorState } from '../../components/StateView';
import useAsync from '../../lib/useAsync';
import api, { listOf } from '../../lib/api';
import { fetchSession, truckCode } from '../../lib/session';
import { saleCustomerStore, useStore } from '../../lib/store';
import { aed, numericDate } from '../../lib/format';
import { colors, spacing, typography, TAB_BAR_CLEARANCE } from '../../theme';

const SALE_TYPES = ['SOLD', 'RENT', 'CUSTODY'];
const PAYMENTS = ['Cash', 'Card', 'Wallet', 'Credit'];

export default function NewSale() {
  const customer = useStore(saleCustomerStore);

  const [productId, setProductId] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [saleType, setSaleType] = useState('SOLD');
  const [customPrice, setCustomPrice] = useState('');
  const [items, setItems] = useState([]);
  const [payment, setPayment] = useState('Cash');
  const [sheet, setSheet] = useState(null); // 'product' | 'type'
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { tone, text }

  const { data, error, loading, reload } = useAsync(async () => {
    const [session, productsRaw, ordersRaw] = await Promise.all([
      fetchSession(),
      api.products(),
      api.orders(),
    ]);
    return { session, products: listOf(productsRaw), orders: listOf(ordersRaw) };
  }, []);

  const products = data?.products || [];
  const product = products.find((p) => p.id === productId) || products[0] || null;

  const lastOrdered = useMemo(() => {
    if (!customer || !data) return null;
    const dates = data.orders
      .filter((o) => o.customer === customer.id)
      .map((o) => o.order_date)
      .sort();
    return dates.length ? dates[dates.length - 1] : null;
  }, [customer, data]);

  const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  const addItem = () => {
    const qty = parseInt(quantity, 10);
    if (!product) return setFormError('Choose a product.');
    if (!Number.isFinite(qty) || qty <= 0) return setFormError('Enter a quantity of 1 or more.');
    const price = customPrice.trim() === '' ? Number(product.selling_price) : Number(customPrice);
    if (!Number.isFinite(price) || price < 0) return setFormError('Custom price must be a number.');

    setFormError(null);
    setResult(null);
    setItems((prev) => [
      ...prev,
      { key: `${product.id}-${Date.now()}`, name: product.name, quantity: qty, price, saleType },
    ]);
    setQuantity('');
    setCustomPrice('');
    return null;
  };

  const submit = async () => {
    if (!customer || items.length === 0 || submitting) return;
    setSubmitting(true);
    setResult(null);
    const { salesman, truck } = data.session;
    const orderNo = `DN-${truckCode(truck)}-${Date.now().toString().slice(-6)}`;
    try {
      await api.createOrder({
        order_no: orderNo,
        customer: customer.id,
        salesman: salesman?.id ?? null,
        status: 'Delivered',
        delivery_date: new Date().toISOString().slice(0, 10),
        total_amount: total.toFixed(2),
        payment_method: payment,
        payment_status: payment === 'Credit' ? 'Unpaid' : 'Paid',
        route: salesman?.assigned_route || '',
        city: customer.city,
        // The CRM cannot store line items yet, so they travel in the notes.
        notes: items
          .map((i) => `${i.name} x${i.quantity} @ ${i.price.toFixed(2)} (${i.saleType})`)
          .join('; '),
      });
      setItems([]);
      setResult({ tone: 'success', text: `Order #${orderNo} saved for ${customer.name}.` });
      reload();
    } catch (err) {
      setResult({ tone: 'error', text: err.message || 'The order could not be saved.' });
    } finally {
      setSubmitting(false);
    }
  };

  const clearCustomer = () => {
    saleCustomerStore.set(null);
    setItems([]);
    setResult(null);
    setFormError(null);
  };

  return (
    <Screen>
      <AppHeader title="New Sale" />

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Customer card */}
          <Card padded={false}>
            <Pressable
              onPress={() => router.push('/select-customer')}
              style={({ pressed }) => [styles.customerRow, pressed && styles.rowPressed]}
              accessibilityRole="button"
            >
              <Ionicons name="person-add" size={20} color={colors.blue} />
              <Text style={[styles.customerName, !customer && styles.customerPlaceholder]} numberOfLines={1}>
                {customer ? customer.name : 'Select Customer'}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={colors.blue} />
            </Pressable>

            {customer ? (
              <View style={styles.customerBody}>
                <View style={styles.phoneLine}>
                  <Ionicons name="call" size={16} color={colors.green} />
                  <Text style={styles.infoText}>{customer.phone || 'No phone number'}</Text>
                </View>
                <Text style={styles.infoText}>
                  Last Ordered: {lastOrdered ? numericDate(lastOrdered) : 'Never'}
                </Text>
                <Text style={styles.infoText}>Zone: {customer.zone || ''}</Text>

                <View style={styles.actions}>
                  <Button
                    label="Call"
                    icon="call"
                    tone="success"
                    size="md"
                    style={styles.flex}
                    onPress={() => customer.phone && Linking.openURL(`tel:${customer.phone}`)}
                  />
                  <Button
                    label="Navigate"
                    icon="navigate"
                    tone="primary"
                    size="md"
                    style={styles.flex}
                    onPress={() =>
                      Linking.openURL(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          [customer.address, customer.zone, customer.city].filter(Boolean).join(', '),
                        )}`,
                      )
                    }
                  />
                  <Button
                    label="Unavailable"
                    icon="chatbox"
                    tone="warning"
                    size="md"
                    style={styles.flex}
                    onPress={clearCustomer}
                  />
                </View>
              </View>
            ) : null}
          </Card>

          {result ? (
            <Notice tone={result.tone} style={styles.gap}>
              {result.text}
            </Notice>
          ) : null}

          {/* Add Products card */}
          {customer ? (
            <Card style={styles.productsCard}>
              <View style={styles.cardHead}>
                <Ionicons name="cart" size={22} color={colors.blue} />
                <Text style={styles.cardTitle}>Add Products</Text>
              </View>

              <SelectField
                icon="cube"
                value={product?.name}
                placeholder="Select product"
                onPress={() => setSheet('product')}
              />

              <View style={styles.twoCol}>
                <Field label="Quantity" style={styles.flex}>
                  <TextField
                    value={quantity}
                    onChangeText={setQuantity}
                    placeholder="Enter quantity"
                    keyboardType="number-pad"
                    inputMode="numeric"
                  />
                </Field>
                <Field label="Sale Type" style={styles.flex}>
                  <SelectField value={saleType} onPress={() => setSheet('type')} />
                </Field>
              </View>

              <Field label="Custom Price (Optional)">
                <TextField
                  value={customPrice}
                  onChangeText={setCustomPrice}
                  placeholder={product ? String(Number(product.selling_price)) : ''}
                  keyboardType="decimal-pad"
                  inputMode="decimal"
                />
              </Field>

              {formError ? <Text style={styles.formError}>{formError}</Text> : null}

              <Button label="Add to Order" icon="add" tone="success" onPress={addItem} />
            </Card>
          ) : null}

          {/* Current order */}
          {customer && items.length > 0 ? (
            <Card padded={false} style={styles.gap}>
              <View style={[styles.cardHead, styles.orderHead]}>
                <Ionicons name="receipt" size={20} color={colors.blue} />
                <Text style={styles.cardTitle}>Order</Text>
              </View>
              {items.map((item) => (
                <View key={item.key} style={[styles.itemRow, styles.divider]}>
                  <Pressable
                    onPress={() => setItems((prev) => prev.filter((i) => i.key !== item.key))}
                    hitSlop={10}
                    accessibilityLabel={`Remove ${item.name}`}
                  >
                    <Ionicons name="remove-circle" size={22} color={colors.red} />
                  </Pressable>
                  <View style={styles.flex}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemMeta}>
                      {item.quantity} × {item.price.toFixed(2)} AED · {item.saleType}
                    </Text>
                  </View>
                  <Text style={styles.itemTotal}>{aed(item.quantity * item.price)}</Text>
                </View>
              ))}
              <View style={[styles.totalRow, styles.divider]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{aed(total)}</Text>
              </View>

              <View style={styles.orderFooter}>
                <SegmentedControl options={PAYMENTS} value={payment} onChange={setPayment} />
                <Button
                  label={submitting ? 'Saving…' : 'Submit Order'}
                  tone="primary"
                  onPress={submit}
                />
              </View>
            </Card>
          ) : null}
        </ScrollView>
      ) : null}

      <SelectSheet
        visible={sheet === 'product'}
        title="Select Product"
        value={product?.id}
        options={products.map((p) => ({ value: p.id, label: p.name }))}
        onSelect={setProductId}
        onClose={() => setSheet(null)}
      />
      <SelectSheet
        visible={sheet === 'type'}
        title="Sale Type"
        value={saleType}
        options={SALE_TYPES.map((t) => ({ value: t, label: t }))}
        onSelect={setSaleType}
        onClose={() => setSheet(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  gap: { marginTop: spacing.lg },
  scroll: {
    paddingHorizontal: spacing.page,
    paddingTop: spacing.sm,
    paddingBottom: TAB_BAR_CLEARANCE,
  },
  rowPressed: { backgroundColor: colors.gray5 },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.separator },

  customerRow: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  customerName: { ...typography.headline, flex: 1 },
  customerPlaceholder: { fontWeight: '500' },
  customerBody: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
  phoneLine: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  infoText: { ...typography.subhead, fontWeight: '500' },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },

  productsCard: { marginTop: spacing.lg, gap: spacing.md },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  cardTitle: { ...typography.title3 },
  twoCol: { flexDirection: 'row', gap: spacing.md },
  formError: { ...typography.footnote, color: colors.red },

  orderHead: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.sm },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingVertical: 10,
  },
  itemName: { ...typography.body },
  itemMeta: { ...typography.footnote, marginTop: 1 },
  itemTotal: { ...typography.body, fontVariant: ['tabular-nums'] },
  totalRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: spacing.lg,
    paddingRight: spacing.lg,
  },
  totalLabel: { ...typography.headline },
  totalValue: { ...typography.headline, fontVariant: ['tabular-nums'] },
  orderFooter: { padding: spacing.lg, gap: spacing.md },
});
