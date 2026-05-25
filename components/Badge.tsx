import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

type BadgeTone = 'navy' | 'gold' | 'green' | 'muted' | 'red';

type BadgeProps = {
  label: string;
  tone?: BadgeTone;
};

export function Badge({ label, tone = 'muted' }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[tone]]}>
      <Text style={[styles.text, tone === 'navy' && styles.lightText]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    color: colors.navyDeep,
    fontSize: 12,
    fontWeight: '800',
  },
  lightText: {
    color: colors.canvas,
  },
  navy: {
    backgroundColor: colors.navyDeep,
  },
  gold: {
    backgroundColor: colors.goldPale,
  },
  green: {
    backgroundColor: 'rgba(56,161,105,0.14)',
  },
  muted: {
    backgroundColor: colors.surfaceSoft,
  },
  red: {
    backgroundColor: 'rgba(229,62,62,0.12)',
  },
});
