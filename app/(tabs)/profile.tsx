import { MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { Badge } from '@/components/Badge';
import { colors } from '@/constants/theme';
import { currentUser } from '@/data/mock';
import { contentLanguageLabels, uiLanguageLabels, useLanguageStore } from '@/store/languageStore';
import { useT } from '@/utils/i18n';

export default function ProfileScreen() {
  const router = useRouter();
  const t = useT();
  const uiLanguage = useLanguageStore((state) => state.uiLanguage);
  const contentLanguage = useLanguageStore((state) => state.contentLanguage);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title={t('profile')} subtitle={t('profileSubtitle')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
