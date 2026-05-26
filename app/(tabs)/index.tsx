import { MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { Badge } from '@/components/Badge';
import { ClubCard } from '@/components/ClubCard';
import { Section } from '@/components/Section';
import { StatCard } from '@/components/StatCard';
import { colors } from '@/constants/theme';
import { clubs, currentUser, myApplications } from '@/data/mock';
import { useNotificationStore } from '@/store/notificationStore';
import { statusLabel } from '@/utils/status';

export default function HomeScreen() {
  const router = useRouter();
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const activeApplications = myApplications.slice(0, 2);
  const myClubs = clubs.slice(0, 2);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="UniMeet" subtitle="선문대 동아리 통합 플랫폼" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.greeting}>안녕하세요, {currentUser.name}님</Text>
          <Text style={styles.heroText}>오늘도 동아리를 탐색하고 새로운 캠퍼스 연결을 만들어보세요.</Text>
          <View style={styles.heroActions}>
            <Link href="/(tabs)/explore" asChild>
              <TouchableOpacity style={styles.primaryButton}>
                <MaterialIcons name="search" size={18} color={colors.canvas} />
                <Text style={styles.primaryButtonText}>동아리 탐색</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/leader" asChild>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>회장 대시보드</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.statsRow}>
          <StatCard
            icon="groups"
            label="내 동아리"
            value={`${myClubs.length}`}
            onPress={() => router.push('/my-clubs')}
          />
          <StatCard
            icon="assignment"
            label="지원서"
            value={`${myApplications.length}`}
            onPress={() => router.push('/(tabs)/applications')}
          />
          <StatCard
            icon="notifications"
            label="안 읽음"
            value={`${unreadCount}`}
            onPress={() => router.push('/(tabs)/notifications')}
          />
        </View>

        <Section title="지원 상태">
          <View style={styles.statusList}>
            {activeApplications.map((application) => {
              const club = clubs.find((item) => item.id === application.clubId);
              return (
                <TouchableOpacity
                  key={application.id}
                  style={styles.statusCard}
                  activeOpacity={0.85}
                  onPress={() => router.push('/(tabs)/applications')}
                >
                  <View>
                    <Text style={styles.statusClub}>{club?.name}</Text>
                    <Text style={styles.statusDate}>{application.submittedAt} 제출</Text>
                  </View>
                  <Badge label={statusLabel(application.status)} tone="gold" />
                </TouchableOpacity>
              );
            })}
          </View>
        </Section>

        <Section
          title="추천 동아리"
          action={
            <Link href="/(tabs)/explore" asChild>
              <TouchableOpacity>
                <Text style={styles.sectionAction}>모두 보기</Text>
              </TouchableOpacity>
            </Link>
          }
        >
          <ClubCard club={clubs[0]} />
        </Section>

        <Section title="공지 피드">
          <View style={styles.noticeCard}>
            <Badge label="글로벌 시민" tone="muted" />
            <Text style={styles.noticeTitle}>2026년 1학기 글로벌 멘토링 모집 안내</Text>
            <Text style={styles.noticeBody}>
              한국어와 영어 소개문은 자동 번역으로 제공되며, 상세 페이지에서 원문을 확인할 수 있습니다.
            </Text>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, flex: 1 },
  content: { gap: 24, paddingBottom: 28 },
  hero: {
    backgroundColor: colors.navyDeep,
    gap: 12,
    margin: 16,
    padding: 20,
    borderRadius: 18,
  },
  greeting: { color: colors.canvas, fontSize: 25, fontWeight: '900' },
  heroText: { color: colors.goldPale, fontSize: 15, lineHeight: 22 },
  heroActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.gold,
    borderRadius: 999,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  primaryButtonText: { color: colors.canvas, fontSize: 14, fontWeight: '900' },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  secondaryButtonText: { color: colors.canvas, fontSize: 14, fontWeight: '800' },
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16 },
  statusList: { gap: 10 },
  statusCard: {
    alignItems: 'center',
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  statusClub: { color: colors.inkDeep, fontSize: 16, fontWeight: '800' },
  statusDate: { color: colors.inkMuted, fontSize: 13, marginTop: 3 },
  sectionAction: { color: colors.gold, fontSize: 14, fontWeight: '900' },
  noticeCard: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    gap: 9,
    padding: 16,
  },
  noticeTitle: { color: colors.inkDeep, fontSize: 16, fontWeight: '900' },
  noticeBody: { color: colors.ink, fontSize: 14, lineHeight: 21 },
});
