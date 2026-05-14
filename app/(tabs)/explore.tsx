import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATS = [
  { icon: 'translate', label: '언어 교환', sub: '12개 활동 중' },
  { icon: 'menu-book', label: '스터디 그룹', sub: '45개 지역 그룹' },
  { icon: 'sports-basketball', label: '스포츠', sub: '8개 예정된 경기' },
  { icon: 'palette', label: '예술 & 음악', sub: '15개 신규 워크숍' },
];

const CLUBS = [
  {
    id: '1', name: '글로벌 앰배서더', members: '2.4천 명', posts: '오늘 5개',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6QM95jHnHGE4gusVSiFpDydSC2uovLpn9ribaSMv9IC-RWjPvTyMapauxlW8PbOqpk-ZtD-iu0fWsG7YZkZpZINxhs7dufk-R_hTxVQV9FZEaORYdWXRUiienJ9zscatdQzlHtIJbV6FQu9pc4I_tVJhho2HtaLTQnMKS4G1V_b442k9Jg-w_dvndtQKyZAoj7We7aRu8_V7WXK7EJXAyRGUnTNrnl2w2yder3-pVNhWZMyRliZjmLbEc7qhSaNHiEl_Aq6_C5ZU',
  },
  {
    id: '2', name: '캠퍼스 올스타즈', members: '1.8천 명', posts: '오늘 3개',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSQdMmXQWH4LmuXad_b836iJYy790FUA-i09tLKrselqfoRkWnPh_SpEHayRNQszeFd4Qpxi9_oii3bp7XHp47SWx_AzU-nhOT4FQtyTt9ALuTRAvAm2lUycANedy-vrR8rJ4ndkW3ZLirNSm49gjLRBtgMbTfmiaVTQ90w82TBwoOus0GMbGMZ0BIPUf4W4ucJEZCpzeyYctM3w4MCxurXvJfRD4QeBYsZEpsj9UGZ9UkdYpiiLIFBMDD_NaddR6EkTLTuzWLmXg',
  },
  {
    id: '3', name: '아트 콜렉티브', members: '950명', posts: '오늘 12개',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3JavyoxbsV3-jC1VbpT1YcFcJN10Yd597OHx0p0MtXAejKZVFnjtsqx3-QpisPDJrAB4m5CRzh6WMbNlDADvflAvmcJ5hyAKXaM21zKqKP1Cv2P80w_iosVtrl0ax4g0t_DAYO5fFwO0LszQxsGqwgfoqYzOWB-kFkHlITK5DW6ugdouLlL2Gc5FiOuZdUtF42wOLCrYSEnYwF1ZPrPphATEbkZAzV-B-j98_UdotfzHp7-_JWGjWWZkohHbb-k1L-YerEicf27g',
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <View style={s.topBar}>
        <Text style={s.logo}>UniMeet</Text>
        <View style={s.topIcons}>
          <TouchableOpacity style={s.iconBtn}>
            <MaterialIcons name="search" size={24} color="#64748B" />
          </TouchableOpacity>
          <TouchableOpacity style={s.iconBtn}>
            <MaterialIcons name="notifications" size={24} color="#64748B" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Search */}
        <View style={s.searchBox}>
          <MaterialIcons name="search" size={20} color="#718096" />
          <TextInput
            style={s.searchInput}
            placeholder="동아리, 이벤트 또는 학생 검색..."
            placeholderTextColor="#718096"
          />
        </View>

        {/* Categories */}
        <View style={s.section}>
          <View style={s.sectionHead}>
            <Text style={s.sectionTitle}>카테고리</Text>
            <TouchableOpacity><Text style={s.seeAll}>모두 보기</Text></TouchableOpacity>
          </View>
          <View style={s.catGrid}>
            {CATS.map((cat) => (
              <TouchableOpacity key={cat.label} style={s.catCard}>
                <View style={s.catIcon}>
                  <MaterialIcons name={cat.icon as any} size={22} color="#fff" />
                </View>
                <Text style={s.catLabel}>{cat.label}</Text>
                <Text style={s.catSub}>{cat.sub}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Clubs */}
        <View style={s.section}>
          <View style={s.sectionHead}>
            <Text style={s.sectionTitle}>인기 동아리</Text>
            <TouchableOpacity><Text style={s.seeAll}>모두 보기</Text></TouchableOpacity>
          </View>
          {CLUBS.map((club) => (
            <TouchableOpacity key={club.id} style={s.clubRow}>
              <Image source={{ uri: club.image }} style={s.clubImg} />
              <View style={s.clubInfo}>
                <Text style={s.clubName}>{club.name}</Text>
                <View style={s.clubMeta}>
                  <Text style={s.clubMembers}>멤버 {club.members}</Text>
                  <View style={s.dot} />
                  <Text style={s.clubPosts}>{club.posts}</Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#718096" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fbf8fd' },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, height: 64, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#E2E8F0',
  },
  logo: { fontSize: 20, fontWeight: '900', color: '#1A2E5A', letterSpacing: -0.5 },
  topIcons: { flexDirection: 'row', gap: 4 },
  iconBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20 },
  scroll: { paddingBottom: 20 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    margin: 16, paddingHorizontal: 14, height: 48,
    backgroundColor: '#F5F7FA', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0',
  },
  searchInput: { flex: 1, fontSize: 14, color: '#2D3748' },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: '#1A2E5A', letterSpacing: -0.2 },
  seeAll: { fontSize: 14, fontWeight: '700', color: '#1E3A7B' },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  catCard: {
    width: '47%', backgroundColor: '#fff', padding: 16, borderRadius: 12,
    borderWidth: 1, borderColor: '#EEF2F7', gap: 8,
  },
  catIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#1E3A7B', justifyContent: 'center', alignItems: 'center',
  },
  catLabel: { fontSize: 15, fontWeight: '700', color: '#1A2E5A' },
  catSub: { fontSize: 12, color: '#718096' },
  clubRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 12, backgroundColor: '#fff', borderRadius: 12, marginBottom: 10,
    borderWidth: 1, borderColor: '#EEF2F7',
  },
  clubImg: { width: 56, height: 56, borderRadius: 10 },
  clubInfo: { flex: 1 },
  clubName: { fontSize: 15, fontWeight: '700', color: '#2D3748' },
  clubMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  clubMembers: { fontSize: 12, color: '#718096' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#E2E8F0' },
  clubPosts: { fontSize: 12, color: '#1E3A7B', fontWeight: '700' },
});
