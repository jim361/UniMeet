import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { colors } from '@/constants/theme';
import { useMessageStore } from '@/store/messageStore';

export default function MessagesScreen() {
  const { messages, unreadCount, markAsRead, markAllAsRead, deleteMessage } = useMessageStore();
  const unread = unreadCount();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="메시지함" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {messages.length > 0 && (
          <View style={styles.actionBar}>
            <Text style={styles.unreadText}>안 읽음 {unread}개</Text>
            <TouchableOpacity onPress={markAllAsRead}>
              <Text style={styles.markAll}>모두 읽음</Text>
            </TouchableOpacity>
          </View>
        )}

        {messages.length === 0 ? (
          <View style={styles.empty}>
            <MaterialIcons name="mail-outline" size={52} color={colors.border} />
            <Text style={styles.emptyTitle}>메시지가 없어요</Text>
            <Text style={styles.emptyBody}>동아리 지원 결과가 메시지로 전달됩니다.</Text>
          </View>
        ) : (
          messages.map((msg) => {
            const isAccepted = msg.type === 'ACCEPTED';
            return (
              <TouchableOpacity
                key={msg.id}
                style={[styles.card, !msg.isRead && styles.cardUnread]}
                onPress={() => markAsRead(msg.id)}
                activeOpacity={0.78}
              >
                {/* 아이콘 */}
                <View style={[styles.iconWrap, isAccepted ? styles.iconAccepted : styles.iconRejected]}>
                  <MaterialIcons
                    name={isAccepted ? 'check-circle' : 'cancel'}
                    size={26}
                    color={isAccepted ? colors.success : colors.critical}
                  />
                </View>

                {/* 본문 */}
                <View style={styles.body}>
                  <View style={styles.titleRow}>
                    <Text style={styles.title}>{msg.title}</Text>
                    {!msg.isRead && <View style={styles.dot} />}
                  </View>
                  <Text
                    style={[
                      styles.bodyText,
                      { color: isAccepted ? colors.success : colors.critical },
                    ]}
                  >
                    {msg.body}
                  </Text>
                  <Text style={styles.time}>{msg.createdAt}</Text>
                </View>

                {/* 삭제 */}
                <TouchableOpacity
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  onPress={() => deleteMessage(msg.id)}
                >
                  <MaterialIcons name="close" size={18} color={colors.inkMuted} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, flex: 1 },
  content: { gap: 8, padding: 16, paddingBottom: 28 },
  actionBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  unreadText: { color: colors.inkMuted, fontSize: 13, fontWeight: '700' },
  markAll: { color: colors.navyDeep, fontSize: 13, fontWeight: '800' },
  empty: { alignItems: 'center', gap: 10, paddingTop: 80 },
  emptyTitle: { color: colors.inkDeep, fontSize: 17, fontWeight: '900' },
  emptyBody: { color: colors.inkMuted, fontSize: 14, textAlign: 'center' },
  card: {
    alignItems: 'flex-start',
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
  },
  cardUnread: { backgroundColor: '#F5F8FF', borderColor: '#C7D7F5' },
  iconWrap: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  iconAccepted: { backgroundColor: '#E6F4EA' },
  iconRejected: { backgroundColor: '#FCE8E6' },
  body: { flex: 1, gap: 4 },
  titleRow: { alignItems: 'center', flexDirection: 'row', gap: 6 },
  title: { color: colors.inkDeep, flex: 1, fontSize: 15, fontWeight: '900' },
  dot: { backgroundColor: colors.navy, borderRadius: 5, height: 8, width: 8 },
  bodyText: { fontSize: 14, fontWeight: '700', lineHeight: 20 },
  time: { color: colors.inkMuted, fontSize: 12 },
});
