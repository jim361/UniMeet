import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { Badge } from '@/components/Badge';
import { Section } from '@/components/Section';
import { StatCard } from '@/components/StatCard';
import { colors } from '@/constants/theme';
import { applicationFields, clubs, leaderApplications } from '@/data/mock';
import { statusLabel } from '@/utils/status';

export default function LeaderDashboardScreen() {
  const club = clubs[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="회장 대시보드" subtitle={club.name} showBack />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <StatCard icon="person-search" label="신규 지원자" value={`${leaderApplications.length}`} />
          <StatCard icon="edit-note" label="질문 수" value={`${applicationFields.length}`} />
          <StatCard icon="verified" label="홍보카드" value="검토 완료" />
        </View>

        <Section title="빠른 작업">
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <MaterialIcons name="image" size={24} color={colors.navyDeep} />
              <Text style={styles.actionTitle}>홍보카드 수정</Text>
              <Text style={styles.actionBody}>이미지, 태그, 소개글을 관리합니다.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <MaterialIcons name="dynamic-form" size={24} color={colors.navyDeep} />
              <Text style={styles.actionTitle}>지원서 양식 설정</Text>
              <Text style={styles.actionBody}>질문 타입, 필수 여부, 순서를 설정합니다.</Text>
            </TouchableOpacity>
          </View>
        </Section>

        <Section title="지원자 관리">
          <View style={styles.list}>
            {leaderApplications.map((application) => (
              <View key={application.id} style={styles.applicantCard}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{application.applicantName.slice(0, 1)}</Text>
                </View>
                <View style={styles.applicantBody}>
                  <View style={styles.applicantTop}>
                    <View>
                      <Text style={styles.applicantName}>{application.applicantName}</Text>
                      <Text style={styles.applicantMeta}>
                        {application.applicantStudentId} · {application.submittedAt}
                      </Text>
                    </View>
                    <Badge label={statusLabel(application.status)} tone="gold" />
                  </View>
                  <View style={styles.decisionRow}>
                    <TouchableOpacity style={styles.acceptButton}>
                      <Text style={styles.acceptText}>합격</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rejectButton}>
                      <Text style={styles.rejectText}>불합격</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Section>

        <Link href="/(tabs)/profile" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backText}>마이페이지로 돌아가기</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, flex: 1 },
  content: { gap: 24, paddingBottom: 28 },
  statsRow: { flexDirection: 'row', gap: 10, padding: 16, paddingBottom: 0 },
  actionGrid: { flexDirection: 'row', gap: 10 },
  actionCard: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    gap: 8,
    padding: 14,
  },
  actionTitle: { color: colors.inkDeep, fontSize: 15, fontWeight: '900' },
  actionBody: { color: colors.inkMuted, fontSize: 13, lineHeight: 18 },
  list: { gap: 12 },
  applicantCard: {
    alignItems: 'flex-start',
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.goldPale,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  avatarText: { color: colors.navyDeep, fontSize: 17, fontWeight: '900' },
  applicantBody: { flex: 1, gap: 12 },
  applicantTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applicantName: { color: colors.inkDeep, fontSize: 16, fontWeight: '900' },
  applicantMeta: { color: colors.inkMuted, fontSize: 12, marginTop: 3 },
  decisionRow: { flexDirection: 'row', gap: 8 },
  acceptButton: {
    backgroundColor: 'rgba(56,161,105,0.14)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  acceptText: { color: colors.success, fontSize: 13, fontWeight: '900' },
  rejectButton: {
    backgroundColor: 'rgba(229,62,62,0.10)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  rejectText: { color: colors.critical, fontSize: 13, fontWeight: '900' },
  backButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 14,
    marginHorizontal: 16,
    padding: 15,
  },
  backText: { color: colors.navyDeep, fontSize: 15, fontWeight: '900' },
});
