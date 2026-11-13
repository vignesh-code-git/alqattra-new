import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../theme';

const TONES = {
  warning: { bg: colors.orangeTint, fg: colors.warningText, icon: 'information-circle', tint: colors.orange },
  success: { bg: colors.greenTint, fg: colors.successText, icon: 'checkmark-circle', tint: colors.green },
  error: { bg: colors.redTint, fg: colors.red, icon: 'alert-circle', tint: colors.red },
};

/** Tinted callout used for limitations, confirmations and errors. */
export default function Notice({ tone = 'warning', children, style }) {
  const t = TONES[tone] || TONES.warning;
  return (
    <View style={[styles.wrap, { backgroundColor: t.bg }, style]}>
      <Ionicons name={t.icon} size={20} color={t.tint} />
      <Text style={[styles.text, { color: t.fg }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    gap: spacing.sm,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  text: { ...typography.footnote, flex: 1 },
});
