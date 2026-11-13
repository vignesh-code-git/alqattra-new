import { View, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';

/** iOS search field: 36pt grey rounded field, magnifier, clear button. */
export default function SearchBar({ value, onChangeText, placeholder = 'Search' }) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="search" size={17} color={colors.gray} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        selectionColor={colors.blue}
        returnKeyType="search"
        autoCorrect={false}
        underlineColorAndroid="transparent"
      />
      {value ? (
        <Pressable onPress={() => onChangeText('')} hitSlop={10} accessibilityLabel="Clear search">
          <Ionicons name="close-circle" size={18} color={colors.gray} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.fill,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    height: 36,
  },
  input: {
    flex: 1,
    fontSize: 17,
    letterSpacing: -0.4,
    color: colors.text,
    padding: 0,
    // Browsers draw a focus ring on inputs; native platforms do not.
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : null),
  },
});
