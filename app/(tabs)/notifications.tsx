// app/notifications.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { clubStore } from '../store/clubStore';

export default function NotificationsScreen() {
  // 현재 로그인한 임시 학생 ID('minsu123') 기준 조회
  const myAlerts = clubStore.getNotifications('minsu123');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>알림 내역</Text>
      {myAlerts.length === 0 ? (
        <Text style={styles.empty}>도착한 알림 메시지가 없습니다.</Text>
      ) : (
        <FlatList
          data={myAlerts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isPass = item.message.includes('축하합니다');
            return (
              <View style={[styles.alertCard, { backgroundColor: isPass ? '#e6f4ea' : '#fce8e6' }]}>
                <Text style={[styles.alertText, { color: isPass ? '#137333' : '#c5221f' }]}>
                  {item.message}
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
  alertText: { fontSize: 14, fontWeight: '600', lineHeight: 20 }
});
