import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Location from 'expo-location';

import Screen from '../../components/Screen';
import AppHeader from '../../components/AppHeader';
import Button from '../../components/Button';
import Notice from '../../components/Notice';
import SelectSheet from '../../components/SelectSheet';
import { Field, TextField, SelectField } from '../../components/Field';
import { Loading, ErrorState } from '../../components/StateView';
import useAsync from '../../lib/useAsync';
import api, { listOf } from '../../lib/api';
import { fetchSession } from '../../lib/session';
import { colors, spacing, radius, typography, TAB_BAR_CLEARANCE } from '../../theme';

const CITIES = ['AL AIN', 'ABU DHABI', 'DUBAI'];
const CUSTOMER_TYPES = ['Individual', 'Corporate', 'Government'];

const EMPTY = {
  name: '',
  phone: '',
  route: '',
  zone: '',
  city: 'AL AIN',
  location: '',
  address: '',
  customerType: 'Individual',
  creditLimit: '',
  email: '',
};

/** Collapsible form section with the blue header bar from the designs. */
function Section({ icon, title, open, onToggle, children }) {
  return (
    <View style={styles.section}>
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => [styles.sectionHead, pressed && styles.dim]}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
      >
        <Ionicons name={icon} size={18} color={colors.textInverse} />
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons name={open ? 'remove' : 'add'} size={22} color={colors.textInverse} />
      </Pressable>
      {open ? <View style={styles.sectionBody}>{children}</View> : null}
    </View>
  );
}

