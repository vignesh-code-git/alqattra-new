import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme';

const ICON_SIZE = 66;
// iOS app icons use a corner radius of roughly 22.5% of their size.
const CORNER = Math.round(ICON_SIZE * 0.225);

// Two glyph sets: 'ios' is Ionicons, drawn in the manner of Apple's SF
// Symbols; the default is Material Community Icons.
const GLYPH_SETS = {
  ios: { Component: Ionicons, size: 40 },
  default: { Component: MaterialCommunityIcons, size: 38 },
};

/**
 * iPhone home-screen style icon: a rounded square in one flat system colour
 * with a bold white glyph, and the app-style label underneath. The icon dims
 * on press, as home-screen icons do.
 */
export default function QuickActionTile({ icon, set, label, color, onPress }) {
  const { Component: Glyph, size } = GLYPH_SETS[set] || GLYPH_SETS.default;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={styles.cell}
    >
      {({ pressed }) => (
        <>
          <View style={[styles.icon, { backgroundColor: color }, pressed && styles.pressed]}>
            <Glyph name={icon} size={size} color={colors.textInverse} />
          </View>
          <Text style={styles.label} numberOfLines={2}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: '33.333%',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: CORNER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.6 },
  label: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
    marginTop: 7,
  },
});
