import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

/** Settings-style row icon: white glyph on a coloured rounded square. */
export default function IconBadge({ icon, color, size = 29 }) {
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: color, width: size, height: size, borderRadius: Math.round(size * 0.24) },
      ]}
    >
      <Ionicons name={icon} size={Math.round(size * 0.6)} color={colors.textInverse} />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignItems: 'center', justifyContent: 'center' },
});
