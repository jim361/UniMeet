import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { Badge } from '@/components/Badge';
import { colors } from '@/constants/theme';
import { applicationFields, clubs, currentUser } from '@/data/mock';
import { useApplicationStore } from '@/store/applicationStore';

export default function ApplyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const club = clubs.find((item) => item.id === id);
  const { hasApplied, submitApplication } = useApplicationStore();
  const alreadyApplied = id ? hasApplied(id) : false;

  if (alreadyApplied) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <AppHeader title="지원서 작성" subtitle={club?.name} showBell={false} showBack />
        <View style={styles.alreadyWrap}>
          <MaterialIcons name="assignment-turned-in" size={52} color={colors.navyDeep} />
          <Text style={styles.alreadyTitle}>이미 가입 신청서를 제출하셨습니다.</Text>
          <Text style={styles.alreadyBody}>심사 결과를 기다려 주세요.</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>돌아가기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleSubmit = () => {
    if (!id) return;
    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    submitApplication({
      id: `app-${Date.now()}`,
      clubId: id,
      applicantName: currentUser.name,
      applicantStudentId: currentUser.studentId,
      status: 'PENDING',
      submittedAt: dateStr,
      formSnapshot: applicationFields,
    });
    router.replace('/(tabs)/applications');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="지원서 작성" subtitle={club?.name} showBell={false} showBack />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.kicker}>Application Form</Text>
          <Text style={styles.title}>{club?.name ?? '동아리'} 지원서</Text>
          <Text style={styles.body}>
            이름과 학번은 필수 항목이며, 제출 시점의 양식이 스냅샷으로 저장됩니다.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>기본 정보</Text>
          <View style={styles.lockedField}>
            <Text style={styles.label}>이름</Text>
            <Text style={styles.lockedValue}>{currentUser.name}</Text>
          </View>
          <View style={styles.lockedField}>
            <Text style={styles.label}>학번</Text>
            <Text style={styles.lockedValue}>{currentUser.studentId}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>회장 설정 질문</Text>
          {applicationFields.map((field) => (
            <View key={field.id} style={styles.question}>
              <View style={styles.questionHeader}>
                <Text style={styles.label}>{field.label}</Text>
                {field.required ? <Badge label="필수" tone="red" /> : <Badge label="선택" tone="muted" />}
              </View>
              {field.options ? (
                <View style={styles.optionGrid}>
                  {field.options.map((option) => (
                    <TouchableOpacity key={option} style={styles.option}>
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <TextInput
                  placeholder="답변을 입력하세요"
                  placeholderTextColor={colors.inkMuted}
                  multiline={field.type === 'LONG_TEXT'}
                  style={[styles.input, field.type === 'LONG_TEXT' && styles.textarea]}
                />
              )}
            </View>
          ))}
        </View>

        <View style={styles.infoBox}>
          <MaterialIcons name="info-outline" size={20} color={colors.navyDeep} />
          <Text style={styles.infoText}>
            MVP에서는 파일 첨부 질문 타입을 구조에 포함하되 실제 업로드는 Phase 2에서 고도화합니다.
          </Text>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>지원서 제출하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, flex: 1 },
  content: { gap: 16, padding: 16, paddingBottom: 28 },
  alreadyWrap: {
    alignItems: 'center',
    flex: 1,
    gap: 12,
    justifyContent: 'center',
    padding: 32,
  },
  alreadyTitle: {
    color: colors.inkDeep,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  alreadyBody: {
    color: colors.inkMuted,
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'center',
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  backText: { color: colors.canvas, fontSize: 15, fontWeight: '900' },
  header: { gap: 8 },
  kicker: { color: colors.gold, fontSize: 13, fontWeight: '900' },
  title: { color: colors.inkDeep, fontSize: 27, fontWeight: '900' },
  body: { color: colors.inkMuted, fontSize: 15, lineHeight: 22 },
  card: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    gap: 14,
    padding: 16,
  },
  cardTitle: { color: colors.inkDeep, fontSize: 18, fontWeight: '900' },
  lockedField: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 12,
    gap: 4,
    padding: 12,
  },
  label: { color: colors.inkDeep, flex: 1, fontSize: 14, fontWeight: '800' },
  lockedValue: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  question: { gap: 10 },
  questionHeader: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  input: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 15,
    minHeight: 48,
    padding: 12,
  },
  textarea: { minHeight: 100, textAlignVertical: 'top' },
  optionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  optionText: { color: colors.inkDeep, fontSize: 13, fontWeight: '800' },
  infoBox: {
    alignItems: 'flex-start',
    backgroundColor: colors.goldPale,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 10,
    padding: 12,
  },
  infoText: { color: colors.inkDeep, flex: 1, fontSize: 13, lineHeight: 19 },
  submitButton: {
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    borderRadius: 14,
    padding: 16,
  },
  submitText: { color: colors.canvas, fontSize: 16, fontWeight: '900' },
});
