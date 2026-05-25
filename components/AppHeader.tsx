import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/theme';

type AppHeaderProps = {
  title?: string;
  subtitle?: string;
  showBell?: boolean;
};

export function AppHeader({ title = 'UniMeet', subtitle, showBell = true }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {showBell ? (
        <Link href="/(tabs)/notifications" asChild>
          <TouchableOpacity style={styles.iconButton} accessibilityLabel="알림 보기">
            <MaterialIcons name="notifications-none" size={24} color={colors.navyDeep} />
          </TouchableOpacity>
        </Link>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.canvas,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    color: colors.navyDeep,
    fontSize: 24,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.inkMuted,
    fontSize: 13,
    marginTop: 2,
  },
  iconButton: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
});
