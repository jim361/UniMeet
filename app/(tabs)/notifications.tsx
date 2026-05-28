// app/(tabs)/notifications.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNotificationStore } from "@/store/notificationStore";
import { currentUser } from "@/data/mock";

export default function NotificationsScreen() {
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();

  const myNotifications = notifications.filter(
    (n) => n.userId === currentUser.id
  );

  const unreadCount = myNotifications.filter((n) => !n.isRead).length;

  const ICON: Record<string, string> = {
    APPLICATION_APPROVED: "🎉",
    APPLICATION_REJECTED: "😔",
    NEW_APPLICATION: "📋",
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          알림{unreadCount > 0 ? ` (${unreadCount})` : ""}
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAll}>모두 읽음</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={myNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, !item.isRead && styles.unreadCard]}
            onPress={() => markAsRead(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.icon}>{ICON[item.type] ?? "🔔"}</Text>
            <View style={styles.content}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{item.title}</Text>
                {!item.isRead && <View style={styles.dot} />}
              </View>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>
                {new Date(item.createdAt).toLocaleString("ko-KR", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>알림이 없습니다.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#1a1a2e" },
  markAll: { fontSize: 13, color: "#4f46e5", fontWeight: "600" },
  list: { padding: 16, gap: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadCard: { borderLeftWidth: 3, borderLeftColor: "#4f46e5" },
  icon: { fontSize: 28, marginTop: 2 },
  content: { flex: 1 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  title: { fontSize: 15, fontWeight: "700", color: "#1a1a2e" },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#4f46e5" },
  message: { fontSize: 13, color: "#555", lineHeight: 18, marginBottom: 6 },
  time: { fontSize: 11, color: "#aaa" },
  empty: { alignItems: "center", paddingTop: 80 },
  emptyText: { color: "#aaa", fontSize: 15 },
});
