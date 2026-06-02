import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { clubStore } from '../store/clubStore';

export default function ApplicationsScreen() {
  const [applicants, setApplicants] = useState([]);

  // 화면이 처음 로드될 때 스토어에서 지원자 명단을 가져옴
  useEffect(() => {
    setApplicants(clubStore.getApplications());
  }, []);

  // [기능 2] 합격/불합격 버튼 클릭 핸들러
  const handleProcess = (id: string, decision: '합격' | '불합격') => {
    // 1. cmd 터미널 창에 로그를 찍어 버튼 작동 여부 확인
    console.log(`[로그] 버튼 클릭됨 - ID: ${id}, 선택: ${decision}`);

    // 2. 전역 스토어 데이터 업데이트
    clubStore.reviewApplication(id, decision);

    // 3. 상태를 재지정하여 화면을 강제로 즉시 새로고침
    const updatedList = clubStore.getApplications();
    setApplicants([...updatedList]);

    // 4. 알림 메시지 문구 조립
    const targetApp = updatedList.find(app => app.id === id);
    let alertMsg = "";
    
    if (decision === '합격') {
      alertMsg = `축하합니다. [${targetApp?.clubName || '동아리'}] 가입 완료되었습니다.`;
    } else {
      alertMsg = `[${targetApp?.clubName || '동아리'}]에 지원해주셔서 감사합니다. 아쉽지만 다음 기회에 도전해주세요`;
    }
    
    // 5. 💡 웹 브라우저와 모바일 환경 모두 호환되는 알림창 실행
    if (Platform.OS === 'web') {
      window.alert(`[${decision} 처리 완료]\n\n${alertMsg}`);
    } else {
      // 모바일 앱 환경일 때
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
            {/* 왼쪽 영역: 프로필 및 유저 정보 */}
            <View style={styles.leftContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {applicant.userName ? applicant.userName.charAt(0) : '유'}
                </Text>
              </View>
              
              <View style={styles.infoArea}>
                <Text style={styles.nameText}>{applicant.userName}</Text>
                <Text style={styles.subText}>{applicant.studentId} · {applicant.applyDate}</Text>
                
                {/* 대기 나 검토 중 상태일 때 버튼 활성화 */}
                {(applicant.status === '대기' || applicant.status === '검토 중') ? (
                  <View style={styles.btnGroup}>
                    <TouchableOpacity 
                      style={styles.passBtn} 
                      onPress={() => handleProcess(applicant.id, '합격')}
                    >
                      <Text style={styles.passBtnText}>합격</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.failBtn} 
                      onPress={() => handleProcess(applicant.id, '불합격')}
                    >
                      <Text style={styles.failBtnText}>불합격</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={[
                    styles.resultText, 
                    { color: applicant.status === '합격' ? '#137333' : '#c5221f' }
                  ]}>
                    결과 반영: {applicant.status}
                  </Text>
                )}
              </View>
            </View>

            {/* 오른쪽 영역: 우측 상단 상태 태그 배지 */}
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
