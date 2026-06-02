// app/home.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { clubStore } from '../store/clubStore';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newClubName, setNewClubName] = useState('');
  const [newClubDesc, setNewClubDesc] = useState('');

  // 진짜 동아리 생성 완료 버튼을 누를 때
  const handleConfirmCreate = () => {
    if (!newClubName.trim()) {
      Alert.alert('오류', '동아리 이름을 입력해주세요.');
      return;
    }
    
    // store 데이터에 주입
    clubStore.createClub(newClubName, newClubDesc);
    
    Alert.alert('생성 완료', `[${newClubName}] 동아리가 진짜로 생성되었습니다!`);
    setNewClubName('');
    setNewClubDesc('');
    setModalVisible(false); // 모달 닫기
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>운영 작업</Text>

      {/* 동아리 생성 버튼 카드 (여기를 터치 가능하도록 변경했습니다!) */}
      <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
        <View style={styles.iconContainer}>
          {/* 상점/플러스 대체 텍스트 아이콘 */}
          <Text style={styles.iconText}>🏪+</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>동아리 생성</Text>
          <Text style={styles.cardSubtitle}>운영자가 공식 동아리를 생성합니다.</Text>
        </View>
      </TouchableOpacity>

      {/* 회원 권한 부여 등 나머지 UI 컴포넌트 위치... */}
      <View style={[styles.card, { marginTop: 12, opacity: 0.6 }]}>
        <View style={[styles.iconContainer, { backgroundColor: '#e8f0fe' }]}>
          <Text style={styles.iconText}>⭐</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>회장 권한 부여</Text>
        </View>
      </View>


      {/* 팝업창 (Modal) 레이아웃 */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>✨ 새 동아리 개설</Text>
            
            <TextInput 
              style={styles.input} 
              placeholder="생성할 동아리 이름 입력" 
              value={newClubName}
              onChangeText={setNewClubName}
            />
            
            <TextInput 
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]} 
              placeholder="동아리 한 줄 소개 및 설명" 
              value={newClubDesc}
              onChangeText={setNewClubDesc}
              multiline
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleConfirmCreate}>
                <Text style={styles.saveBtnText}>진짜로 생성</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fbfd', padding: 20, paddingTop: 40 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#1a2d42', marginBottom: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 18, border豎idth: 1, borderColor: '#f0f3f6', flexDirection: 'row', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' },
  iconContainer: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fef3d6', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  iconText: { fontSize: 18 },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1a2d42', marginBottom: 2 },
  cardSubtitle: { fontSize: 13, color: '#8a9aa8' },
  
  // 모달 스타일 디자인
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', width: '100%', max豎idth: 340, borderRadius: 20, padding: 24 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#1a2d42', textAlign: 'center' },
  input: { backgroundColor: '#f4f6f9', padding: 12, borderRadius: 10, marginBottom: 12, fontSize: 14 },
  modalBtnRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  cancelBtn: { flex: 1, backgroundColor: '#f0f2f5', padding: 14, borderRadius: 10, alignItems: 'center' },
  cancelBtnText: { color: '#606770', fontWeight: 'bold' },
  saveBtn: { flex: 1, backgroundColor: '#0056b3', padding: 14, borderRadius: 10, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontWeight: 'bold' }
});
