import { MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/theme';

type AppHeaderProps = {
  title?: string;
  subtitle?: string;
  showBell?: boolean;
  showBack?: boolean;
};

export function AppHeader({
  title = 'UniMeet',
  subtitle,
  showBell = true,
  showBack = false,
}: AppHeaderProps) {
  const router = useRouter();
  const isBrandHeader = title === 'UniMeet' && !showBack;

  return (
    <View style={[styles.container, isBrandHeader && styles.brandContainer]}>
      <View style={styles.leftGroup}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            accessibilityLabel="뒤로가기"
            activeOpacity={0.78}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back-ios-new" size={20} color={colors.navyDeep} />
          </TouchableOpacity>
        ) : null}

        {isBrandHeader ? (
          <View style={styles.logoMark}>
            <MaterialIcons name="school" size={22} color={colors.navyDeep} />
          </View>
        ) : null}

        <View style={styles.titleGroup}>
          <Text style={[styles.title, isBrandHeader && styles.brandTitle]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.subtitle, isBrandHeader && styles.brandSubtitle]}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      {showBell ? (
        <Link href="/(tabs)/notifications" asChild>
          <TouchableOpacity style={styles.iconButton} accessibilityLabel="알림 보기">
            <MaterialIcons
              name="notifications-none"
              size={24}
              color={isBrandHeader ? colors.goldPale : colors.navyDeep}
            />
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
  brandContainer: {
    backgroundColor: colors.navyDeep,
    borderBottomColor: colors.navyDeep,
  },
  leftGroup: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    minWidth: 0,
  },
  titleGroup: {
    flexShrink: 1,
  },
  logoMark: {
    alignItems: 'center',
    backgroundColor: colors.goldPale,
    borderRadius: 11,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  backButton: {
    alignItems: 'center',
    borderRadius: 999,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  title: {
    color: colors.navyDeep,
    fontSize: 24,
    fontWeight: '900',
  },
  brandTitle: {
    color: colors.canvas,
  },
  subtitle: {
    color: colors.inkMuted,
    fontSize: 13,
    marginTop: 2,
  },
  brandSubtitle: {
    color: colors.goldPale,
  },
  iconButton: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
});
