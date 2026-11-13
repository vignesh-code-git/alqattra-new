import { View, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme';

/** White inset-grouped surface on the grey grouped background. Flat, no shadow. */
export default function Card({ children, style, padded = true }) {
  return <View style={[styles.card, padded && styles.padded, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  padded: {
    padding: spacing.lg,
  },
});
