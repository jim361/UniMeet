import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, ImageBackground,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = {
  navyDeep: '#1A2E5A', navy: '#1E3A7B', gold: '#D4A017',
  goldLight: '#F0C040', goldPale: '#FBF0C8', canvas: '#FFFFFF',
  surface: '#fbf8fd', surfaceSoft: '#F5F7FA',
  borderSoft: '#EEF2F7', border: '#E2E8F0',
  ink: '#2D3748', inkMuted: '#718096', success: '#38A169',
};

const LANGS = [
  { flag: '🇰🇷', code: 'KR' },
  { flag: '🇺🇸', code: 'EN' },
  { flag: '🇨🇳', code: 'CN' },
  { flag: '🇪🇸', code: 'ES' },
];

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA43CnWGriUI69UVLKH8hI7GTmTgHGrDHeAhxdIXYF27pvH8jxDu0HwAiMJQIIIRSlru-BQS8vzuTsT8b4Jkn2496J_ZrB607jflNUXFuJdiVoh8UMcRTh2tUAgSTiOwWZRYF2CjN9sE5nsr8-BD8GTWknFK_mwnLLwnQsMIiMflyrH5HFnVjvoDwro-4G_dHxzojCPtixrL753ZkvbmuEe5CAVn-dDxYWf1l6-j9ilKT8kGvAsgRw3KmDdsa5wQwOdCaYmEselNaQ';

const POSTS = [
  {
    id: '1', name: 'Min-su Kim', time: '2시간 전', uni: 'Yonsei University',
    flag: '🇰🇷', lang: 'Korean', verified: true, likes: 24, comments: 8,
    content: '오늘 도서관 앞에서 같이 점심 드실 분 계신가요? 날씨가 너무 좋네요!',
    translation: '(Is anyone up for lunch in front of the library today? The weather is amazing!)',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPqwfxoBDfXpT3mbIkMNMaB45JqEBHF_BCMISiYKPz55fm9LWefweXUvN_6fAK3j7FV6-skLIuNG-QU_d0zECdJfMyP2scYWCCfKcGS7LY4Q0cenxuhTcG4ANJqsJQPP_-C6IkNmVHr7iUSQtTZM6SqJ45z_usaXnKD53SFP7gy0tiguH_y8yZkDe7VQ4PmY7N5WCUMdWS328NtxBG_VlGBomgoEmdsE82vccle5rDqxrTYEfIWh_RVBSGQBEWJwEm1z3ej7LDTe0',
  },
  {
    id: '2', name: 'Elena Rodriguez', time: '5시간 전', uni: 'SNU Gwanak',
    flag: '🇪🇸', lang: 'Spanish', verified: false, likes: 42, comments: 15,
    content: '¡Finalmente terminé mis exámenes finales! ¿Alguien quiere celebrar esta noche?',
    translation: '(드디어 기말고사가 끝났어요! 오늘 밤 같이 축하할 사람 있나요?)',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHPHaX7BoCZWPDWu6owWzW6IEIOUTHSeo_q5PFuc2gncu7NDDE1IpgcPn13oqk9zxMZMFdGEyaQUha-goFkM4IiOTng5sCerYseYbu0wjssizjAUTjdePMuVM3wgWesrw0mBloLO-hv9qx4kFSoMQtNvS0_1FADJCkVami4FSjVq21b-u84CFQnj6BPCiVz3tiUh6orsgGKmeFQDnE4XzuRdcXz6z0yGQDhinuXYzl_6bkdYNZ5DGmTDaBHwrSTonCYmA3dcmGmk0',
  },
];

