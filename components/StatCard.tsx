import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

type StatCardProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
};

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <MaterialIcons name={icon} size={22} color={colors.navyDeep} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
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
