import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '@/components/Badge';
import { EmptyState } from '@/components/EmptyState';
import { colors } from '@/constants/theme';
import { clubs } from '@/data/mock';
import { useLanguageStore } from '@/store/languageStore';
import { getTranslationLabel, translatedList, translatedText } from '@/utils/translations';

const uiTextMap: Record<string, Record<string, string>> = {
  ko: {
    clubIntro: '동아리 소개', recruitmentInfo: '모집 요강', recentActivities: '최근 활동',
    regularMeeting: '정기 모임', recruitingTarget: '모집 대상', apply: '지원하기',
    closed: '모집 마감', members: '멤버', status: '상태', language: '언어',
    recruiting: '모집 중', originalKorean: '원문 · Korean', translated: '번역',
    verified: '운영자 검토 완료', pendingReview: '운영자 검토 중', none: '미검토',
    noTranslation: '선택한 언어의 번역을 준비 중입니다.',
    notFound: '동아리를 찾을 수 없어요', notFoundBody: '탐색 화면에서 다시 선택해주세요.',
  },
  en: {
    clubIntro: 'Club Introduction', recruitmentInfo: 'Recruitment Info', recentActivities: 'Recent Activities',
    regularMeeting: 'Regular Meeting', recruitingTarget: 'Recruitment Target', apply: 'Apply',
    closed: 'Closed', members: 'Members', status: 'Status', language: 'Language',
    recruiting: 'Recruiting', originalKorean: 'Original · Korean', translated: 'Translation',
    verified: 'Verified', pendingReview: 'Pending Review', none: 'Unreviewed',
    noTranslation: 'Translation coming soon.',
    notFound: 'Club not found', notFoundBody: 'Please select again from the explore screen.',
  },
  ja: {
    clubIntro: 'サークル紹介', recruitmentInfo: '募集要項', recentActivities: '最近の活動',
    regularMeeting: '定期ミーティング', recruitingTarget: '募集対象', apply: '申請する',
    closed: '募集終了', members: 'メンバー', status: '状態', language: '言語',
    recruiting: '募集中', originalKorean: '原文 · Korean', translated: '翻訳',
    verified: '審査済み', pendingReview: '審査中', none: '未審査',
    noTranslation: '翻訳を準備中です。',
    notFound: 'サークルが見つかりません', notFoundBody: '探す画面から再度選択してください。',
  },
  zh: {
    clubIntro: '社团介绍', recruitmentInfo: '招募信息', recentActivities: '近期活动',
    regularMeeting: '定期活动', recruitingTarget: '招募对象', apply: '申请',
    closed: '招募结束', members: '成员', status: '状态', language: '语言',
    recruiting: '招募中', originalKorean: '原文 · Korean', translated: '翻译',
    verified: '已审核', pendingReview: '审核中', none: '未审核',
    noTranslation: '翻译准备中。',
    notFound: '找不到社团', notFoundBody: '请从探索页面重新选择。',
  },
  vi: {
    clubIntro: 'Giới thiệu CLB', recruitmentInfo: 'Thông tin tuyển', recentActivities: 'Hoạt động gần đây',
    regularMeeting: 'Lịch họp định kỳ', recruitingTarget: 'Đối tượng tuyển', apply: 'Đăng ký',
    closed: 'Đã đóng', members: 'Thành viên', status: 'Trạng thái', language: 'Ngôn ngữ',
    recruiting: 'Đang tuyển', originalKorean: 'Bản gốc · Korean', translated: 'Bản dịch',
    verified: 'Đã xác minh', pendingReview: 'Đang xét', none: 'Chưa xét',
    noTranslation: 'Bản dịch đang được chuẩn bị.',
    notFound: 'Không tìm thấy CLB', notFoundBody: 'Vui lòng chọn lại từ màn hình khám phá.',
  },
  fa: {
    clubIntro: 'معرفی باشگاه', recruitmentInfo: 'اطلاعات پذیرش', recentActivities: 'فعالیت‌های اخیر',
    regularMeeting: 'جلسه منظم', recruitingTarget: 'هدف پذیرش', apply: 'ثبت‌نام',
    closed: 'پذیرش بسته', members: 'اعضا', status: 'وضعیت', language: 'زبان',
    recruiting: 'در حال پذیرش', originalKorean: 'متن اصلی · Korean', translated: 'ترجمه',
    verified: 'تأیید شده', pendingReview: 'در حال بررسی', none: 'بررسی نشده',
    noTranslation: 'ترجمه در دست تهیه است.',
    notFound: 'باشگاه یافت نشد', notFoundBody: 'لطفاً از صفحه کاوش دوباره انتخاب کنید.',
  },
};