export default function HomeScreen() {
  const [activeLang, setActiveLang] = useState('KR');

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      {/* TopBar */}
      <View style={s.topBar}>
        <Text style={s.logo}>UniMeet</Text>
        <TouchableOpacity style={s.iconBtn}>
          <MaterialIcons name="notifications" size={24} color={C.navyDeep} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Language Chips */}
        <ScrollView
          horizontal showsHorizontalScrollIndicator={false}
          style={s.langRow} contentContainerStyle={s.langContent}
        >
          {LANGS.map((l) => (
            <TouchableOpacity
              key={l.code}
              style={[s.chip, activeLang === l.code && s.chipActive]}
              onPress={() => setActiveLang(l.code)}
            >
              <Text style={s.chipFlag}>{l.flag}</Text>
              <Text style={[s.chipCode, activeLang === l.code && s.chipCodeActive]}>{l.code}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={s.chipMore}>
            <MaterialIcons name="add" size={16} color={C.ink} />
          </TouchableOpacity>
        </ScrollView>

        {/* Recommended Clubs */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>추천 동아리</Text>
            <TouchableOpacity><Text style={s.seeAll}>모두 보기</Text></TouchableOpacity>
          </View>

          {/* Hero card */}
          <ImageBackground source={{ uri: HERO_IMG }} style={s.heroCard} imageStyle={s.heroImage}>
            <View style={s.heroGrad}>
              <View style={s.heroBadge}><Text style={s.heroBadgeText}>문화</Text></View>
              <Text style={s.heroTitle}>Global Exchange Hub</Text>
              <Text style={s.heroSub}>Connect with students from 40+ countries.</Text>
            </View>
          </ImageBackground>

          {/* Mini cards row */}
          <View style={s.miniRow}>
            <View style={s.miniCard}>
              <View style={[s.miniIcon, { backgroundColor: C.goldPale }]}>
                <MaterialIcons name="fitness-center" size={20} color={C.gold} />
              </View>
              <Text style={s.miniTitle}>엘리트 스포츠</Text>
              <View style={s.miniBadge}><Text style={s.miniBadgeText}>스포츠</Text></View>
            </View>
            <View style={s.miniCard}>
              <View style={[s.miniIcon, { backgroundColor: C.surfaceSoft }]}>
                <MaterialIcons name="palette" size={20} color={C.navy} />
              </View>
              <Text style={s.miniTitle}>아트 & 디자인</Text>
              <View style={s.miniBadge}><Text style={s.miniBadgeText}>창의성</Text></View>
            </View>
          </View>
        </View>

        {/* Campus Feed */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>캠퍼스 피드</Text>
          {POSTS.map((post) => (
            <View key={post.id} style={s.postCard}>
              <View style={s.postHead}>
                <View style={s.postAuthor}>
                  <View>
                    <Image source={{ uri: post.avatar }} style={s.avatar} />
                    {post.verified && (
                      <View style={s.verifiedBadge}>
                        <MaterialIcons name="verified" size={10} color="#fff" />
                      </View>
                    )}
                  </View>
                  <View>
                    <Text style={s.authorName}>{post.name}</Text>
                    <Text style={s.authorMeta}>{post.time} • {post.uni}</Text>
                  </View>
                </View>
                <View style={s.langBadge}>
                  <Text style={s.langFlag}>{post.flag}</Text>
                  <Text style={s.langText}>{post.lang}</Text>
                </View>
              </View>
              <View style={s.postBody}>
                <Text style={s.postContent}>{post.content}</Text>
                <View style={s.postTranslationBox}>
                  <Text style={s.postTranslation}>{post.translation}</Text>
                </View>
              </View>
              <View style={s.postFooter}>
                <View style={s.postActions}>
                  <TouchableOpacity style={s.actionBtn}>
                    <MaterialIcons name="favorite-border" size={20} color={C.inkMuted} />
                    <Text style={s.actionCount}>{post.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={s.actionBtn}>
                    <MaterialIcons name="chat-bubble-outline" size={20} color={C.inkMuted} />
                    <Text style={s.actionCount}>{post.comments}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <MaterialIcons name="share" size={20} color={C.inkMuted} />
                </TouchableOpacity>
              </View>
            </View>
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
  iconBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20 },
  scroll: { paddingBottom: 20 },
  langRow: { flexGrow: 0, marginTop: 12 },
  langContent: { paddingHorizontal: 16, gap: 8 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999,
    backgroundColor: '#F5F7FA', borderWidth: 1, borderColor: '#EEF2F7',
  },
  chipActive: { backgroundColor: '#1A2E5A', borderColor: '#1A2E5A' },
  chipFlag: { fontSize: 14 },
  chipCode: { fontSize: 13, fontWeight: '600', color: '#2D3748' },
  chipCodeActive: { color: '#fff' },
  chipMore: {
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999,
    backgroundColor: '#F5F7FA', borderWidth: 1, borderColor: '#EEF2F7',
    justifyContent: 'center', alignItems: 'center',
  },
  section: { paddingHorizontal: 16, marginTop: 24, gap: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: '#1A2E5A', letterSpacing: -0.2 },
  seeAll: { fontSize: 14, fontWeight: '700', color: '#D4A017' },
  heroCard: { height: 200, borderRadius: 12, overflow: 'hidden' },
  heroImage: { borderRadius: 12 },
  heroGrad: { flex: 1, justifyContent: 'flex-end', padding: 16, backgroundColor: 'rgba(26,46,90,0.45)' },
  heroBadge: {
    backgroundColor: '#D4A017', borderRadius: 999, alignSelf: 'flex-start',
    paddingHorizontal: 8, paddingVertical: 2, marginBottom: 4,
  },
  heroBadgeText: { fontSize: 10, fontWeight: '700', color: '#1A2E5A', textTransform: 'uppercase' },
  heroTitle: { fontSize: 22, fontWeight: '600', color: '#fff' },
  heroSub: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  miniRow: { flexDirection: 'row', gap: 12 },
  miniCard: {
    flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 12,
    borderWidth: 1, borderColor: '#EEF2F7', gap: 8,
  },
  miniIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  miniTitle: { fontSize: 16, fontWeight: '700', color: '#1A2E5A', lineHeight: 20 },
  miniBadge: {
    backgroundColor: 'rgba(30,58,123,0.1)', borderRadius: 999,
    alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2,
  },
  miniBadgeText: { fontSize: 10, fontWeight: '700', color: '#1E3A7B' },
  postCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: '#EEF2F7', gap: 12, marginTop: 8,
  },
  postHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  postAuthor: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  verifiedBadge: {
    position: 'absolute', bottom: -2, right: -2, width: 16, height: 16,
    borderRadius: 8, backgroundColor: '#38A169', justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  authorName: { fontSize: 15, fontWeight: '700', color: '#1A2E5A' },
  authorMeta: { fontSize: 12, color: '#718096', marginTop: 1 },
  langBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(30,58,123,0.05)', borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  langFlag: { fontSize: 12 },
  langText: { fontSize: 11, fontWeight: '700', color: '#1E3A7B' },
  postBody: { gap: 6 },
  postContent: { fontSize: 16, color: '#1E3A7B', lineHeight: 24 },
  postTranslationBox: { borderLeftWidth: 2, borderLeftColor: '#F0C040', paddingLeft: 10 },
  postTranslation: { fontSize: 14, color: '#718096', fontStyle: 'italic', lineHeight: 20 },
  postFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 8, borderTopWidth: 1, borderTopColor: '#EEF2F7',
  },
  postActions: { flexDirection: 'row', gap: 16 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionCount: { fontSize: 13, fontWeight: '600', color: '#718096' },
});
