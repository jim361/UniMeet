import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

export default function NotificationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { notifications, deleteNotification, markAsRead } = useNotificationStore();
  const notification = notifications.find((item) => item.id === id);

  if (!notification) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <AppHeader title="알림 상세" showBell={false} />
        <View style={styles.missing}>
          <EmptyState
            icon="notifications-off"
            title="알림을 찾을 수 없어요"
            body="이미 삭제되었거나 존재하지 않는 알림입니다."
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="알림 상세" subtitle={notification.createdAt} showBell={false} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialIcons
              name={iconByType[notification.type]}
              size={28}
              color={colors.canvas}
            />
          </View>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.body}>{notification.body}</Text>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>상세 내용</Text>
            <Text style={styles.detailText}>{notification.detail}</Text>
          </View>
        </View>

        {notification.actionHref ? (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              markAsRead(notification.id);
              router.push(notification.actionHref as never);
            }}
          >
            <Text style={styles.primaryText}>{notification.actionLabel ?? '관련 화면 보기'}</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            deleteNotification(notification.id);
            router.replace('/(tabs)/notifications');
          }}
        >
          <Text style={styles.deleteText}>알림 삭제</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, flex: 1 },
  content: { gap: 14, padding: 16, paddingBottom: 28 },
  missing: { flex: 1, padding: 16 },
  card: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    padding: 18,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  title: { color: colors.inkDeep, fontSize: 22, fontWeight: '900' },
  body: { color: colors.ink, fontSize: 15, lineHeight: 23 },
  detailBox: {
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.goldPale,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
    padding: 12,
  },
  detailLabel: { color: colors.gold, fontSize: 12, fontWeight: '900' },
  detailText: { color: colors.ink, fontSize: 14, lineHeight: 21 },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    borderRadius: 14,
    padding: 16,
  },
  primaryText: { color: colors.canvas, fontSize: 15, fontWeight: '900' },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(229,62,62,0.1)',
    borderRadius: 14,
    padding: 16,
  },
  deleteText: { color: colors.critical, fontSize: 15, fontWeight: '900' },
});
