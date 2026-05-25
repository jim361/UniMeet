import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { Badge } from '@/components/Badge';
import { Section } from '@/components/Section';
import { StatCard } from '@/components/StatCard';
import { colors } from '@/constants/theme';
import { clubs } from '@/data/mock';

const auditItems = [
  '글로벌 시민 회장 권한 부여',
  '토론 학회 홍보카드 검토 상태 변경',
  '운영자 승인 요청 접수',
];

export default function AdminDashboardScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="관리자 대시보드" subtitle="운영자/학교 관리자용 모바일 관리" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <StatCard icon="school" label="동아리" value={`${clubs.length}`} />
          <StatCard icon="person-add" label="승인 대기" value="2" />
          <StatCard icon="history" label="감사 로그" value="3" />
        </View>

        <Section title="운영 작업">
          <View style={styles.actionList}>
            <TouchableOpacity style={styles.actionRow}>
              <View style={styles.iconBox}>
                <MaterialIcons name="add-business" size={22} color={colors.navyDeep} />
              </View>
              <View style={styles.actionText}>
                <Text style={styles.actionTitle}>동아리 생성</Text>
                <Text style={styles.actionBody}>운영자가 공식 동아리를 생성합니다.</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.inkMuted} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionRow}>
              <View style={styles.iconBox}>
                <MaterialIcons name="workspace-premium" size={22} color={colors.navyDeep} />
              </View>
              <View style={styles.actionText}>
                <Text style={styles.actionTitle}>회장 권한 부여</Text>
                <Text style={styles.actionBody}>학생 검색 후 특정 동아리 회장으로 지정합니다.</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.inkMuted} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionRow}>
              <View style={styles.iconBox}>
                <MaterialIcons name="verified-user" size={22} color={colors.navyDeep} />
              </View>
              <View style={styles.actionText}>
                <Text style={styles.actionTitle}>운영자 승인</Text>
                <Text style={styles.actionBody}>승인 전 계정은 제한 상태로 유지됩니다.</Text>
              </View>
              <Badge label="2건" tone="gold" />
            </TouchableOpacity>
          </View>
        </Section>

        <Section title="감사 로그">
          <View style={styles.auditList}>
            {auditItems.map((item, index) => (
              <View key={item} style={styles.auditRow}>
                <Text style={styles.auditIndex}>{index + 1}</Text>
                <View style={styles.auditBody}>
                  <Text style={styles.auditTitle}>{item}</Text>
                  <Text style={styles.auditMeta}>actor, before/after, timestamp 저장 예정</Text>
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
  actionList: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  actionRow: {
    alignItems: 'center',
    borderBottomColor: colors.borderSoft,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
  },
  iconBox: {
    alignItems: 'center',
    backgroundColor: colors.goldPale,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  actionText: { flex: 1 },
  actionTitle: { color: colors.inkDeep, fontSize: 15, fontWeight: '900' },
  actionBody: { color: colors.inkMuted, fontSize: 13, lineHeight: 18, marginTop: 2 },
  auditList: { gap: 10 },
  auditRow: {
    alignItems: 'flex-start',
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
  },
  auditIndex: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '900',
    width: 20,
  },
  auditBody: { flex: 1 },
  auditTitle: { color: colors.inkDeep, fontSize: 15, fontWeight: '900' },
  auditMeta: { color: colors.inkMuted, fontSize: 12, marginTop: 3 },
  backButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 14,
    marginHorizontal: 16,
    padding: 15,
  },
  backText: { color: colors.navyDeep, fontSize: 15, fontWeight: '900' },
});
