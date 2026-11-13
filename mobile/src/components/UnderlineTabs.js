import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme';

/** Two-or-more equal tabs on a white strip; the active one is underlined in blue. */
export default function UnderlineTabs({ options, value, onChange }) {
  return (
    <View style={styles.bar} accessibilityRole="tablist">
      {options.map((option) => {
        const active = option === value;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            style={styles.tab}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{option}</Text>
            <View style={[styles.underline, active && styles.underlineActive]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  tab: { flex: 1, alignItems: 'center', paddingTop: 13 },
  label: { fontSize: 16, fontWeight: '600', color: colors.textMuted, letterSpacing: -0.3, marginBottom: 11 },
  labelActive: { color: colors.text },
  underline: { height: 2.5, alignSelf: 'stretch', backgroundColor: 'transparent' },
  underlineActive: { backgroundColor: colors.blue },
});
