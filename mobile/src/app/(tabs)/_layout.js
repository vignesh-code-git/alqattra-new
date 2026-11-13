import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

/**
 * The four tabs from the designs - Home, New Sale, Orders, New Customer -
 * drawn as a standard iOS tab bar: light bar material with a hairline top
 * edge, filled glyphs, 10pt labels, system blue for the selected tab.
 */
const icon = (name) =>
  function TabIcon({ color }) {
    return <Ionicons name={name} size={25} color={color} />;
  };

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '500', letterSpacing: 0.1 },
        tabBarStyle: {
          backgroundColor: colors.bar,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.separator,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: icon('home') }} />
      <Tabs.Screen name="new-sale" options={{ title: 'New Sale', tabBarIcon: icon('storefront') }} />
      <Tabs.Screen name="orders" options={{ title: 'Orders', tabBarIcon: icon('receipt') }} />
      <Tabs.Screen
        name="add-customer"
        options={{ title: 'New Customer', tabBarIcon: icon('person-add') }}
      />
    </Tabs>
  );
}
