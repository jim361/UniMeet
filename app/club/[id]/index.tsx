import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '@/components/Badge';
import { EmptyState } from '@/components/EmptyState';
import { colors } from '@/constants/theme';
import { clubs } from '@/data/mock';
import { useLanguageStore } from '@/store/languageStore';
import { useT } from '@/utils/i18n';
import { getTranslationLabel, translatedList, translatedText } from '@/utils/translations';

export default function ClubDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const t = useT();
  const contentLanguage = useLanguageStore((state) => state.contentLanguage);
  const contentTranslationEnabled = useLanguageStore(
    (state) => state.contentTranslationEnabled,
  );
  const club = clubs.find((item) => item.id === id);

  if (!club) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.missing}>
          <EmptyState icon="error-outline" title="동아리를 찾을 수 없어요" body="탐색 화면에서 다시 선택해주세요." />
        </View>
      </SafeAreaView>
    );
  }

  const badgeLabel =
    club.safetyBadgeStatus === 'VERIFIED'
      ? '운영자 검토 완료'
      : club.safetyBadgeStatus === 'PENDING_REVIEW'
        ? '운영자 검토 중'
        : '미검토';
  const languageLabel = getTranslationLabel(contentLanguage);
  const descriptionTranslation = translatedText(club.descriptionTranslations, contentLanguage);
  const taglineTranslation = translatedText(club.taglineTranslations, contentLanguage);
  const meetingTranslation = translatedText(club.meetingInfoTranslations, contentLanguage);
  const recruitTranslation = translatedText(club.recruitInfoTranslations, contentLanguage);
  const activitiesTranslation = translatedList(club.recentActivityTranslations, contentLanguage);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: club.imageUrl }} style={styles.heroImage} />
          <View style={styles.imageOverlay}>
            <Badge label={club.category} tone="gold" />
            <Text style={styles.heroTitle}>{club.name}</Text>
            <Text style={styles.heroSubtitle}>{club.englishName}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryTop}>
              <View style={styles.summaryItem}>
                <MaterialIcons name="groups" size={22} color={colors.navyDeep} />
                <Text style={styles.summaryValue}>{club.members}</Text>
                <Text style={styles.summaryLabel}>{t('members')}</Text>
              </View>
              <View style={styles.summaryItem}>
                <MaterialIcons name="event" size={22} color={colors.navyDeep} />
                <Text style={styles.summaryValue}>{club.isRecruiting ? t('recruiting') : t('closed')}</Text>
                <Text style={styles.summaryLabel}>{t('status')}</Text>
              </View>
              <View style={styles.summaryItem}>
                <MaterialIcons name="translate" size={22} color={colors.navyDeep} />
                <Text style={styles.summaryValue}>{club.language === 'both' ? '한/영' : club.language}</Text>
                <Text style={styles.summaryLabel}>{t('language')}</Text>
              </View>
            </View>
            <View style={styles.badges}>
              {club.tags.map((tag) => (
                <Badge key={tag} label={tag} tone={tag.includes('모집') ? 'green' : 'muted'} />
              ))}
              <Badge label={badgeLabel} tone={club.safetyBadgeStatus === 'VERIFIED' ? 'navy' : 'muted'} />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t('clubIntro')}</Text>
            <TranslatedContent
              originalLabel={t('originalKorean')}
              translationLabel={`${t('translated')} · ${languageLabel}`}
              originalTitle={club.tagline}
              originalBody={club.description}
              translatedTitle={taglineTranslation}
              translatedBody={descriptionTranslation}
              translationEnabled={contentTranslationEnabled}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t('recruitmentInfo')}</Text>
            <InfoRow
              icon="schedule"
              label={t('regularMeeting')}
              value={club.meetingInfo}
              translatedValue={meetingTranslation}
              translationLabel={`${t('translated')} · ${languageLabel}`}
              translationEnabled={contentTranslationEnabled}
            />
            <InfoRow
              icon="person-add"
              label={t('recruitingTarget')}
              value={club.recruitInfo}
              translatedValue={recruitTranslation}
              translationLabel={`${t('translated')} · ${languageLabel}`}
              translationEnabled={contentTranslationEnabled}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t('recentActivities')}</Text>
            {club.recentActivities.map((activity, index) => (
              <View key={activity} style={styles.activityRow}>
                <View style={styles.activityDot} />
                <View style={styles.activityTextWrap}>
                  <Text style={styles.activityText}>{activity}</Text>
                  {contentTranslationEnabled && activitiesTranslation[index] ? (
                    <Text style={styles.activityTranslation}>{activitiesTranslation[index]}</Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={club.isRecruiting ? styles.applyButton : styles.applyButtonDisabled}
            disabled={!club.isRecruiting}
            onPress={() => router.push({ pathname: '/club/[id]/apply', params: { id: club.id } })}
          >
            <Text style={styles.applyButtonText}>
              {club.isRecruiting ? t('apply') : t('closed')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({
  icon,
  label,
  value,
  translatedValue,
  translationLabel,
  translationEnabled,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
  translatedValue: string;
  translationLabel: string;
  translationEnabled: boolean;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <MaterialIcons name={icon} size={20} color={colors.navyDeep} />
      </View>
      <View style={styles.infoTextWrap}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
        {translationEnabled && translatedValue ? (
          <View style={styles.infoTranslation}>
            <Text style={styles.translationLabel}>{translationLabel}</Text>
            <Text style={styles.translationText}>{translatedValue}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function TranslatedContent({
  originalLabel,
  translationLabel,
  originalTitle,
  originalBody,
  translatedTitle,
  translatedBody,
  translationEnabled,
}: {
  originalLabel: string;
  translationLabel: string;
  originalTitle: string;
  originalBody: string;
  translatedTitle: string;
  translatedBody: string;
  translationEnabled: boolean;
}) {
  return (
    <View style={styles.translatedContent}>
      <View style={styles.originalBlock}>
        <Text style={styles.originalLabel}>{originalLabel}</Text>
        <Text style={styles.tagline}>{originalTitle}</Text>
        <Text style={styles.cardText}>{originalBody}</Text>
      </View>
      {translationEnabled ? (
        <View style={styles.translationBox}>
          <Text style={styles.translationLabel}>{translationLabel}</Text>
          {translatedTitle ? <Text style={styles.translationTitle}>{translatedTitle}</Text> : null}
          {translatedBody ? (
            <Text style={styles.translationText}>{translatedBody}</Text>
          ) : (
            <Text style={styles.translationText}>선택한 언어의 번역을 준비 중입니다.</Text>
          )}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, flex: 1 },
  content: { paddingBottom: 28 },
  missing: { flex: 1, padding: 16 },
  imageWrap: { height: 300, position: 'relative' },
  heroImage: { height: '100%', width: '100%' },
  imageOverlay: {
    backgroundColor: 'rgba(26,46,90,0.48)',
    bottom: 0,
    gap: 6,
    left: 0,
    padding: 18,
    position: 'absolute',
    right: 0,
  },
  heroTitle: { color: colors.canvas, fontSize: 30, fontWeight: '900' },
  heroSubtitle: { color: colors.goldPale, fontSize: 15, fontWeight: '700' },
  body: { gap: 16, padding: 16 },
  summaryCard: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    gap: 14,
    padding: 16,
  },
  summaryTop: { flexDirection: 'row', gap: 10 },
  summaryItem: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 12,
    flex: 1,
    gap: 4,
    padding: 12,
  },
  summaryValue: { color: colors.inkDeep, fontSize: 15, fontWeight: '900' },
  summaryLabel: { color: colors.inkMuted, fontSize: 11, fontWeight: '700' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  card: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  cardTitle: { color: colors.inkDeep, fontSize: 19, fontWeight: '900' },
  translatedContent: { gap: 12 },
  originalBlock: { gap: 7 },
  originalLabel: { color: colors.inkMuted, fontSize: 12, fontWeight: '900' },
  tagline: { color: colors.gold, fontSize: 14, fontWeight: '900' },
  cardText: { color: colors.ink, fontSize: 15, lineHeight: 23 },
  translationBox: {
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.goldPale,
    borderRadius: 12,
    borderWidth: 1,
    gap: 5,
    padding: 12,
  },
  translationLabel: { color: colors.gold, fontSize: 12, fontWeight: '900' },
  translationTitle: { color: colors.inkDeep, fontSize: 14, fontWeight: '900', lineHeight: 20 },
  translationText: { color: colors.ink, fontSize: 14, lineHeight: 21 },
  infoRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 12 },
  infoIcon: {
    alignItems: 'center',
    backgroundColor: colors.goldPale,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  infoTextWrap: { flex: 1, gap: 3 },
  infoLabel: { color: colors.inkMuted, fontSize: 12, fontWeight: '800' },
  infoValue: { color: colors.ink, fontSize: 14, lineHeight: 21 },
  infoTranslation: {
    backgroundColor: colors.surfaceWarm,
    borderRadius: 10,
    gap: 4,
    marginTop: 8,
    padding: 10,
  },
  activityRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 10 },
  activityDot: {
    backgroundColor: colors.gold,
    borderRadius: 5,
    height: 10,
    marginTop: 5,
    width: 10,
  },
  activityTextWrap: { flex: 1, gap: 3 },
  activityText: { color: colors.ink, fontSize: 14, lineHeight: 21 },
  activityTranslation: { color: colors.inkMuted, fontSize: 13, lineHeight: 19 },
  applyButton: {
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    borderRadius: 14,
    padding: 16,
  },
  applyButtonDisabled: {
    alignItems: 'center',
    backgroundColor: colors.inkMuted,
    borderRadius: 14,
    padding: 16,
  },
  applyButtonText: { color: colors.canvas, fontSize: 16, fontWeight: '900' },
});
