import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ACTIVE = [
  {
    id: '1', name: 'Julian Kim', status: '입력 중...', dark: false,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9Z6NKrbFhmYAe_hRpVJKy06dvdSMfDtRkjjZ9D8Nf2xFr-BKGmMR7_UR_Br3QwBJyXABQZvfoGmrfw06vTAkpB9Xx6wS8zvdftJne0viAlCDZvFcAH1uUI80tkRfuk9Ju3Kfx-z8qzhg_Nk76kucS-eCCRwSjN7NOQcohSg2FqA7tXZU5qb5TMDzKAvhx47I0EurWQdqcZ8AoHaNWkDC2M0s4zqIBoCK4fphRPYBeku2fcs2oCz2fScdz9qVKBC7aWc8qiWRxPjg',
  },
  {
    id: '2', name: 'Elena Smith', status: '새 프로젝트', dark: true, unread: 3,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZxgyaicBIywrZvL4Q_Gy1z9ktdqFU2vV_PM3xVghcsU9mtxGH6R_yNip75kCsW8Ar93EGd62uULzO_KtSlJJX1Egxe2zbQqVnNYrkpcUEH3S2VTWdK62TrNqpPSVZo06WwNPl6D2pz_FysNwIY7pB1F5P2D6Zdy-EqdYx55yzY6uQSU1z6tpjX54ha9rUuBt7XgoeZ9pR21AkO-Lufps1pWcAoyt6M7Mf7A-HD93bPK-aicvs1F-onYsCOORr3BCPh50unkHnNoA',
  },
];

const MSGS = [
  {
    id: '1', name: 'David Zhang', time: '12:45 PM', online: true, unread: false, initials: null,
    preview: '"Hey, are we still meeting at the library hub later tonight?"',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFl_mTfLs-inz60tVvcqaiLuQrmtulJJKni0LHJ0mm38FpMnPIMYfwY0JFIrH_gtTCluo-jY3JvA3v_Elm0ryJVWFxT1eyH-A_5UjgoGno5Kp4B5E8xUYPGnEL5ts3D-8Zj48Rbzkwnc1nboVbgxJLhPQL2jQBx6ZMNFSI-6ApNd_kag0ZJwy2PttOLi2P9bU1QDqjhUa3F7a3eSX0XeuG0dIX9nGSZkUCg7caMDR4tS9xj1zGPqNn-WQYg52dP7jxlgrcPJuJkhc',
  },
  {
    id: '2', name: 'Literature Group', time: '방금 전', online: false, unread: true,
    initials: 'LG', avatar: null,
    preview: '밀러 교수님: Final drafts are due by Friday!',
  },
  {
    id: '3', name: 'Sarah Jenkins', time: '어제', online: false, unread: false, initials: null,
    preview: 'The notes from today\'s lecture were amazing, thanks!',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2qv4WUiq_zFy8HjQ4eJfrbCSuWs8UXMqtPYPi0Xt21FN2pP3poDfbgFFJ6hYkybh2bnzaBdT9yPS4ZBwFNPrfUv2meAPSqxGSHxSf9E8EbgEfYp-8tj5C3AKj5K8fdVoivGklOhidZhn7UKGf-8ztGxzk6vJs00Qhb9oX-i8IIN4NS-kz9_uc0sgFsiZWCn8c-ew-OfprJoITreKJs8mh0CDmljKxqWX9SwRbC7L5FfordCtBp7domE7Y73zUP2f1T9amBkBGS94',
  },
  {
    id: '4', name: 'Marcus Thorne', time: '10월 24일', online: false, unread: false, initials: null,
    preview: 'See you at the conference center.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHoIarzPzd2vq330x81us7dHLroDt1lHPSOQRtcm7OlCa5GAnobNLKzRJwIwaCpn3xcPKjc8PosX122Z3f4Jjp0gqiCjsNiNdKf3IdHUYniq31dSeHHKJj46yVverzv59vldI7It38QYC0VHGDmkw78ydo1yjBWONPcnt-Rj5KL1i4hGDPdgSBD2NrdFsEyqAlvRQTDbTo_9K9E580gu2L-Aaq9bVBEfTqFnPFKVZ4ETDk1j6GlzTgfmJ-9rW3T4Pa9z1litGEo7w',
  },
];

