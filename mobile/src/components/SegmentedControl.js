import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, spacing } from '../theme';

/** iOS segmented control: grey track, white raised thumb on the selected segment. */
export default function SegmentedControl({ options, value, onChange }) {
  return (
    <View style={styles.track} accessibilityRole="tablist">
      {options.map((option, i) => {
        const selected = option === value;
        const prevSelected = i > 0 && options[i - 1] === value;
        return (
          <View key={option} style={styles.cell}>
            {i > 0 && !selected && !prevSelected ? <View style={styles.tick} /> : null}
            <Pressable
              onPress={() => onChange(option)}
              style={[styles.segment, selected && styles.segmentSelected]}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
            >
              <Text style={[styles.label, selected && styles.labelSelected]} numberOfLines={1}>
                {option}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.fill,
    borderRadius: 9,
    padding: 2,
    height: 32,
  },
  cell: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  tick: { width: StyleSheet.hairlineWidth, height: 14, backgroundColor: colors.separator },
  segment: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    paddingHorizontal: spacing.xs,
  },
  segmentSelected: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  label: { fontSize: 13, fontWeight: '500', color: colors.text, letterSpacing: -0.1 },
  labelSelected: { fontWeight: '600' },
});
