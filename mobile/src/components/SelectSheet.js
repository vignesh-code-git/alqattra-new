import { View, Text, StyleSheet, Modal, Pressable, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../theme';

/**
 * iOS sheet picker: grabber, centred title with a blue "Done", and an inset
 * grouped list where the current choice carries a blue checkmark.
 */
export default function SelectSheet({
  visible,
  title,
  options,
  value,
  onSelect,
  onClose,
  keyExtractor = (o) => String(o.value),
}) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose} accessibilityLabel="Close" />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.grabber} />

        <View style={styles.head}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Pressable
            onPress={onClose}
            hitSlop={12}
            style={({ pressed }) => [styles.done, pressed && styles.dim]}
            accessibilityRole="button"
          >
            <Text style={styles.doneText}>Done</Text>
          </Pressable>
        </View>

        <View style={styles.group}>
          <FlatList
            data={options}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            renderItem={({ item }) => {
              const selected = item.value === value;
              return (
                <Pressable
                  onPress={() => {
                    onSelect(item.value, item);
                    onClose();
                  }}
                  style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                >
                  <Text style={styles.rowText} numberOfLines={1}>
                    {item.label}
                  </Text>
                  {selected ? <Ionicons name="checkmark" size={22} color={colors.blue} /> : null}
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  dim: { opacity: 0.4 },
  scrim: { flex: 1, backgroundColor: colors.scrim },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: '75%',
  },
  grabber: {
    alignSelf: 'center',
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.gray3,
    marginTop: 6,
  },
  head: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 72,
  },
  title: { ...typography.headline },
  done: { position: 'absolute', right: spacing.lg, top: 0, bottom: 0, justifyContent: 'center' },
  doneText: { ...typography.headline, color: colors.blue },

  group: {
    flexShrink: 1,
    marginHorizontal: spacing.page,
    marginTop: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  row: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: 11,
    gap: spacing.md,
  },
  rowPressed: { backgroundColor: colors.gray5 },
  rowText: { ...typography.body, flex: 1 },
  sep: { height: StyleSheet.hairlineWidth, backgroundColor: colors.separator, marginLeft: spacing.lg },
});
