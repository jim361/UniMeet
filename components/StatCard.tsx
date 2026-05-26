import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/theme';

type StatCardProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
  onPress?: () => void;
};

export function StatCard({ icon, label, value, onPress }: StatCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      disabled={!onPress}
      onPress={onPress}
    >
      <View style={styles.icon}>
        <MaterialIcons name={icon} size={22} color={colors.navyDeep} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    gap: 6,
    padding: 14,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.goldPale,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  value: {
    color: colors.inkDeep,
    fontSize: 22,
    fontWeight: '900',
  },
  label: {
    color: colors.inkMuted,
    fontSize: 12,
    fontWeight: '700',
  },
});
