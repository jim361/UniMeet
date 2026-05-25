import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { Badge } from '@/components/Badge';
import { EmptyState } from '@/components/EmptyState';
import { colors } from '@/constants/theme';
import { clubs, myApplications } from '@/data/mock';
import { statusLabel } from '@/utils/status';

export default function ApplicationsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="지원내역" subtitle="제출한 지원서 상태를 확인하세요" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {myApplications.length > 0 ? (
          myApplications.map((application) => {
            const club = clubs.find((item) => item.id === application.clubId);
            return (
              <View key={application.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.titleBlock}>
                    <Text style={styles.clubName}>{club?.name}</Text>
                    <Text style={styles.meta}>{application.submittedAt} 제출</Text>
                  </View>
                  <Badge label={statusLabel(application.status)} tone="gold" />
                </View>
                <Text style={styles.body}>
                  제출 당시 양식 버전이 저장되어, 회장이 질문을 수정해도 내 답변은 그대로 보존됩니다.
                </Text>
                <Link href={`/club/${application.clubId}`} asChild>
                  <TouchableOpacity style={styles.linkButton}>
                    <Text style={styles.linkText}>동아리 상세 보기</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            );
          })
        ) : (
          <EmptyState
            icon="assignment"
            title="아직 지원한 동아리가 없어요"
            body="탐색 탭에서 관심 있는 동아리를 찾아 지원해보세요."
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, flex: 1 },
  content: { gap: 14, padding: 16, paddingBottom: 28 },
  card: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBlock: { flex: 1 },
  clubName: { color: colors.inkDeep, fontSize: 18, fontWeight: '900' },
  meta: { color: colors.inkMuted, fontSize: 13, marginTop: 3 },
  body: { color: colors.ink, fontSize: 14, lineHeight: 21 },
  linkButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  linkText: { color: colors.navyDeep, fontSize: 14, fontWeight: '900' },
});
