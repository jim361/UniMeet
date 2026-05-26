import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '@/constants/theme';
import { useT } from '@/utils/i18n';

const tabIcons = {
  home: 'home',
  explore: 'explore',
  applications: 'assignment',
  notifications: 'notifications-none',
  profile: 'person-outline',
} as const;

export default function TabLayout() {
  const t = useT();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.navyDeep,
        tabBarInactiveTintColor: colors.inkMuted,
        tabBarStyle: {
          backgroundColor: colors.canvas,
          borderTopColor: colors.borderSoft,
          height: 82,
          paddingBottom: 14,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarIcon: ({ color, size }) => {
          const name = tabIcons[route.name as keyof typeof tabIcons] ?? 'circle';
          return <MaterialIcons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: t('home') }} />
      <Tabs.Screen name="explore" options={{ title: t('explore') }} />
      <Tabs.Screen name="applications" options={{ title: t('applications') }} />
      <Tabs.Screen name="notifications" options={{ title: t('notifications') }} />
      <Tabs.Screen name="profile" options={{ title: t('profile') }} />
    </Tabs>
  );
}
