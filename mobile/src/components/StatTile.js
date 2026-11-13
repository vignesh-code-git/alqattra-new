import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

/** A figure above a grey footnote caption. */
export default function StatTile({ value, label, color, style }) {
  return (
    <View style={[styles.wrap, style]}>
      <Text style={[styles.value, color ? { color } : null]} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: 4 },
  value: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
  label: { fontSize: 13, lineHeight: 18, color: colors.textMuted, marginTop: 2, textAlign: 'center' },
});
