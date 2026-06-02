import { MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { Badge } from '@/components/Badge';
import { colors } from '@/constants/theme';
import { currentUser } from '@/data/mock';
import { contentLanguageLabels, uiLanguageLabels, useLanguageStore } from '@/store/languageStore';
import { useClubApplicationStore } from '@/store/clubApplicationStore';
import { useT } from '@/utils/i18n';

const STATUS_COLOR: Record<string, string> = {
  pending: '#f59e0b',
  approved: '#10b981',
  rejected: '#ef4444',
};

const STATUS_LABEL: Record<string, string> = {
  pending: '심사 중',
  approved: '승인됨',
  rejected: '거절됨',
};

export default function ProfileScreen() {
  const router = useRouter();
  const t = useT();
  const uiLanguage = useLanguageStore((state) => state.uiLanguage);
  const contentLanguage = useLanguageStore((state) => state.contentLanguage);
  const { getMyApplications } = useClubApplicationStore();
  const myApplications = getMyApplications(currentUser.id);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title={t('profile')} subtitle={t('profileSubtitle')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* 프로필 카드 */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{currentUser.name.slice(1, 3)}</Text>
          </View>
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.meta}>{currentUser.department} · {currentUser.studentId}</Text>
          <View style={styles.badges}>
            <Badge label={t('verifiedEmail')} tone="green" />
            <Badge label={uiLanguageLabels[uiLanguage]} tone="gold" />
          </View>
        </View>

        {/* 내 신청 현황 */}
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>내 동아리 신청 현황</Text>
          {myApplications.length === 0 ? (
            <View style={styles.emptyRow}>
              <Text style={styles.emptyText}>신청한 동아리가 없습니다.</Text>
            </View>
          ) : (
            myApplications.map((app) => (
              <View key={app.id} style={styles.appRow}>
                <View style={styles.appLeft}>
                  <MaterialIcons name="groups" size={20} color={colors.navyDeep} />
                  <View>
                    <Text style={styles.appClubName}>{app.clubName}</Text>
                    <Text style={styles.appDate}>
                      신청일: {new Date(app.appliedAt).toLocaleDateString('ko-KR')}
                    </Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: STATUS_COLOR[app.status] + '20' }]}>
                  <Text style={[styles.statusText, { color: STATUS_COLOR[app.status] }]}>
                    {STATUS_LABEL[app.status]}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* 권한별 대시보드 */}
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>{t('dashboardByRole')}</Text>
          <Link href="/leader" asChild>
            <TouchableOpacity style={styles.row}>
              <View style={styles.rowLeft}>
                <MaterialIcons name="workspace-premium" size={22} color={colors.navyDeep} />
                <Text style={styles.rowText}>{t('leaderDashboard')}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.inkMuted} />
            </TouchableOpacity>
          </Link>
          <Link href="/admin" asChild>
            <TouchableOpacity style={styles.row}>
              <View style={styles.rowLeft}>
                <MaterialIcons name="admin-panel-settings" size={22} color={colors.navyDeep} />
                <Text style={styles.rowText}>{t('adminDashboard')}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.inkMuted} />
            </TouchableOpacity>
          </Link>
        </View>

        {/* 계정 설정 */}
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>{t('accountSettings')}</Text>
          <TouchableOpacity style={styles.row} onPress={() => router.push('/settings/language')}>
            <View style={styles.rowLeft}>
              <MaterialIcons name="translate" size={22} color={colors.navyDeep} />
              <Text style={styles.rowText}>{t('languageSettings')}</Text>
            </View>
            <Text style={styles.rowValue}>
              {uiLanguageLabels[uiLanguage]} · {contentLanguageLabels[contentLanguage]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
              <MaterialIcons name="privacy-tip" size={22} color={colors.navyDeep} />
              <Text style={styles.rowText}>{t('privacyPolicy')}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.inkMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logout}>
            <Text style={styles.logoutText}>{t('logout')}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, flex: 1 },
  content: { gap: 16, padding: 16, paddingBottom: 28 },
  profileCard: {
    alignItems: 'center',
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 18,
    borderWidth: 1,
    gap: 8,
    padding: 22,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    borderRadius: 36,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  avatarText: { color: colors.canvas, fontSize: 22, fontWeight: '900' },
  name: { color: colors.inkDeep, fontSize: 24, fontWeight: '900' },
  meta: { color: colors.inkMuted, fontSize: 14 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center' },
  panel: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  panelTitle: {
    color: colors.inkDeep,
    fontSize: 17,
    fontWeight: '900',
    padding: 16,
    paddingBottom: 8,
  },
  emptyRow: {
    alignItems: 'center',
    borderTopColor: colors.borderSoft,
    borderTopWidth: 1,
    padding: 20,
  },
  emptyText: { color: colors.inkMuted, fontSize: 14 },
  appRow: {
    alignItems: 'center',
    borderTopColor: colors.borderSoft,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  appLeft: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  appClubName: { color: colors.inkDeep, fontSize: 15, fontWeight: '800' },
  appDate: { color: colors.inkMuted, fontSize: 12, marginTop: 2 },
  statusBadge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 12, fontWeight: '700' },
  row: {
    alignItems: 'center',
    borderTopColor: colors.borderSoft,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  rowLeft: { alignItems: 'center', flexDirection: 'row', gap: 12 },
  rowText: { color: colors.inkDeep, fontSize: 15, fontWeight: '800' },
  rowValue: { color: colors.inkMuted, fontSize: 13, fontWeight: '800' },
  logout: {
    alignItems: 'center',
    borderTopColor: colors.borderSoft,
    borderTopWidth: 1,
    padding: 16,
  },
  logoutText: { color: colors.critical, fontSize: 15, fontWeight: '900' },
});
