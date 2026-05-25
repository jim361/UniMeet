import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { colors } from '@/constants/theme';
import { notifications } from '@/data/mock';

const iconByType = {
  APPLICATION_STATUS: 'check-circle',
  ADMIN_APPROVAL: 'verified-user',
  NOTICE: 'campaign',
  SYSTEM: 'info',
} as const;

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="알림" subtitle="앱 내부 알림함" showBell={false} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <Text style={styles.sectionLabel}>오늘</Text>
          <TouchableOpacity>
            <Text style={styles.markAll}>모두 읽음</Text>
          </TouchableOpacity>
        </View>
        {notifications.map((notification) => (
          <View key={notification.id} style={[styles.card, !notification.isRead && styles.unreadCard]}>
            <View style={[styles.icon, !notification.isRead && styles.unreadIcon]}>
              <MaterialIcons
                name={iconByType[notification.type]}
                size={24}
                color={!notification.isRead ? colors.canvas : colors.inkMuted}
              />
            </View>
            <View style={styles.body}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.time}>{notification.createdAt}</Text>
              </View>
              <Text style={styles.message}>{notification.body}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, flex: 1 },
  content: { gap: 12, padding: 16, paddingBottom: 28 },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  sectionLabel: { color: colors.inkMuted, fontSize: 15, fontWeight: '900' },
  markAll: { color: colors.navy, fontSize: 14, fontWeight: '900' },
  card: {
    alignItems: 'flex-start',
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  unreadCard: { backgroundColor: colors.surfaceWarm, borderColor: colors.goldPale },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  unreadIcon: { backgroundColor: colors.navyDeep },
  body: { flex: 1, gap: 6 },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: { color: colors.inkDeep, flex: 1, fontSize: 16, fontWeight: '900' },
  time: { color: colors.inkMuted, fontSize: 12, marginLeft: 8 },
  message: { color: colors.ink, fontSize: 14, lineHeight: 20 },
});
