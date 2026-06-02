import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Badge } from '@/components/Badge';
import { colors, shadow } from '@/constants/theme';
import { useLanguageStore } from '@/store/languageStore';
import { Club } from '@/types';

type ClubCardProps = {
  club: Club;
};

export function ClubCard({ club }: ClubCardProps) {
  const router = useRouter();
  const { uiLanguage, contentLanguage, contentTranslationEnabled } = useLanguageStore();

  const displayName = uiLanguage === 'ko' ? club.name : (club.englishName || club.name);

  const displayDescription =
    contentTranslationEnabled && contentLanguage !== 'ko'
      ? club.descriptionTranslations?.[contentLanguage as 'en' | 'ja' | 'zh' | 'vi'] || club.description
      : club.description;

  const badgeLabelByLang: Record<string, Record<string, string>> = {
    ko: { VERIFIED: '검토 완료', PENDING_REVIEW: '검토 중', NONE: '미검토' },
    en: { VERIFIED: 'Verified', PENDING_REVIEW: 'Pending', NONE: 'Unreviewed' },
    ja: { VERIFIED: '審査済み', PENDING_REVIEW: '審査中', NONE: '未審査' },
    zh: { VERIFIED: '已审核', PENDING_REVIEW: '审核中', NONE: '未审核' },
    vi: { VERIFIED: 'Đã xác minh', PENDING_REVIEW: 'Đang xét', NONE: 'Chưa xét' },
    fa: { VERIFIED: 'تأیید شده', PENDING_REVIEW: 'در حال بررسی', NONE: 'بررسی نشده' },
  };

  const recruitingByLang: Record<string, { yes: string; no: string }> = {
    ko: { yes: '모집 중', no: '모집 마감' },
    en: { yes: 'Recruiting', no: 'Closed' },
    ja: { yes: '募集中', no: '募集終了' },
    zh: { yes: '招募中', no: '招募结束' },
    vi: { yes: 'Đang tuyển', no: 'Đã đóng' },
    fa: { yes: 'در حال پذیرش', no: 'پذیرش بسته' },
  };

  const langBadges = badgeLabelByLang[uiLanguage] ?? badgeLabelByLang.ko;
  const langRecruit = recruitingByLang[uiLanguage] ?? recruitingByLang.ko;
  const badgeLabel = langBadges[club.safetyBadgeStatus] ?? langBadges.NONE;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.88}
      onPress={() => router.push({ pathname: '/club/[id]', params: { id: club.id } })}
    >
      <Image source={{ uri: club.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{displayName}</Text>
            <Text style={styles.subtitle}>{club.englishName}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.inkMuted} />
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {displayDescription}
        </Text>
        <View style={styles.badgeRow}>
          <Badge label={club.category} tone="gold" />
          <Badge label={club.isRecruiting ? langRecruit.yes : langRecruit.no} tone={club.isRecruiting ? 'green' : 'muted'} />
          <Badge label={badgeLabel} tone={club.safetyBadgeStatus === 'VERIFIED' ? 'navy' : 'muted'} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    ...shadow,
  },
  image: { backgroundColor: colors.surfaceSoft, height: 184, width: '100%' },
  body: { gap: 10, padding: 14 },
  titleRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  titleBlock: { flex: 1 },
  title: { color: colors.inkDeep, fontSize: 18, fontWeight: '800' },
  subtitle: { color: colors.inkMuted, fontSize: 13, marginTop: 2 },
  description: { color: colors.ink, fontSize: 14, lineHeight: 21 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
});
