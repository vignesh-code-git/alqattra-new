import { View, Text, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';

/**
 * Form pieces laid out as in the designs: a label above an outlined box.
 * Required fields get a red label with an asterisk.
 */
export function Field({ label, required, children, style }) {
  return (
    <View style={[styles.field, style]}>
      {label ? (
        <Text style={[styles.label, required && styles.labelRequired]}>
          {label}
          {required ? ' *' : ''}
        </Text>
      ) : null}
      {children}
    </View>
  );
}

/** Outlined text box. */
export function TextField({ multiline, style, ...props }) {
  return (
    <TextInput
      style={[styles.box, styles.input, multiline && styles.inputMultiline, style]}
      placeholderTextColor={colors.gray2}
      selectionColor={colors.blue}
      underlineColorAndroid="transparent"
      multiline={multiline}
      {...props}
    />
  );
}

/** Outlined box that opens a picker: optional leading icon, value, caret. */
export function SelectField({ value, placeholder = 'Select', icon, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.box, styles.select, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      {icon ? <Ionicons name={icon} size={18} color={colors.gray} /> : null}
      <Text style={[styles.selectText, !value && styles.placeholder]} numberOfLines={1}>
        {value || placeholder}
      </Text>
      <Ionicons name="caret-down" size={12} color={colors.gray} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  field: { gap: 6 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, letterSpacing: -0.1 },
  labelRequired: { color: colors.red },

  box: {
    minHeight: 46,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.gray4,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
  },
  input: {
    fontSize: 17,
    letterSpacing: -0.4,
    color: colors.text,
    paddingVertical: 0,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : null),
  },
  inputMultiline: { minHeight: 76, paddingVertical: 11, textAlignVertical: 'top' },

  select: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  selectText: { flex: 1, fontSize: 17, letterSpacing: -0.4, color: colors.text },
  placeholder: { color: colors.gray2 },
  pressed: { opacity: 0.5 },
});
