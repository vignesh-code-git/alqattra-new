import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors, spacing, typography } from '../theme';

/**
 * iOS navigation bar in its two forms:
 *  - root screens: Large Title on the grouped background, optional grey
 *    eyebrow line above it and a trailing bar button
 *  - pushed screens (showBack): 44pt bar, blue chevron + "Back", centred title
 */
export default function AppHeader({
  title,
  subtitle,
  showBack = false,
  backLabel = 'Back',
  trailingIcon,
  onTrailingPress,
}) {
  const insets = useSafeAreaInsets();

  if (showBack) {
    return (
      <View style={[styles.bar, { paddingTop: insets.top }]}>
        <View style={styles.barRow}>
          <Pressable
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
            hitSlop={12}
            style={({ pressed }) => [styles.back, pressed && styles.dim]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={26} color={colors.blue} />
            <Text style={styles.backText}>{backLabel}</Text>
          </Pressable>

          <Text style={styles.inlineTitle} numberOfLines={1}>
            {title}
          </Text>

          {trailingIcon ? (
            <Pressable
              onPress={onTrailingPress}
              hitSlop={12}
              style={({ pressed }) => [styles.inlineTrailing, pressed && styles.dim]}
              accessibilityRole="button"
            >
              <Ionicons name={trailingIcon} size={22} color={colors.blue} />
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.large, { paddingTop: insets.top + spacing.md }]}>
      {subtitle ? <Text style={styles.eyebrow}>{subtitle}</Text> : null}
      <View style={styles.largeRow}>
        <Text style={styles.largeTitle} numberOfLines={1} adjustsFontSizeToFit>
          {title}
        </Text>
        {trailingIcon ? (
          <Pressable
            onPress={onTrailingPress}
            hitSlop={12}
            style={({ pressed }) => [styles.largeTrailing, pressed && styles.dim]}
            accessibilityRole="button"
          >
            <Ionicons name={trailingIcon} size={20} color={colors.blue} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dim: { opacity: 0.4 },

  // Inline (pushed) bar
  bar: {
    backgroundColor: colors.bar,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  barRow: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 4,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: { ...typography.body, color: colors.blue, marginLeft: -2 },
  inlineTitle: { ...typography.headline, maxWidth: '56%', textAlign: 'center' },
  inlineTrailing: {
    position: 'absolute',
    right: spacing.lg,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },

  // Large-title header
  large: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.page,
    paddingBottom: spacing.sm,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  largeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  largeTitle: { ...typography.largeTitle, flex: 1 },
  largeTrailing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.fill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
