import { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import Screen from '../components/Screen';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import { TextField } from '../components/Field';
import { Loading, ErrorState, Empty } from '../components/StateView';
import useAsync from '../lib/useAsync';
import { fetchSession } from '../lib/session';
import { assistantsStore, useStore } from '../lib/store';
import { colors, spacing, radius, typography } from '../theme';

/**
 * "Select Assistant": pick the colleagues riding along today.
 *
 * The CRM has no assistant model, so the selection is kept on this device.
 */
export default function SelectAssistant() {
  const insets = useSafeAreaInsets();
  const saved = useStore(assistantsStore);
  const [selected, setSelected] = useState(saved);
  const [search, setSearch] = useState('');

  // Pick up the stored selection once it has loaded from the device.
  useEffect(() => setSelected(saved), [saved]);

  const { data, error, loading, reload } = useAsync(fetchSession, []);

  const people = useMemo(() => {
    const me = data?.salesman?.id;
    const q = search.trim().toLowerCase();
    return (data?.salesmen || [])
      .filter((s) => s.id !== me)
      .filter(
        (s) =>
          !q ||
          s.name.toLowerCase().includes(q) ||
          String(s.salesman_code).toLowerCase().includes(q) ||
          String(s.id).includes(q),
      );
  }, [data, search]);

  const toggle = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const save = () => {
    assistantsStore.set(selected);
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  return (
    <Screen>
      <AppHeader title="Select Assistant" showBack />

      <View style={styles.top}>
        <TextField
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name or ID..."
          autoCorrect={false}
        />
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{selected.length} assistant(s) selected</Text>
        </View>
      </View>

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <FlatList
          data={people}
          keyExtractor={(s) => String(s.id)}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={<Empty icon="people-outline" label="No Assistants Found" />}
          renderItem={({ item }) => {
            const on = selected.includes(item.id);
            return (
              <Pressable
                onPress={() => toggle(item.id)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: on }}
              >
                {({ pressed }) => (
                  <Card style={[styles.card, on && styles.cardOn, pressed && styles.cardPressed]}>
                    <View style={styles.flex}>
                      <Text style={styles.name} numberOfLines={1}>
                        {item.name.toUpperCase()}
                      </Text>
                      <Text style={styles.meta}>ID: {item.salesman_code}</Text>
                    </View>
                    {on ? <Ionicons name="checkmark-circle" size={24} color={colors.blue} /> : null}
                  </Card>
                )}
              </Pressable>
            );
          }}
        />
      ) : null}

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button label={`Save (${selected.length})`} tone="success" onPress={save} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  top: { paddingHorizontal: spacing.page, paddingTop: spacing.lg, gap: spacing.md },
  banner: {
    backgroundColor: colors.blueTint,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  bannerText: { ...typography.callout, color: colors.blue, fontWeight: '500' },

  list: { paddingHorizontal: spacing.page, paddingTop: spacing.md, paddingBottom: spacing.md, flexGrow: 1 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  cardOn: { borderColor: colors.blue },
  cardPressed: { backgroundColor: colors.gray5 },
  name: { ...typography.headline },
  meta: { ...typography.subhead, color: colors.textMuted, marginTop: 3 },

  footer: { paddingHorizontal: spacing.page, paddingTop: spacing.sm },
});
