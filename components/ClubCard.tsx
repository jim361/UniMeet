import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Badge } from '@/components/Badge';
import { colors, shadow } from '@/constants/theme';
import { Club } from '@/types';

type ClubCardProps = {
  club: Club;
};

export function ClubCard({ club }: ClubCardProps) {
  const router = useRouter();
  const badgeLabel =
    club.safetyBadgeStatus === 'VERIFIED'
      ? '검토 완료'
      : club.safetyBadgeStatus === 'PENDING_REVIEW'
        ? '검토 중'
        : '미검토';

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.88}
      onPress={() => router.push({ pathname: '/club/[id]', params: { id: club.id } })}
    >
      <Image source={{ uri: club.imageUrl }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{club.name}</Text>
            <Text style={styles.subtitle}>{club.englishName}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.inkMuted} />
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {club.description}
        </Text>
        <View style={styles.badgeRow}>
          <Badge label={club.category} tone="gold" />
          <Badge label={club.isRecruiting ? '모집 중' : '모집 마감'} tone={club.isRecruiting ? 'green' : 'muted'} />
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
  image: {
    height: 164,
    width: '100%',
  },
  body: {
    gap: 10,
    padding: 14,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    color: colors.inkDeep,
    fontSize: 18,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.inkMuted,
    fontSize: 13,
    marginTop: 2,
  },
  description: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 21,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
});
