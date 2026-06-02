// app/applications.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { clubStore } from '../store/clubStore';

export default function ApplicationsScreen() {
  const [tick, setTick] = useState(0);
  const applicantList = clubStore.getApplications();

  const handleProcess = (id: string, decision: '합격' | '불합격') => {
    // 스토어 함수를 실행시켜 상태 변경 및 알림창 데이터 적재 처리
    clubStore.reviewApplication(id, decision);
    Alert.alert('심사 완료', `선택하신 결과(${decision})가 정상 처리되어 학생에게 알림이 전송되었습니다.`);
    setTick(t => t + 1); // 화면 강제 리렌더링 트리거
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>지원자 관리</Text>
      
      {applicantList.map((applicant) => (
        <View key={applicant.id} style={styles.card}>
          <View style={styles.leftRow}>
            {/* 프로필 이미지 플레이스홀더 */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{applicant.userName.charAt(0)}</Text>
            </View>
            
            <View>
              <Text style={styles.nameText}>{applicant.userName}</Text>
              <Text style={styles.subText}>{applicant.studentId} · {applicant.applyDate}</Text>
              
              {/* 대기중 상태일 때만 합격 불합격 버튼 노출 */}
              {applicant.status === '대기' && (
                <View style={styles.btnGroup}>
                  <TouchableOpacity style={styles.passBtn} onPress={() => handleProcess(applicant.id, '합격')}>
                    <Text style={styles.passBtnText}>합격</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.failBtn} onPress={() => handleProcess(applicant.id, '불합격')}>
                    <Text style={styles.failBtnText}>불합격</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {/* 우측 상단 라운드 배지 현황 */}
          <View style={[styles.statusBadge, {
            backgroundColor: applicant.status === '합격' ? '#e6f4ea' : applicant.status === '불합격' ? '#fce8e6' : '#fef3d6'
          }]}>
            <Text style={[styles.badgeText, {
              color: applicant.status === '합격' ? '#137333' : applicant.status === '불합격' ? '#c5221f' : '#b08400'
            }]}>
              {applicant.status}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fbfd', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1a2d42', marginBottom: 20 },
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 20, marginBottom: 14, border豎idth: 1, borderColor: '#f0f3f6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  leftRow: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#fef3d6', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: 'bold', color: '#1a2d42' },
  nameText: { fontSize: 18, fontWeight: 'bold', color: '#1a2d42' },
  subText: { fontSize: 13, color: '#a0aec0', marginTop: 2, marginBottom: 10 },
  btnGroup: { flexDirection: 'row', gap: 8 },
  passBtn: { backgroundColor: '#e6f4ea', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  passBtnText: { color: '#137333', fontWeight: 'bold', fontSize: 13 },
  failBtn: { backgroundColor: '#fce8e6', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  failBtnText: { color: '#c5221f', fontWeight: 'bold', fontSize: 13 },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10 },
  badgeText: { fontSize: 12, fontWeight: 'bold' }
});
