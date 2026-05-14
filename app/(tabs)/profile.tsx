import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5P4vvZe00Rt4pzgnI1W348oRAjSa6WknskW4zx5Bg5BFrYoViXkRXX77qeiRP5uTBzzLhCRhzfVehwuoKtU8zdHepxsG2i2MiFA5Cvt0pSB5uqUQuqRC4i4_gvLOJ4eWsA_GXsI43FjVzkOgMf8UOdWUQasbc4oIlyCzgx1734Q7a59bP2GTgqAHo2pQOGVhRGHH0UsB_EkIEYHbOpKOQ4EjRSinfrcivNIBNQLo2FznMB8-TZpgwSScFFtuPskddVREJ8laJSg0';

const LANGS = [
  { name: '영어', level: '모국어', variant: 'dark' as const },
  { name: '한국어', level: '유창함', variant: 'gold' as const },
  { name: '스페인어', level: '학습 중', variant: 'light' as const },
  { name: '일본어', level: '기초', variant: 'light' as const },
];

const SETTINGS = [
  { icon: 'person', label: '개인 정보' },
  { icon: 'verified-user', label: '개인정보 및 보안' },
  { icon: 'help', label: '고객 센터' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <View style={s.topBar}>
        <Text style={s.logo}>UniMeet</Text>
        <TouchableOpacity style={s.iconBtn}>
          <MaterialIcons name="notifications" size={24} color="#1A2E5A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Profile Header */}
        <View style={s.header}>
          <View style={s.avatarWrap}>
            <Image source={{ uri: AVATAR }} style={s.avatar} />
            <View style={s.verifiedBadge}>
              <MaterialIcons name="verified" size={14} color="#fff" />
            </View>
          </View>
          <Text style={s.name}>Alex Harrison</Text>
          <Text style={s.sub}>컴퓨터공학 • 4학년</Text>
        </View>

        {/* Stats */}
        <View style={s.statsRow}>
          <View style={s.stat}>
            <Text style={s.statNum}>12</Text>
            <Text style={s.statLabel}>동아리</Text>
          </View>
          <View style={[s.stat, s.statGold]}>
            <Text style={[s.statNum, { color: '#1A2E5A' }]}>4</Text>
            <Text style={s.statLabel}>언어</Text>
          </View>
          <View style={s.stat}>
            <Text style={s.statNum}>158</Text>
            <Text style={s.statLabel}>친구</Text>
          </View>
        </View>

        {/* About */}
        <View style={s.card}>
          <Text style={s.cardTitle}>자기소개</Text>
          <Text style={s.aboutText}>
            기술 애호가이자 카페인으로 움직이는 코더, 그리고 아마추어 세계 탐험가입니다.
            캠퍼스에서 새로운 해커톤이나 하이킹 파트너를 항상 찾고 있어요!
          </Text>
          <Text style={s.langSectionLabel}>언어 능력</Text>
          <View style={s.langChips}>
            {LANGS.map((l) => (
              <View
                key={l.name}
                style={[
                  s.chip,
                  l.variant === 'dark' && s.chipDark,
                  l.variant === 'gold' && s.chipGold,
                ]}
              >
                <Text style={[s.chipName, l.variant === 'dark' && s.chipNameDark]}>{l.name}</Text>
                <Text style={[
                  s.chipLevel,
                  l.variant === 'dark' && s.chipLevelDark,
                  l.variant === 'gold' && s.chipLevelGold,
                ]}>{l.level}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={s.settingsWrap}>
          <Text style={s.settingsSectionLabel}>계정 설정</Text>
          <View style={s.settingsList}>
            {SETTINGS.map((item, i) => (
              <TouchableOpacity
                key={item.label}
                style={[s.settingsRow, i < SETTINGS.length - 1 && s.settingsRowBorder]}
              >
                <View style={s.settingsLeft}>
                  <View style={s.settingsIcon}>
                    <MaterialIcons name={item.icon as any} size={20} color="#2D4A8A" />
                  </View>
                  <Text style={s.settingsLabel}>{item.label}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={22} color="#718096" />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={s.logoutBtn}>
            <Text style={s.logoutText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, height: 64, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#E2E8F0',
  },
  logo: { fontSize: 20, fontWeight: '900', color: '#1A2E5A', letterSpacing: -0.5 },
  iconBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20 },
  scroll: { paddingBottom: 40 },
  header: { alignItems: 'center', paddingVertical: 24 },
  avatarWrap: { position: 'relative', marginBottom: 12 },
  avatar: { width: 88, height: 88, borderRadius: 44, borderWidth: 4, borderColor: '#fff' },
  verifiedBadge: {
    position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#38A169', justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  name: { fontSize: 24, fontWeight: '700', color: '#1A2E5A', letterSpacing: -0.2 },
  sub: { fontSize: 13, color: '#718096', marginTop: 4, fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 16 },
  stat: {
    flex: 1, backgroundColor: '#F5F7FA', padding: 16, borderRadius: 12,
    alignItems: 'center', borderWidth: 1, borderColor: '#EEF2F7',
  },
  statGold: { backgroundColor: '#FBF0C8', borderColor: 'rgba(212,160,23,0.1)' },
  statNum: { fontSize: 22, fontWeight: '700', color: '#1E3A7B' },
  statLabel: { fontSize: 11, fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 },
  card: {
    marginHorizontal: 16, marginBottom: 16, backgroundColor: '#fff',
    borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E2E8F0',
  },
  cardTitle: { fontSize: 17, fontWeight: '600', color: '#1E3A7B', marginBottom: 8 },
  aboutText: { fontSize: 14, color: '#2D3748', lineHeight: 22 },
  langSectionLabel: {
    fontSize: 11, fontWeight: '600', color: '#2D4A8A', textTransform: 'uppercase',
    letterSpacing: 1.2, marginTop: 16, marginBottom: 8,
  },
  langChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999,
    backgroundColor: '#F5F7FA', borderWidth: 1, borderColor: '#E2E8F0',
  },
  chipDark: { backgroundColor: '#1E3A7B', borderColor: '#1E3A7B' },
  chipGold: { backgroundColor: '#FBF0C8', borderColor: 'rgba(212,160,23,0.2)' },
  chipName: { fontSize: 12, fontWeight: '600', color: '#1A2E5A' },
  chipNameDark: { color: '#fff' },
  chipLevel: { fontSize: 12, color: '#718096' },
  chipLevelDark: { color: 'rgba(255,255,255,0.7)' },
  chipLevelGold: { color: '#D4A017' },
  settingsWrap: { paddingHorizontal: 16 },
  settingsSectionLabel: {
    fontSize: 11, fontWeight: '600', color: '#2D4A8A', textTransform: 'uppercase',
    letterSpacing: 1.2, marginBottom: 8,
  },
  settingsList: {
    backgroundColor: '#fff', borderRadius: 12,
    borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16,
  },
  settingsRowBorder: { borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  settingsLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  settingsIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F7FA',
    justifyContent: 'center', alignItems: 'center',
  },
  settingsLabel: { fontSize: 14, fontWeight: '700', color: '#1A2E5A' },
  logoutBtn: {
    marginTop: 12, backgroundColor: '#F5F7FA', padding: 16, borderRadius: 12, alignItems: 'center',
  },
  logoutText: { fontSize: 14, fontWeight: '700', color: '#E53E3E' },
});
