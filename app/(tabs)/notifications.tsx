import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { EmptyState } from '@/components/EmptyState';
import { colors } from '@/constants/theme';
import { useNotificationStore } from '@/store/notificationStore';

const iconByType = {
  APPLICATION_STATUS: 'check-circle',
  ADMIN_APPROVAL: 'verified-user',
  NOTICE: 'campaign',
  SYSTEM: 'info',
} as const;

export default function NotificationsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'unread' | 'all'>('unread');
  const { notifications, markAllAsRead, markAsRead } = useNotificationStore();
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;
  const visibleNotifications =
    filter === 'unread'
      ? notifications.filter((notification) => !notification.isRead)
      : notifications;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="알림" subtitle="앱 내부 알림함" showBell={false} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <Text style={styles.sectionLabel}>
            {filter === 'unread' ? `안 읽음 ${unreadCount}개` : '전체 알림'}
          </Text>
          <TouchableOpacity onPress={markAllAsRead} disabled={unreadCount === 0}>
            <Text style={styles.markAll}>모두 읽음</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'unread' && styles.filterChipActive]}
            onPress={() => setFilter('unread')}
          >
            <Text style={[styles.filterText, filter === 'unread' && styles.filterTextActive]}>
              안 읽음
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              전체
            </Text>
          </TouchableOpacity>
        </View>

        {visibleNotifications.length > 0 ? (
          visibleNotifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[styles.card, !notification.isRead && styles.unreadCard]}
              activeOpacity={0.85}
              onPress={() => {
                markAsRead(notification.id);
                router.push({ pathname: '/notifications/[id]', params: { id: notification.id } });
              }}
            >
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
            </TouchableOpacity>
          ))
        ) : (
          <EmptyState
            icon="notifications-none"
            title="안 읽은 알림이 없어요"
            body="전체 탭에서 지난 알림을 다시 확인할 수 있습니다."
          />
        )}
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
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    backgroundColor: colors.canvas,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  filterChipActive: { backgroundColor: colors.navyDeep, borderColor: colors.navyDeep },
  filterText: { color: colors.inkMuted, fontSize: 13, fontWeight: '900' },
  filterTextActive: { color: colors.canvas },
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