export default function ChatsScreen() {
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
        {/* Title */}
        <View style={s.titleRow}>
          <Text style={s.pageTitle}>메시지</Text>
          <TouchableOpacity style={s.editBtn}>
            <MaterialIcons name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Active Now */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>현재 활동 중</Text>
          <View style={s.activeGrid}>
            {ACTIVE.map((u) => (
              <TouchableOpacity key={u.id} style={[s.activeCard, u.dark && s.activeCardDark]}>
                {!u.dark && <View style={s.onlineDot} />}
                {'unread' in u && u.unread && (
                  <View style={s.unreadBadge}>
                    <Text style={s.unreadBadgeText}>{u.unread}</Text>
                  </View>
                )}
                <Image source={{ uri: u.avatar }} style={s.activeAvatar} />
                <Text style={[s.activeName, u.dark && s.activeNameDark]}>{u.name}</Text>
                <Text style={[s.activeStatus, u.dark && s.activeStatusDark]}>{u.status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Messages */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>최근 메시지</Text>
          {MSGS.map((msg) => (
            <TouchableOpacity key={msg.id} style={[s.msgRow, msg.unread && s.msgRowUnread]}>
              <View style={s.msgAvatarWrap}>
                {msg.avatar ? (
                  <Image source={{ uri: msg.avatar }} style={s.msgAvatar} />
                ) : (
                  <View style={[s.msgAvatar, s.initials]}>
                    <Text style={s.initialsText}>{msg.initials}</Text>
                  </View>
                )}
                {msg.online && <View style={s.onlineDotSm} />}
                {msg.unread && (
                  <View style={s.msgUnread}>
                    <Text style={s.msgUnreadText}>1</Text>
                  </View>
                )}
              </View>
              <View style={s.msgContent}>
                <View style={s.msgHead}>
                  <Text style={s.msgName}>{msg.name}</Text>
                  <Text style={[s.msgTime, msg.unread && s.msgTimeUnread]}>{msg.time}</Text>
                </View>
                <Text style={s.msgPreview} numberOfLines={1}>{msg.preview}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA Banner */}
        <View style={s.cta}>
          <View style={s.ctaGold} />
          <View style={s.ctaIcon}>
            <MaterialIcons name="forum" size={22} color="#1A2E5A" />
          </View>
          <View style={s.ctaText}>
            <Text style={s.ctaTitle}>글로벌 디스커스 참여하기</Text>
            <Text style={s.ctaSub}>15개 이상의 국제 캠퍼스 학생들과 지금 바로 연결하세요.</Text>
          </View>
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
  titleRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 20, marginBottom: 16,
  },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#1A2E5A' },
  editBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#1A2E5A',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 6,
  },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionLabel: { fontSize: 13, fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 },
  activeGrid: { flexDirection: 'row', gap: 12 },
  activeCard: {
    flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 12,
    alignItems: 'center', borderWidth: 1, borderColor: '#EEF2F7', overflow: 'hidden',
  },
  activeCardDark: { backgroundColor: '#1A2E5A', borderColor: '#1A2E5A' },
  onlineDot: {
    position: 'absolute', top: 8, right: 8, width: 10, height: 10,
    borderRadius: 5, backgroundColor: '#38A169', borderWidth: 2, borderColor: '#fff',
  },
  unreadBadge: {
    position: 'absolute', top: 8, right: 8, zIndex: 1,
    backgroundColor: '#D4A017', borderRadius: 999, paddingHorizontal: 6, paddingVertical: 2,
  },
  unreadBadgeText: { fontSize: 10, fontWeight: '700', color: '#1A2E5A' },
  activeAvatar: { width: 56, height: 56, borderRadius: 28, marginBottom: 10, borderWidth: 2, borderColor: '#FBF0C8' },
  activeName: { fontSize: 14, fontWeight: '700', color: '#1A2E5A', textAlign: 'center' },
  activeNameDark: { color: '#fff' },
  activeStatus: { fontSize: 12, color: '#718096', marginTop: 2 },
  activeStatusDark: { color: '#F0C040' },
  msgRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12,
    backgroundColor: '#fff', borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#EEF2F7',
  },
  msgRowUnread: { backgroundColor: '#FDF6E8', borderColor: '#FBF0C8' },
  msgAvatarWrap: { position: 'relative' },
  msgAvatar: { width: 52, height: 52, borderRadius: 26 },
  initials: { backgroundColor: '#1E3A7B', justifyContent: 'center', alignItems: 'center' },
  initialsText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  onlineDotSm: {
    position: 'absolute', bottom: 0, right: 0, width: 14, height: 14,
    borderRadius: 7, backgroundColor: '#38A169', borderWidth: 2, borderColor: '#fff',
  },
  msgUnread: {
    position: 'absolute', top: -4, right: -4, width: 20, height: 20,
    borderRadius: 10, backgroundColor: '#1A2E5A', justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#FDF6E8',
  },
  msgUnreadText: { fontSize: 10, color: '#fff', fontWeight: '700' },
  msgContent: { flex: 1 },
  msgHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  msgName: { fontSize: 15, fontWeight: '700', color: '#1A2E5A' },
  msgTime: { fontSize: 11, color: '#718096' },
  msgTimeUnread: { color: '#1E3A7B', fontWeight: '700' },
  msgPreview: { fontSize: 13, color: '#718096' },
  cta: {
    margin: 16, padding: 16, backgroundColor: '#1A2E5A', borderRadius: 20,
    flexDirection: 'row', alignItems: 'flex-start', gap: 12, overflow: 'hidden',
  },
  ctaGold: {
    position: 'absolute', right: -16, bottom: -16,
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#D4A017', opacity: 0.1,
  },
  ctaIcon: {
    width: 40, height: 40, borderRadius: 10, backgroundColor: '#D4A017',
    justifyContent: 'center', alignItems: 'center',
  },
  ctaText: { flex: 1 },
  ctaTitle: { fontSize: 14, fontWeight: '700', color: '#fff' },
  ctaSub: { fontSize: 12, color: '#FBF0C8', marginTop: 4, lineHeight: 18 },
});