const tagMap: Record<string, Record<string, string>> = {
  ko: { '봉사': '봉사', '실제 동아리': '실제 동아리', '모집 중': '모집 중', '모집 마감': '모집 마감', '국제교류': '국제교류', '종교': '종교', '학술': '학술', '문화예술': '문화예술', '취미': '취미', '아동 봉사': '아동 봉사', '풍선아트': '풍선아트', '플로깅': '플로깅', '멘토링': '멘토링', '헌혈': '헌혈', '나눔': '나눔' },
  en: { '봉사': 'Volunteer', '실제 동아리': 'Real Club', '모집 중': 'Recruiting', '모집 마감': 'Closed', '국제교류': 'International', '종교': 'Religion', '학술': 'Academic', '문화예술': 'Culture & Arts', '취미': 'Hobby', '아동 봉사': 'Child Volunteer', '풍선아트': 'Balloon Art', '플로깅': 'Plogging', '멘토링': 'Mentoring', '헌혈': 'Blood Donation', '나눔': 'Sharing' },
  ja: { '봉사': 'ボランティア', '실제 동아리': '公認サークル', '모집 중': '募集中', '모집 마감': '募集終了', '국제교류': '国際交流', '종교': '宗教', '학술': '学術', '문화예술': '文化芸術', '취미': '趣味', '아동 봉사': '児童ボランティア', '풍선아트': 'バルーンアート', '플로깅': 'プロギング', '멘토링': 'メンタリング', '헌혈': '献血', '나눔': 'シェアリング' },
  zh: { '봉사': '志愿', '실제 동아리': '真实社团', '모집 중': '招募中', '모집 마감': '招募结束', '국제교류': '国际交流', '종교': '宗教', '학술': '学术', '문화예술': '文化艺术', '취미': '兴趣', '아동 봉사': '儿童志愿', '풍선아트': '气球艺术', '플로깅': '捡垃圾跑步', '멘토링': '辅导', '헌혈': '献血', '나눔': '分享' },
  vi: { '봉사': 'Tình nguyện', '실제 동아리': 'CLB thực', '모집 중': 'Đang tuyển', '모집 마감': 'Đã đóng', '국제교류': 'Quốc tế', '종교': 'Tôn giáo', '학술': 'Học thuật', '문화예술': 'Văn hóa', '취미': 'Sở thích', '아동 봉사': 'Tình nguyện trẻ em', '풍선아트': 'Nghệ thuật bóng', '플로깅': 'Plogging', '멘토링': 'Cố vấn', '헌혈': 'Hiến máu', '나눔': 'Chia sẻ' },
  fa: { '봉사': 'داوطلبانه', '실제 동아리': 'باشگاه واقعی', '모집 중': 'در حال پذیرش', '모집 마감': 'پذیرش بسته', '국제교류': 'بین‌المللی', '종교': 'مذهبی', '학술': 'علمی', '문화예술': 'فرهنگی', '취미': 'سرگرمی', '아동 봉사': 'داوطلب کودکان', '풍선아트': 'هنر بادکنک', '플로깅': 'پلاگینگ', '멘토링': 'مربیگری', '헌혈': 'اهدای خون', '나눔': 'اشتراک‌گذاری' },
};

