import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNotificationStore } from '@/store/notificationStore';

export default function NotificationsScreen() {
  const notifications = useNotificationStore((state) => state.notifications);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>알림 내역</Text>
      {notifications.length === 0 ? (
        <Text style={styles.empty}>도착한 알림 메시지가 없습니다.</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isPass = item.body.includes('축하합니다');
            return (
              <View style={[styles.alertCard, { backgroundColor: isPass ? '#e6f4ea' : '#fce8e6' }]}>
                <Text style={styles.alertTitle}>{item.title}</Text>
                <Text style={[styles.alertText, { color: isPass ? '#137333' : '#c5221f' }]}>
                  {item.body}
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  empty: { color: '#999', textAlign: 'center', marginTop: 40 },
  alertCard: { padding: 16, borderRadius: 12, marginBottom: 12 },
  alertTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 6, color: '#333' },
  alertText: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
});
