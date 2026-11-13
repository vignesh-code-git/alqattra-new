import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';

/** Shared loading / error / empty blocks so every screen behaves the same. */

export function Loading({ label = 'Loading' }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="small" color={colors.gray} />
      <Text style={styles.loadingText}>{label.toUpperCase()}</Text>
    </View>
  );
}

export function ErrorState({ error, onRetry }) {
  return (
    <View style={styles.center}>
      <Ionicons name="cloud-offline-outline" size={48} color={colors.gray2} />
      <Text style={styles.title}>Could Not Load Data</Text>
      <Text style={styles.body}>{error ? error.message : 'Something went wrong.'}</Text>
      {onRetry ? (
        <Pressable
          onPress={onRetry}
          style={({ pressed }) => [styles.retry, pressed && styles.dim]}
          accessibilityRole="button"
        >
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Empty({ icon = 'file-tray-outline', label = 'Nothing Here Yet' }) {
  return (
    <View style={styles.center}>
      <Ionicons name={icon} size={48} color={colors.gray2} />
      <Text style={styles.title}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dim: { opacity: 0.4 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    gap: spacing.sm,
  },
  loadingText: { fontSize: 13, color: colors.textMuted, letterSpacing: 0.4, marginTop: 2 },
  title: { ...typography.title3, textAlign: 'center', marginTop: spacing.xs },
  body: { ...typography.subhead, color: colors.textMuted, textAlign: 'center' },
  retry: { marginTop: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  retryText: { ...typography.body, color: colors.blue },
});