export default function ClubDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { uiLanguage, contentLanguage, contentTranslationEnabled } = useLanguageStore();
  const ui = uiTextMap[uiLanguage] ?? uiTextMap.ko;
  const club = clubs.find((item) => item.id === id);

  if (!club) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.missing}>
          <EmptyState icon="error-outline" title={ui.notFound} body={ui.notFoundBody} />
        </View>
      </SafeAreaView>
    );
  }

  const badgeLabel =
    club.safetyBadgeStatus === 'VERIFIED' ? ui.verified
    : club.safetyBadgeStatus === 'PENDING_REVIEW' ? ui.pendingReview
    : ui.none;

  const languageLabel = getTranslationLabel(contentLanguage);
  const descriptionTranslation = translatedText(club.descriptionTranslations, contentLanguage);
  const taglineTranslation = translatedText(club.taglineTranslations, contentLanguage);
  const meetingTranslation = translatedText(club.meetingInfoTranslations, contentLanguage);
  const recruitTranslation = translatedText(club.recruitInfoTranslations, contentLanguage);
  const activitiesTranslation = translatedList(club.recentActivityTranslations, contentLanguage);
  const displayName = uiLanguage === 'ko' ? club.name : (club.englishName || club.name);
  const currentTagMap = tagMap[uiLanguage] ?? tagMap.ko;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.imageWrap}>
          <TouchableOpacity
            style={styles.backButton}
            accessibilityLabel="뒤로가기"
            activeOpacity={0.78}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back-ios-new" size={20} color={colors.navyDeep} />
          </TouchableOpacity>
          <Image source={{ uri: club.imageUrl }} style={styles.heroImage} />
          <View style={styles.imageOverlay}>
            <Badge label={currentTagMap[club.category] ?? club.category} tone="gold" />
            <Text style={styles.heroTitle}>{displayName}</Text>
            <Text style={styles.heroSubtitle}>{club.englishName}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryTop}>
              <View style={styles.summaryItem}>
                <MaterialIcons name="groups" size={22} color={colors.navyDeep} />
                <Text style={styles.summaryValue}>{club.members}</Text>
                <Text style={styles.summaryLabel}>{ui.members}</Text>
              </View>
              <View style={styles.summaryItem}>
                <MaterialIcons name="event" size={22} color={colors.navyDeep} />
                <Text style={styles.summaryValue}>{club.isRecruiting ? ui.recruiting : ui.closed}</Text>
                <Text style={styles.summaryLabel}>{ui.status}</Text>
              </View>
              <View style={styles.summaryItem}>
                <MaterialIcons name="translate" size={22} color={colors.navyDeep} />
                <Text style={styles.summaryValue}>{club.language === 'both' ? '한/영' : club.language}</Text>
                <Text style={styles.summaryLabel}>{ui.language}</Text>
              </View>
            </View>
            <View style={styles.badges}>
              {club.tags.map((tag) => (
                <Badge key={tag} label={currentTagMap[tag] ?? tag} tone={tag.includes('모집') ? 'green' : 'muted'} />
              ))}
              <Badge label={badgeLabel} tone={club.safetyBadgeStatus === 'VERIFIED' ? 'navy' : 'muted'} />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{ui.clubIntro}</Text>
            <TranslatedContent
              originalLabel={ui.originalKorean}
              translationLabel={`${ui.translated} · ${languageLabel}`}
              originalTitle={club.tagline}
              originalBody={club.description}
              translatedTitle={taglineTranslation}
              translatedBody={descriptionTranslation}
              translationEnabled={contentTranslationEnabled}
              noTranslationText={ui.noTranslation}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{ui.recruitmentInfo}</Text>
            <InfoRow
              icon="schedule"
              label={ui.regularMeeting}
              value={club.meetingInfo}
              translatedValue={meetingTranslation}
              translationLabel={`${ui.translated} · ${languageLabel}`}
              translationEnabled={contentTranslationEnabled}
            />
            <InfoRow
              icon="person-add"
              label={ui.recruitingTarget}
              value={club.recruitInfo}
              translatedValue={recruitTranslation}
              translationLabel={`${ui.translated} · ${languageLabel}`}
              translationEnabled={contentTranslationEnabled}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{ui.recentActivities}</Text>
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
              {club.isRecruiting ? ui.apply : ui.closed}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({
  icon, label, value, translatedValue, translationLabel, translationEnabled,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string; value: string; translatedValue: string;
  translationLabel: string; translationEnabled: boolean;
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
  originalLabel, translationLabel, originalTitle, originalBody,
  translatedTitle, translatedBody, translationEnabled, noTranslationText,
}: {
  originalLabel: string; translationLabel: string;
  originalTitle: string; originalBody: string;
  translatedTitle: string; translatedBody: string;
  translationEnabled: boolean; noTranslationText: string;
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
            <Text style={styles.translationText}>{noTranslationText}</Text>
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
  backButton: {
    alignItems: 'center', backgroundColor: colors.canvas, borderRadius: 999,
    height: 42, justifyContent: 'center', left: 16, position: 'absolute',
    top: 16, width: 42, zIndex: 4,
  },
  heroImage: { height: '100%', width: '100%' },
  imageOverlay: {
    backgroundColor: 'rgba(26,46,90,0.48)', bottom: 0, gap: 6,
    left: 0, padding: 18, position: 'absolute', right: 0,
  },
  heroTitle: { color: colors.canvas, fontSize: 30, fontWeight: '900' },
  heroSubtitle: { color: colors.goldPale, fontSize: 15, fontWeight: '700' },
  body: { gap: 16, padding: 16 },
  summaryCard: {
    backgroundColor: colors.canvas, borderColor: colors.borderSoft,
    borderRadius: 14, borderWidth: 1, gap: 14, padding: 16,
  },
  summaryTop: { flexDirection: 'row', gap: 10 },
  summaryItem: {
    alignItems: 'center', backgroundColor: colors.surfaceSoft,
    borderRadius: 12, flex: 1, gap: 4, padding: 12,
  },
  summaryValue: { color: colors.inkDeep, fontSize: 15, fontWeight: '900' },
  summaryLabel: { color: colors.inkMuted, fontSize: 11, fontWeight: '700' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  card: {
    backgroundColor: colors.canvas, borderColor: colors.borderSoft,
    borderRadius: 14, borderWidth: 1, gap: 12, padding: 16,
  },
  cardTitle: { color: colors.inkDeep, fontSize: 19, fontWeight: '900' },
  translatedContent: { gap: 12 },
  originalBlock: { gap: 7 },
  originalLabel: { color: colors.inkMuted, fontSize: 12, fontWeight: '900' },
  tagline: { color: colors.gold, fontSize: 14, fontWeight: '900' },
  cardText: { color: colors.ink, fontSize: 15, lineHeight: 23 },
  translationBox: {
    backgroundColor: colors.surfaceWarm, borderColor: colors.goldPale,
    borderRadius: 12, borderWidth: 1, gap: 5, padding: 12,
  },
  translationLabel: { color: colors.gold, fontSize: 12, fontWeight: '900' },
  translationTitle: { color: colors.inkDeep, fontSize: 14, fontWeight: '900', lineHeight: 20 },
  translationText: { color: colors.ink, fontSize: 14, lineHeight: 21 },
  infoRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 12 },
  infoIcon: {
    alignItems: 'center', backgroundColor: colors.goldPale,
    borderRadius: 20, height: 40, justifyContent: 'center', width: 40,
  },
  infoTextWrap: { flex: 1, gap: 3 },
  infoLabel: { color: colors.inkMuted, fontSize: 12, fontWeight: '800' },
  infoValue: { color: colors.ink, fontSize: 14, lineHeight: 21 },
  infoTranslation: {
    backgroundColor: colors.surfaceWarm, borderRadius: 10,
    gap: 4, marginTop: 8, padding: 10,
  },
  activityRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 10 },
  activityDot: {
    backgroundColor: colors.gold, borderRadius: 5,
    height: 10, marginTop: 5, width: 10,
  },
  activityTextWrap: { flex: 1, gap: 3 },
  activityText: { color: colors.ink, fontSize: 14, lineHeight: 21 },
  activityTranslation: { color: colors.inkMuted, fontSize: 13, lineHeight: 19 },
  applyButton: {
    alignItems: 'center', backgroundColor: colors.navyDeep,
    borderRadius: 14, padding: 16,
  },
  applyButtonDisabled: {
    alignItems: 'center', backgroundColor: colors.inkMuted,
    borderRadius: 14, padding: 16,
  },
  applyButtonText: { color: colors.canvas, fontSize: 16, fontWeight: '900' },
});
