import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';

/**
 * The white strip under the navigation bar on the Wallet and Update Customer
 * screens: customer name with its ID beneath. Tapping it opens the picker.
 */
export default function CustomerBar({ name, code, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.bar, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel="Select customer"
    >
      <View style={styles.flex}>
        <Text style={styles.name} numberOfLines={1}>
          {name || 'Select Customer'}
        </Text>
        <Text style={styles.code}>ID: {code || '—'}</Text>
      </View>
      <Ionicons name="chevron-down" size={18} color={colors.gray3} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.page,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  pressed: { backgroundColor: colors.gray5 },
  name: { ...typography.headline, fontSize: 18 },
  code: { ...typography.footnote, marginTop: 2 },
});
