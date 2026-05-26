import { MaterialIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { ClubCard } from '@/components/ClubCard';
import { EmptyState } from '@/components/EmptyState';
import { colors } from '@/constants/theme';
import { clubs } from '@/data/mock';

const filters = ['전체', '모집 중', '봉사', '국제교류', '종교', '학술', '문화예술', '취미'];

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('전체');

  const filteredClubs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return clubs.filter((club) => {
      const matchedQuery =
        !normalizedQuery ||
        club.name.toLowerCase().includes(normalizedQuery) ||
        club.englishName.toLowerCase().includes(normalizedQuery) ||
        club.description.toLowerCase().includes(normalizedQuery) ||
        club.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
      const matchedFilter =
        activeFilter === '전체' ||
        (activeFilter === '모집 중' && club.isRecruiting) ||
        club.category === activeFilter;

      return matchedQuery && matchedFilter;
    });
  }, [activeFilter, query]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="탐색" subtitle="실제 선문대학교 동아리를 찾아보세요" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={22} color={colors.inkMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="동아리명, 소개, 카테고리 검색"
            placeholderTextColor={colors.inkMuted}
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>{filter}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.countRow}>
          <Text style={styles.countText}>총 {filteredClubs.length}개 동아리</Text>
        </View>

        <View style={styles.list}>
          {filteredClubs.length > 0 ? (
            filteredClubs.map((club) => <ClubCard key={club.id} club={club} />)
          ) : (
            <EmptyState
              icon="search-off"
              title="검색 결과가 없어요"
              body="다른 키워드나 필터로 다시 찾아보세요."
            />
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
