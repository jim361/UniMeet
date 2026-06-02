import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
// 💡 중요: app/(tabs) 폴더 안에 있으므로 상위로 두 번(../../) 나가야 store가 잡힙니다!
import { clubStore } from '../../store/clubStore';

export default function ApplicationsScreen() {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    setApplicants(clubStore.getApplications());
  }, []);

  // 관리자 계정에서 합격/불합격 선택 시 처리
  const handleProcess = (id: string, decision: '합격' | '불합격') => {
    clubStore.reviewApplication(id, decision);

    // 화면 실시간 새로고침
    const updatedList = clubStore.getApplications();
    setApplicants([...updatedList]);

    // 알림 메시지 문구 세팅
    const targetApp = updatedList.find(app => app.id === id);
    let alertMsg = "";
    
    if (decision === '합격') {
      alertMsg = `축하합니다. [${targetApp?.clubName || '동아리'}] 가입 완료되었습니다.`;
    } else {
      alertMsg = `[${targetApp?.clubName || '동아리'}]에 지원해주셔서 감사합니다. 아쉽지만 다음 기회에 도전해주세요`;
    }
    
    // 웹 브라우저 호환성 알림창 실행
    if (Platform.OS === 'web') {
      window.alert(`[${decision} 처리 완료]\n\n${alertMsg}`);
    } else {
      alert(alertMsg); 
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>지원자 관리</Text>
      
      {applicants.length === 0 ? (
        <Text style={{ color: '#888', textAlign: 'center', marginTop: 40 }}>지원자가 없습니다.</Text>
      ) : (
        applicants.map((applicant) => (
          <View key={applicant.id} style={styles.card}>
            <View style={styles.leftContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {applicant.userName ? applicant.userName.charAt(0) : '유'}
                </Text>
              </View>
              
              <View style={styles.infoArea}>
                <Text style={styles.nameText}>{applicant.userName}</Text>
                <Text style={styles.subText}>{applicant.studentId} · {applicant.applyDate}</Text>
                
                {(applicant.status === '대기' || applicant.status === '검토 중') ? (
                  <View style={styles.btnGroup}>
                    <TouchableOpacity style={styles.passBtn} onPress={() => handleProcess(applicant.id, '합격')}>
                      <Text style={styles.passBtnText}>합격</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.failBtn} onPress={() => handleProcess(applicant.id, '불합격')}>
                      <Text style={styles.failBtnText}>불합격</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={[styles.resultText, { color: applicant.status === '합격' ? '#137333' : '#c5221f' }]}>
                    결과 반영: {applicant.status}
                  </Text>
                )}
              </View>
            </View>

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
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fbfd', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1a2d42', marginBottom: 20 },
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 20, marginBottom: 14, borderWidth: 1, borderColor: '#f0f3f6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  leftContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#fef3d6', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  avatarText: { fontSize: 16, fontWeight: 'bold', color: '#1a2d42' },
  infoArea: { flex: 1 },
  nameText: { fontSize: 18, fontWeight: 'bold', color: '#1a2d42' },
  subText: { fontSize: 13, color: '#a0aec0', marginTop: 2, marginBottom: 10 },
  btnGroup: { flexDirection: 'row', gap: 8 },
  passBtn: { backgroundColor: '#e6f4ea', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  passBtnText: { color: '#137333', fontWeight: 'bold', fontSize: 13 },
  failBtn: { backgroundColor: '#fce8e6', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  failBtnText: { color: '#c5221f', fontWeight: 'bold', fontSize: 13 },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10 },
  badgeText: { fontSize: 12, fontWeight: 'bold' },
  resultText: { fontSize: 13, fontWeight: 'bold', marginTop: 4 }
});