export default function NewCustomer() {
  const [form, setForm] = useState(EMPTY);
  const [open, setOpen] = useState({ info: true, business: false, details: false, prices: false });
  const [sheet, setSheet] = useState(null); // 'zone' | 'city' | 'type' | 'location'
  const [locating, setLocating] = useState(false);
  const [errors, setErrors] = useState([]);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);

  const { data, error, loading, reload } = useAsync(async () => {
    const [zonesRaw, productsRaw, session] = await Promise.all([
      api.zones(),
      api.products(),
      fetchSession(),
    ]);
    return { zones: listOf(zonesRaw), products: listOf(productsRaw), session };
  }, []);

  // Pre-fill the route with the salesman's own, as the design does.
  const defaultRoute = data?.session?.salesman?.assigned_route || '';
  useEffect(() => {
    if (defaultRoute) setForm((f) => (f.route ? f : { ...f, route: defaultRoute }));
  }, [defaultRoute]);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
  const toggle = (key) => () => setOpen((o) => ({ ...o, [key]: !o[key] }));

  const zoneOptions = (data?.zones || [])
    .filter((z) => !form.city || z.city === form.city)
    .map((z) => ({ value: z.name, label: z.name }));

  const fillCurrentLocation = async () => {
    setLocating(true);
    setErrors([]);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrors(['Location permission was not granted. Enter the location manually.']);
        return;
      }
      const position = await Location.getCurrentPositionAsync({});
      set('location')(
        `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`,
      );
    } catch {
      setErrors(['Could not read the current location. Enter it manually.']);
    } finally {
      setLocating(false);
    }
  };

  const clearForm = () => {
    setForm({ ...EMPTY, route: defaultRoute });
    setErrors([]);
    setResult(null);
  };

  const submit = async () => {
    const missing = [];
    if (!form.name.trim()) missing.push('Customer Name');
    if (!form.phone.trim()) missing.push('Mobile Number');
    if (!form.route.trim()) missing.push('Route ID');
    if (!form.zone) missing.push('Zone ID');
    if (!form.city) missing.push('City');
    if (missing.length) {
      setOpen((o) => ({ ...o, info: true }));
      setErrors([`Required: ${missing.join(', ')}.`]);
      return;
    }

    setSaving(true);
    setErrors([]);
    setResult(null);
    const code = `CUST-${Date.now().toString().slice(-7)}`;
    try {
      await api.createCustomer({
        customer_code: code,
        name: form.name.trim(),
        phone: form.phone.trim(),
        route: form.route.trim(),
        zone: form.zone,
        city: form.city,
        address: [form.address.trim(), form.location && `GPS: ${form.location}`]
          .filter(Boolean)
          .join('\n'),
        customer_type: form.customerType,
        credit_limit: form.creditLimit.trim() === '' ? '0.00' : form.creditLimit.trim(),
        email: form.email.trim() || null,
      });
      setForm({ ...EMPTY, route: defaultRoute });
      setResult({ tone: 'success', text: `${form.name.trim()} was added as ${code}.` });
    } catch (err) {
      const detail =
        err.body && typeof err.body === 'object'
          ? Object.entries(err.body)
              .map(([field, msgs]) => `${field}: ${[].concat(msgs).join(' ')}`)
              .join('\n')
          : err.message;
      setResult({ tone: 'error', text: detail || 'The customer could not be saved.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen>
      <AppHeader title="New Customer" />

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Button
            label="Update Customer"
            tone="graySolid"
            onPress={() => router.push('/customer-assets')}
          />

          {result ? <Notice tone={result.tone}>{result.text}</Notice> : null}
          {errors.map((message) => (
            <Notice key={message} tone="error">
              {message}
            </Notice>
          ))}

          <Section
            icon="clipboard"
            title="Customer Information"
            open={open.info}
            onToggle={toggle('info')}
          >
            <Field label="Customer Name:" required>
              <TextField
                value={form.name}
                onChangeText={set('name')}
                placeholder="Enter full name"
                autoCapitalize="words"
              />
            </Field>
            <Field label="Mobile Number:" required>
              <TextField
                value={form.phone}
                onChangeText={set('phone')}
                placeholder="+971 50 123 4567"
                keyboardType="phone-pad"
                inputMode="tel"
              />
            </Field>
            <Field label="Route ID:" required>
              <TextField value={form.route} onChangeText={set('route')} placeholder="6350" />
            </Field>
            <Field label="Zone ID:" required>
              <SelectField
                value={form.zone}
                placeholder="Select Zone"
                onPress={() => setSheet('zone')}
              />
            </Field>
            <Field label="City:" required>
              <SelectField value={form.city} onPress={() => setSheet('city')} />
            </Field>

            <Field label="Location:">
              <View style={styles.locationButtons}>
                <Button
                  label={locating ? 'Locating…' : 'Current Location'}
                  icon="location"
                  tone="success"
                  size="md"
                  style={styles.flex}
                  onPress={fillCurrentLocation}
                />
                <Button
                  label="More Options"
                  icon="map"
                  tone="primary"
                  size="md"
                  style={styles.flex}
                  onPress={() => setSheet('location')}
                />
              </View>
              <TextField
                value={form.location}
                onChangeText={set('location')}
                placeholder="Tap to get current location or enter manually"
                multiline
                style={styles.locationBox}
              />
            </Field>

            <Field label="Full Address:">
              <TextField
                value={form.address}
                onChangeText={set('address')}
                placeholder="Building, Street, Landmark"
                multiline
              />
            </Field>
          </Section>

          <Section
            icon="business"
            title="Business Information"
            open={open.business}
            onToggle={toggle('business')}
          >
            <Field label="Customer Type:">
              <SelectField value={form.customerType} onPress={() => setSheet('type')} />
            </Field>
            <Field label="Credit Limit (AED):">
              <TextField
                value={form.creditLimit}
                onChangeText={set('creditLimit')}
                placeholder="0.00"
                keyboardType="decimal-pad"
                inputMode="decimal"
              />
            </Field>
          </Section>

          <Section
            icon="call"
            title="Additional Details"
            open={open.details}
            onToggle={toggle('details')}
          >
            <Field label="Email:">
              <TextField
                value={form.email}
                onChangeText={set('email')}
                placeholder="name@example.com"
                keyboardType="email-address"
                inputMode="email"
                autoCapitalize="none"
              />
            </Field>
          </Section>

          <Section
            icon="pricetag"
            title="Product Prices"
            open={open.prices}
            onToggle={toggle('prices')}
          >
            {(data?.products || []).map((p) => (
              <View key={p.id} style={styles.priceRow}>
                <Text style={styles.priceName} numberOfLines={1}>
                  {p.name}
                </Text>
                <Text style={styles.priceValue}>{Number(p.selling_price).toFixed(2)} AED</Text>
              </View>
            ))}
          </Section>

          <View style={styles.footer}>
            <Button label="Clear Form" tone="graySolid" style={styles.clearBtn} onPress={clearForm} />
            <Button
              label={saving ? 'Saving…' : 'Add Customer'}
              tone="success"
              style={styles.flex}
              onPress={saving ? undefined : submit}
            />
          </View>
        </ScrollView>
      ) : null}

      <SelectSheet
        visible={sheet === 'city'}
        title="Select City"
        value={form.city}
        options={CITIES.map((c) => ({ value: c, label: c }))}
        onSelect={(city) => setForm((f) => ({ ...f, city, zone: '' }))}
        onClose={() => setSheet(null)}
      />
      <SelectSheet
        visible={sheet === 'zone'}
        title="Select Zone"
        value={form.zone}
        options={zoneOptions}
        onSelect={set('zone')}
        onClose={() => setSheet(null)}
      />
      <SelectSheet
        visible={sheet === 'type'}
        title="Customer Type"
        value={form.customerType}
        options={CUSTOMER_TYPES.map((t) => ({ value: t, label: t }))}
        onSelect={set('customerType')}
        onClose={() => setSheet(null)}
      />
      <SelectSheet
        visible={sheet === 'location'}
        title="Location Options"
        value={null}
        options={[
          { value: 'maps', label: 'Open in Maps' },
          { value: 'clear', label: 'Clear Location' },
        ]}
        onSelect={(choice) => {
          if (choice === 'clear') set('location')('');
          if (choice === 'maps') {
            const query = form.location || [form.address, form.zone, form.city].filter(Boolean).join(', ');
            Linking.openURL(
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
            );
          }
        }}
        onClose={() => setSheet(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  dim: { opacity: 0.7 },
  scroll: {
    paddingHorizontal: spacing.page,
    paddingTop: spacing.sm,
    paddingBottom: TAB_BAR_CLEARANCE,
    gap: spacing.md,
  },

  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  sectionHead: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.blue,
  },
  sectionTitle: { ...typography.headline, color: colors.textInverse, flex: 1 },
  sectionBody: { padding: spacing.lg, gap: spacing.lg },

  locationButtons: { flexDirection: 'row', gap: spacing.sm },
  locationBox: { minHeight: 60, marginTop: 2 },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  priceName: { ...typography.body, flex: 1 },
  priceValue: { ...typography.body, color: colors.textMuted, fontVariant: ['tabular-nums'] },

  footer: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  clearBtn: { paddingHorizontal: spacing.xl },
});
