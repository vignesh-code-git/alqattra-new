import { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../components/Screen';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import { Loading, ErrorState, Empty } from '../components/StateView';
import useAsync from '../lib/useAsync';
import api, { listOf } from '../lib/api';
import { fetchSession } from '../lib/session';
import { shortDate } from '../lib/format';
import { colors, spacing, radius, typography } from '../theme';

function MetaLine({ icon, children }) {
  return (
    <View style={styles.metaLine}>
      <Ionicons name={icon} size={15} color={colors.gray} />
      <Text style={styles.metaText} numberOfLines={1}>
        {children}
      </Text>
    </View>
  );
}

function CustomerCard({ customer, lastOrder }) {
  const place = [customer.address, customer.zone, customer.city].filter(Boolean).join(', ');
  const balance = Number(customer.current_balance || 0);

  return (
    <Card padded={false} style={styles.card}>
      <View style={styles.cardMain}>
        <View style={styles.head}>
          <View style={styles.flex}>
            <Text style={styles.name} numberOfLines={1}>
              {customer.name}
            </Text>
            <Text style={styles.code}>ID: {customer.customer_code}</Text>
          </View>
          <View style={styles.balance}>
            <Text style={styles.balanceText}>
              {balance.toFixed(balance % 1 ? 2 : 0)} AED
            </Text>
          </View>
        </View>

        <View style={styles.meta}>
          <MetaLine icon="call-outline">{customer.phone || '—'}</MetaLine>
          <MetaLine icon="location-outline">{customer.zone || '—'}</MetaLine>
          <MetaLine icon="home-outline">{customer.address || 'N/A'}</MetaLine>
          <MetaLine icon="time-outline">
            Last order: {lastOrder ? shortDate(lastOrder) : 'Never'}
          </MetaLine>
        </View>
      </View>

      <View style={styles.actions}>
        {place ? (
          <Button
            label="Directions"
            icon="navigate"
            tone="success"
            size="md"
            style={styles.flex}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`,
              )
            }
          />
        ) : null}
        <Button
          label="Call"
          icon="call"
          tone="primary"
          size="md"
          style={styles.flex}
          onPress={() => customer.phone && Linking.openURL(`tel:${customer.phone}`)}
        />
        <Button
          label="SMS"
          icon="chatbubble"
          tone="warning"
          size="md"
          style={styles.flex}
          onPress={() => customer.phone && Linking.openURL(`sms:${customer.phone}`)}
        />
      </View>
    </Card>
  );
}

export default function DailyCustomers() {
  const { data, error, loading, refreshing, reload } = useAsync(async () => {
    const [session, customersRaw, ordersRaw] = await Promise.all([
      fetchSession(),
      api.customers(),
      api.orders(),
    ]);
    return { session, customers: listOf(customersRaw), orders: listOf(ordersRaw) };
  }, []);

  const route = data?.session?.salesman?.assigned_route || '';

  const { customers, onRoute } = useMemo(() => {
    const active = (data?.customers || []).filter((c) => c.status === 'Active');
    const matching = active.filter((c) => route && c.route === route);
    // If the CRM has nobody assigned to this route, show every active customer
    // rather than an empty day.
    return matching.length ? { customers: matching, onRoute: true } : { customers: active, onRoute: false };
  }, [data, route]);

  const lastOrderByCustomer = useMemo(() => {
    const map = new Map();
    (data?.orders || []).forEach((o) => {
      const prev = map.get(o.customer);
      if (!prev || o.order_date > prev) map.set(o.customer, o.order_date);
    });
    return map;
  }, [data]);

  const weekday = new Date().toLocaleDateString('en-AE', { weekday: 'long' }).toUpperCase();

  return (
    <Screen>
      <AppHeader title="Daily Customers" showBack />

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <FlatList
          data={customers}
          keyExtractor={(c) => String(c.id)}
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
            <>
              <View style={styles.routeCard}>
                <View>
                  <Text style={styles.routeLabel}>Route</Text>
                  <Text style={styles.routeValue}>{route || '—'}</Text>
                </View>
                <View style={styles.routeRight}>
                  <Text style={styles.routeLabel}>Today</Text>
                  <Text style={styles.routeDay}>{weekday}</Text>
                </View>
              </View>
              {onRoute ? (
                <View style={styles.routeGap} />
              ) : (
                <Text style={styles.count}>
                  Nobody is assigned to this route yet, so all customers are shown
                </Text>
              )}
            </>
          }
          ListEmptyComponent={<Empty icon="people-outline" label="No Customers Today" />}
          renderItem={({ item }) => (
            <CustomerCard customer={item} lastOrder={lastOrderByCustomer.get(item.id)} />
          )}
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  list: { padding: spacing.page, paddingBottom: 40 },

  routeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  routeRight: { alignItems: 'flex-end' },
  routeLabel: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  routeValue: { ...typography.title2, color: colors.textInverse, marginTop: 2 },
  routeDay: { ...typography.headline, color: colors.textInverse, marginTop: 2 },
  routeGap: { height: spacing.lg },
  count: { ...typography.sectionHeader, marginLeft: spacing.lg, marginTop: spacing.xl, marginBottom: 6 },

  card: { marginBottom: spacing.md },
  cardMain: { padding: spacing.lg, gap: spacing.md },
  head: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  name: { ...typography.headline, color: colors.blue },
  code: { ...typography.footnote, marginTop: 1 },
  balance: {
    backgroundColor: colors.fill,
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  balanceText: { fontSize: 14, fontWeight: '700', color: colors.red, fontVariant: ['tabular-nums'] },

  meta: {
    gap: 5,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
  metaLine: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  metaText: { ...typography.subhead, color: colors.textMuted, flex: 1 },

  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
