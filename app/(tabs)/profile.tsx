// app/profile.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { clubStore } from '../store/clubStore';

export default function ProfileScreen() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [clubName, setClubName] = useState('');
  const [clubDesc, setClubDesc] = useState('');

  const handleCreateClub = () => {
    if (!clubName.trim()) {
      Alert.alert('경고', '동아리 이름을 입력해주세요.');
      return;
    }
    // 진짜로 동아리 데이터 생성 연동
    clubStore.createClub(clubName, clubDesc);
    Alert.alert('성공', `[${clubName}] 동아리가 진짜로 생성되었습니다!`);
    setClubName('');
    setClubDesc('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 프로필 (마이페이지)</Text>
      
      <TouchableOpacity style={styles.dashboardButton} onPress={() => setIsAdminMode(!isAdminMode)}>
        <Text style={styles.buttonText}>{isAdminMode ? '관리자 대시보드 닫기' : '관리자 대시보드 열기'}</Text>
      </TouchableOpacity>

      {isAdminMode && (
        <View style={styles.adminBox}>
          <Text style={styles.adminTitle}>✨ 새 동아리 진짜 생성하기</Text>
          <TextInput 
            style={styles.input} 
            placeholder="동아리 이름" 
            value={clubName} 
            onChangeText={setClubName} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="동아리 설명" 
            value={clubDesc} 
            onChangeText={setClubDesc} 
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleCreateClub}>
            <Text style={styles.submitText}>동아리 생성</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  dashboardButton: { backgroundColor: '#1a2d42', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  adminBox: { marginTop: 20, padding: 15, border豎idth: 1, borderColor: '#ddd', borderRadius: 12, backgroundColor: '#f9f9f9' },
  adminTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 6, border豎idth: 1, borderColor: '#ccc', marginBottom: 10 },
  submitButton: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 6, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: 'bold' }
});
