import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { ClubCard } from '@/components/ClubCard';
import { colors } from '@/constants/theme';
import { clubs } from '@/data/mock';

export default function MyClubsScreen() {
  const router = useRouter();
  const myClubs = clubs.slice(0, 2);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="내 동아리" subtitle="가입했거나 관리 중인 동아리" showBell={false} showBack />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>현재 {myClubs.length}개 동아리에 연결되어 있어요.</Text>
          <Text style={styles.summaryBody}>
            동아리 카드를 누르면 상세 정보, 모집 요강, 최근 활동을 확인할 수 있습니다.
          </Text>
        </View>
        {myClubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
        <TouchableOpacity style={styles.exploreButton} onPress={() => router.push('/(tabs)/explore')}>
          <Text style={styles.exploreText}>다른 동아리 탐색하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, flex: 1 },
  content: { gap: 14, padding: 16, paddingBottom: 28 },
  summary: {
    backgroundColor: colors.navyDeep,
    borderRadius: 16,
    gap: 8,
    padding: 18,
  },
  summaryTitle: { color: colors.canvas, fontSize: 20, fontWeight: '900' },
  summaryBody: { color: colors.goldPale, fontSize: 14, lineHeight: 21 },
  exploreButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 14,
    padding: 15,
  },
  exploreText: { color: colors.navyDeep, fontSize: 15, fontWeight: '900' },
});
