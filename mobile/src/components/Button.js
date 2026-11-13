import { Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';

// Button tones. Filled ones carry the colour the designs give each action
// (green Call, blue Navigate, orange SMS ...); tinted and outline ones are the
// quieter iOS variants.
const TONES = {
  primary: { bg: colors.blue, fg: colors.textInverse },
  success: { bg: colors.green, fg: colors.textInverse },
  destructive: { bg: colors.red, fg: colors.textInverse },
  warning: { bg: colors.orange, fg: colors.textInverse },
  yellow: { bg: colors.yellow, fg: '#3A2E00' },
  graySolid: { bg: colors.gray, fg: colors.textInverse },
  gray: { bg: colors.fill, fg: colors.blue },
  tinted: { bg: colors.blueTint, fg: colors.blue },
  tintedGreen: { bg: colors.greenTint, fg: colors.successText },
  tintedOrange: { bg: colors.orangeTint, fg: colors.warningText },
  outlineGreen: { bg: 'transparent', fg: colors.successText, border: colors.green },
};

export default function Button({ label, icon, tone = 'primary', size = 'lg', onPress, style }) {
  const t = TONES[tone] || TONES.primary;
  const compact = size === 'md';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.btn,
        compact && styles.btnCompact,
        { backgroundColor: t.bg },
        t.border ? { borderWidth: 1.5, borderColor: t.border } : null,
        pressed && styles.pressed,
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={compact ? 16 : 18} color={t.fg} /> : null}
      <Text
        style={[styles.label, compact && styles.labelCompact, { color: t.fg }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 50,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
  },
  btnCompact: { height: 42, borderRadius: radius.md, paddingHorizontal: spacing.sm },
  pressed: { opacity: 0.6 },
  label: { fontSize: 17, fontWeight: '600', letterSpacing: -0.4, flexShrink: 1 },
  labelCompact: { fontSize: 15, letterSpacing: -0.2 },
});
