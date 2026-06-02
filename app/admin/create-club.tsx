import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { colors } from '@/constants/theme';
import { useClubStore } from '@/store/clubStore';

export default function CreateClubScreen() {
  const router = useRouter();
  const { addClub } = useClubStore();

  const [name, setName] = useState('');
  const [englishName, setEnglishName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState('');
  const [isRecruiting, setIsRecruiting] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const categories = ['봉사', '국제교류', '종교', '학술', '문화예술', '취미'];

  const handleCreate = () => {
    if (!name.trim()) {
      Alert.alert('알림', '동아리 이름을 입력해주세요.');
      return;
    }
    if (!category) {
      Alert.alert('알림', '카테고리를 선택해주세요.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('알림', '동아리 소개를 입력해주세요.');
      return;
    }

    setSubmitting(true);

    const newClub = {
      id: `club-${Date.now()}`,
      name: name.trim(),
      englishName: englishName.trim() || name.trim(),
      category,
      description: description.trim(),
      descriptionTranslations: { en: description.trim() },
      tagline: description.trim().split('.')[0] || description.trim(),
      taglineTranslations: { en: description.trim().split('.')[0] || description.trim() },
      tags: [category, '실제 동아리', isRecruiting ? '모집 중' : '모집 마감'],
      language: 'ko' as const,
      isRecruiting,
      safetyBadgeStatus: 'NONE' as const,
      members: parseInt(members) || 0,
      imageUrl: '/clubs/default.png',
      meetingInfo: '정기 활동은 동아리 공지 후 진행',
      meetingInfoTranslations: { en: 'Regular activities are announced by the club.' },
      recruitInfo: '동아리 모집 공고를 확인해주세요.',
      recruitInfoTranslations: { en: 'Please check the club recruitment notice.' },
      recentActivities: ['정기 모임'],
      recentActivityTranslations: { en: ['Regular meeting'] },
    };

    addClub(newClub);
    setSubmitting(false);

    Alert.alert(
      '동아리 생성 완료',
      `${name} 동아리가 성공적으로 생성되었습니다!`,
      [{ text: '확인', onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="동아리 생성" subtitle="새 동아리를 등록합니다" showBack />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

        <View style={styles.field}>
          <Text style={styles.label}>동아리 이름 <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="예: 글로벌패밀리"
            value={name}
            onChangeText={setName}
            maxLength={50}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>영문 이름</Text>
          <TextInput
            style={styles.input}
            placeholder="예: Global Family"
            value={englishName}
            onChangeText={setEnglishName}
            maxLength={50}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>카테고리 <Text style={styles.required}>*</Text></Text>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, category === cat && styles.categoryChipActive]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>동아리 소개 <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.textarea}
            placeholder="동아리를 소개해주세요."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            maxLength={500}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{description.length}/500</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>멤버 수</Text>
          <TextInput
            style={styles.input}
            placeholder="예: 30"
            value={members}
            onChangeText={setMembers}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>모집 상태</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleChip, isRecruiting && styles.toggleChipActive]}
              onPress={() => setIsRecruiting(true)}
            >
              <Text style={[styles.toggleText, isRecruiting && styles.toggleTextActive]}>
                모집 중
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleChip, !isRecruiting && styles.toggleChipActiveRed]}
              onPress={() => setIsRecruiting(false)}
            >
              <Text style={[styles.toggleText, !isRecruiting && styles.toggleTextActive]}>
                모집 마감
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.createButton, submitting && styles.disabledButton]}
          onPress={handleCreate}
          disabled={submitting}
        >
          <MaterialIcons name="add-business" size={20} color="#fff" />
          <Text style={styles.createText}>동아리 생성하기</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, flex: 1 },
  content: { gap: 20, padding: 16, paddingBottom: 40 },
  field: { gap: 8 },
  label: { color: colors.inkDeep, fontSize: 14, fontWeight: '700' },
  required: { color: '#e74c3c' },
  input: {
    backgroundColor: colors.canvas,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  textarea: {
    backgroundColor: colors.canvas,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 14,
    minHeight: 100,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  charCount: { color: colors.inkMuted, fontSize: 11, textAlign: 'right' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryChip: {
    backgroundColor: colors.canvas,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  categoryChipActive: { backgroundColor: colors.navyDeep, borderColor: colors.navyDeep },
  categoryText: { color: colors.inkMuted, fontSize: 14, fontWeight: '700' },
  categoryTextActive: { color: colors.canvas },
  toggleRow: { flexDirection: 'row', gap: 10 },
  toggleChip: {
    alignItems: 'center',
    backgroundColor: colors.canvas,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 12,
  },
  toggleChipActive: { backgroundColor: '#d1fae5', borderColor: '#10b981' },
  toggleChipActiveRed: { backgroundColor: '#fee2e2', borderColor: '#ef4444' },
  toggleText: { color: colors.inkMuted, fontSize: 14, fontWeight: '700' },
  toggleTextActive: { color: colors.inkDeep },
  createButton: {
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    borderRadius: 14,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 8,
    paddingVertical: 16,
  },
  disabledButton: { backgroundColor: colors.inkMuted },
  createText: { color: '#fff', fontSize: 16, fontWeight: '900' },
});
