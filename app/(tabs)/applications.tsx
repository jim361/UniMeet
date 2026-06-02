// app/applications.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { clubStore } from '../store/clubStore';

export default function ApplicationsScreen() {
  const [refreshKey, setRefreshKey] = useState(0);
  const list = clubStore.getApplications();

  const handleDecision = (id: string, choice: '합격' | '불합격') => {
    clubStore.reviewApplication(id, choice);
    Alert.alert('심사 완료', `선택하신 결과가 반영되었으며 학생에게 알림이 전송되었습니다.`);
    setRefreshKey(prev => prev + 1); // 화면 강제 리렌더링 효과
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>지원자 관리</Text>
      
      {list.map((applicant) => (
        <View key={applicant.id} style={styles.card}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{applicant.userName.charAt(0)}</Text>
            </View>
            
            <View>
              <Text style={styles.nameText}>{applicant.userName}</Text>
              <Text style={styles.subText}>{applicant.studentId} · {applicant.applyDate}</Text>
              
              {applicant.status === '대기' ? (
                <View style={styles.btnRow}>
                  <TouchableOpacity style={styles.passBtn} onPress={() => handleDecision(applicant.id, '합격')}>
                    <Text style={styles.passText}>합격</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.failBtn} onPress={() => handleDecision(applicant.id, '불합격')}>
                    <Text style={styles.failText}>불합격</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: applicant.status === '합격' ? '#137333' : '#c5221f', marginTop: 5 }}>
                  결과: {applicant.status} 완료
                </Text>
              )}
            </View>
          </div>

          <View style={[styles.badge, { backgroundColor: applicant.status === '합격' ? '#e6f4ea' : applicant.status === '불합격' ? '#fce8e6' : '#fef3d6' }]}>
            <Text style={[styles.badgeText, { color: applicant.status === '합격' ? '#137333' : applicant.status === '불합격' ? '#c5221f' : '#b08400' }]}>
              {applicant.status}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fbfd', padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1a2d42', marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, border豎idth: 1, borderColor: '#f0f3f6', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#fef3d6', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#1a2d42' },
  nameText: { fontSize: 18, fontWeight: 'bold', color: '#1a2d42', marginBottom: 4 },
  subText: { fontSize: 14, color: '#a0aec0', marginBottom: 10 },
  btnRow: { flexDirection: 'row', gap: 8 },
  passBtn: { backgroundColor: '#e6f4ea', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  passText: { color: '#137333', fontWeight: 'bold', fontSize: 14 },
  failBtn: { backgroundColor: '#fce8e6', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  failText: { color: '#c5221f', fontWeight: 'bold', fontSize: 14 },
  badge: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12 },
  badgeText: { fontSize: 13, fontWeight: 'bold' }
});
