import { MaterialIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { ClubCard } from '@/components/ClubCard';
import { EmptyState } from '@/components/EmptyState';
import { colors } from '@/constants/theme';
import { clubs } from '@/data/mock';
import { useLanguageStore } from '@/store/languageStore';
import { useT } from '@/utils/i18n';

const filtersByLang: Record<string, string[]> = {
  ko: ['전체', '모집 중', '봉사', '국제교류', '종교', '학술', '문화예술', '취미'],
  en: ['All', 'Recruiting', 'Volunteer', 'International', 'Religion', 'Academic', 'Culture & Arts', 'Hobby'],
  ja: ['全体', '募集中', 'ボランティア', '国際交流', '宗教', '学術', '文化芸術', '趣味'],
  zh: ['全部', '招募中', '志愿服务', '国际交流', '宗教', '学术', '文化艺术', '兴趣'],
  vi: ['Tất cả', 'Đang tuyển', 'Tình nguyện', 'Quốc tế', 'Tôn giáo', 'Học thuật', 'Văn hóa', 'Sở thích'],
  fa: ['همه', 'در حال پذیرش', 'داوطلبانه', 'بین‌المللی', 'مذهبی', 'علمی', 'فرهنگی', 'سرگرمی'],
};

const filterKeyMap: Record<string, string> = {
  'All': '전체', 'Recruiting': '모집 중', 'Volunteer': '봉사', 'International': '국제교류',
  'Religion': '종교', 'Academic': '학술', 'Culture & Arts': '문화예술', 'Hobby': '취미',
  '全体': '전체', '募集中': '모집 중', 'ボランティア': '봉사', '国際交流': '국제교류',
  '宗教': '종교', '学術': '학술', '文化芸術': '문화예술', '趣味': '취미',
  '全部': '전체', '招募中': '모집 중', '志愿服务': '봉사', '国际交流': '국제교류',
  '学术': '학술', '文化艺术': '문화예술', '兴趣': '취미',
  'Tất cả': '전체', 'Đang tuyển': '모집 중', 'Tình nguyện': '봉사', 'Quốc tế': '국제교류',
  'Tôn giáo': '종교', 'Học thuật': '학술', 'Văn hóa': '문화예술', 'Sở thích': '취미',
  'همه': '전체', 'در حال پذیرش': '모집 중', 'داوطلبانه': '봉사', 'بین‌المللی': '국제교류',
  'مذهبی': '종교', 'علمی': '학술', 'فرهنگی': '문화예술', 'سرگرمی': '취미',
};

const subtitleByLang: Record<string, string> = {
  ko: '실제 선문대학교 동아리를 찾아보세요',
  en: 'Find real Sunmoon University clubs',
  ja: '実際の鮮文大学のサークルを探してみましょう',
  zh: '查找真实的鲜文大学社团',
  vi: 'Tìm câu lạc bộ thực tế của Đại học Sunmoon',
  fa: 'باشگاه‌های واقعی دانشگاه سانمون را بیابید',
};

const placeholderByLang: Record<string, string> = {
  ko: '동아리명, 소개, 카테고리 검색',
  en: 'Search clubs, descriptions, categories',
  ja: 'サークル名、紹介、カテゴリ検索',
  zh: '搜索社团名称、介绍、类别',
  vi: 'Tìm kiếm tên, giới thiệu, danh mục',
  fa: 'جستجوی نام، معرفی، دسته‌بندی',
};

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('전체');
  const { uiLanguage, contentLanguage, contentTranslationEnabled } = useLanguageStore();
  const t = useT();

  const filters = filtersByLang[uiLanguage] ?? filtersByLang.ko;

  const filteredClubs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return clubs.filter((club) => {
      const translatedDescription =
        contentTranslationEnabled && contentLanguage !== 'ko'
          ? club.descriptionTranslations?.[contentLanguage as 'en' | 'ja' | 'zh' | 'vi'] || ''
          : '';

      const matchedQuery =
        !normalizedQuery ||
        club.name.toLowerCase().includes(normalizedQuery) ||
        club.englishName.toLowerCase().includes(normalizedQuery) ||
        club.description.toLowerCase().includes(normalizedQuery) ||
        translatedDescription.toLowerCase().includes(normalizedQuery) ||
        club.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      const koFilter = filterKeyMap[activeFilter] ?? activeFilter;
      const matchedFilter =
        koFilter === '전체' ||
        (koFilter === '모집 중' && club.isRecruiting) ||
        club.category === koFilter;

      return matchedQuery && matchedFilter;
    });
  }, [activeFilter, query, contentLanguage, contentTranslationEnabled]);

  const countByLang: Record<string, string> = {
    ko: `총 ${filteredClubs.length}개 동아리`,
    en: `${filteredClubs.length} clubs`,
    ja: `合計 ${filteredClubs.length} サークル`,
    zh: `共 ${filteredClubs.length} 个社团`,
    vi: `Tổng ${filteredClubs.length} câu lạc bộ`,
    fa: `مجموع ${filteredClubs.length} باشگاه`,
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title={t('explore')} subtitle={subtitleByLang[uiLanguage] ?? subtitleByLang.ko} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={22} color={colors.inkMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={placeholderByLang[uiLanguage] ?? placeholderByLang.ko}
            placeholderTextColor={colors.inkMuted}
            style={styles.searchInput}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {filters.map((filter) => {
            const koFilter = filterKeyMap[filter] ?? filter;
            const active = activeFilter === koFilter;
            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(koFilter)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>{filter}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.countRow}>
          <Text style={styles.countText}>{countByLang[uiLanguage] ?? countByLang.ko}</Text>
        </View>

        <View style={styles.list}>
          {filteredClubs.length > 0 ? (
            filteredClubs.map((club) => <ClubCard key={club.id} club={club} />)
          ) : (
            <EmptyState icon="search-off" title="검색 결과가 없어요" body="다른 키워드나 필터로 다시 찾아보세요." />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, flex: 1 },
  content: { paddingBottom: 28 },
  searchBox: {
    alignItems: 'center',
    backgroundColor: colors.canvas,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    height: 52,
    margin: 16,
    paddingHorizontal: 16,
  },
  searchInput: { color: colors.ink, flex: 1, fontSize: 15 },
  filterRow: { gap: 8, paddingHorizontal: 16, paddingBottom: 12 },
  filterChip: {
    backgroundColor: colors.canvas,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  filterChipActive: { backgroundColor: colors.navyDeep, borderColor: colors.navyDeep },
  filterText: { color: colors.inkMuted, fontSize: 14, fontWeight: '800' },
  filterTextActive: { color: colors.canvas },
  countRow: { paddingHorizontal: 18, paddingBottom: 12 },
  countText: { color: colors.inkMuted, fontSize: 13, fontWeight: '800' },
  list: { gap: 14, paddingHorizontal: 16 },
});
