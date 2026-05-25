import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { colors } from '@/constants/theme';
import {
  ContentLanguage,
  contentLanguageLabels,
  UiLanguage,
  useLanguageStore,
  uiLanguageLabels,
} from '@/store/languageStore';
import { useT } from '@/utils/i18n';

const uiLanguages: Array<{ code: UiLanguage; label: string; description: string }> = [
  { code: 'ko', label: uiLanguageLabels.ko, description: '한국어' },
  { code: 'en', label: uiLanguageLabels.en, description: 'English' },
  { code: 'ja', label: uiLanguageLabels.ja, description: '日本語' },
  { code: 'zh', label: uiLanguageLabels.zh, description: '中文' },
  { code: 'vi', label: uiLanguageLabels.vi, description: 'Tiếng Việt' },
];

const contentLanguages: Array<{ code: ContentLanguage; label: string; description: string }> = [
  { code: 'en', label: contentLanguageLabels.en, description: 'English' },
  { code: 'ja', label: contentLanguageLabels.ja, description: '日本語' },
  { code: 'zh', label: contentLanguageLabels.zh, description: '中文' },
  { code: 'vi', label: contentLanguageLabels.vi, description: 'Tiếng Việt' },
];

export default function LanguageSettingsScreen() {
  const router = useRouter();
  const t = useT();
  const {
    uiLanguage,
    contentLanguage,
    contentTranslationEnabled,
    setUiLanguage,
    setContentLanguage,
    setContentTranslationEnabled,
  } = useLanguageStore();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title={t('languageSettings')} subtitle={t('languageSettingsSubtitle')} showBell={false} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.note}>
          <MaterialIcons name="translate" size={22} color={colors.navyDeep} />
          <Text style={styles.noteText}>
            {t('uiLanguageDescription')}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('uiLanguage')}</Text>
          {uiLanguages.map((language) => (
            <LanguageRow
              key={language.code}
              title={language.label}
              description={language.description}
              active={uiLanguage === language.code}
              onPress={() => setUiLanguage(language.code)}
            />
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('contentTranslation')}</Text>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setContentTranslationEnabled(!contentTranslationEnabled)}
          >
            <View style={styles.languageText}>
              <Text style={styles.languageTitle}>
                {contentTranslationEnabled ? t('translationOn') : t('translationOff')}
              </Text>
              <Text style={styles.languageDescription}>{t('contentTranslationDescription')}</Text>
            </View>
            <View style={[styles.switchTrack, contentTranslationEnabled && styles.switchTrackActive]}>
              <View style={[styles.switchKnob, contentTranslationEnabled && styles.switchKnobActive]} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('contentTranslationLanguage')}</Text>
          {contentLanguages.map((language) => (
            <LanguageRow
              key={language.code}
              title={language.label}
              description={language.description}
              active={contentLanguage === language.code}
              onPress={() => setContentLanguage(language.code)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={() => router.back()}>
          <Text style={styles.doneText}>{t('done')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function LanguageRow({
  title,
  description,
  active,
  onPress,
}: {
  title: string;
  description: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.languageRow} onPress={onPress}>
      <View style={styles.languageText}>
        <Text style={styles.languageTitle}>{title}</Text>
        <Text style={styles.languageDescription}>{description}</Text>
      </View>
      <View style={[styles.radio, active && styles.radioActive]}>
        {active ? <MaterialIcons name="check" size={16} color={colors.canvas} /> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, flex: 1 },
  content: { gap: 16, padding: 16, paddingBottom: 28 },
  note: {
    alignItems: 'flex-start',
    backgroundColor: colors.goldPale,
    borderRadius: 14,
    flexDirection: 'row',
    gap: 10,
    padding: 14,
  },
  noteText: { color: colors.inkDeep, flex: 1, fontSize: 14, lineHeight: 21 },
  card: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardTitle: {
    color: colors.inkDeep,
    fontSize: 18,
    fontWeight: '900',
    padding: 16,
    paddingBottom: 8,
  },
  languageRow: {
    alignItems: 'center',
    borderTopColor: colors.borderSoft,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  toggleRow: {
    alignItems: 'center',
    borderTopColor: colors.borderSoft,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  languageText: { flex: 1, gap: 3 },
  languageTitle: { color: colors.inkDeep, fontSize: 16, fontWeight: '900' },
  languageDescription: { color: colors.inkMuted, fontSize: 13, lineHeight: 18 },
  radio: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  radioActive: { backgroundColor: colors.navyDeep, borderColor: colors.navyDeep },
  switchTrack: {
    backgroundColor: colors.border,
    borderRadius: 999,
    height: 30,
    justifyContent: 'center',
    padding: 3,
    width: 52,
  },
  switchTrackActive: { backgroundColor: colors.navyDeep },
  switchKnob: {
    backgroundColor: colors.canvas,
    borderRadius: 12,
    height: 24,
    width: 24,
  },
  switchKnobActive: { transform: [{ translateX: 22 }] },
  doneButton: {
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    borderRadius: 14,
    padding: 16,
  },
  doneText: { color: colors.canvas, fontSize: 16, fontWeight: '900' },
});
