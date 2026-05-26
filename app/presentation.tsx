import { MaterialIcons } from '@expo/vector-icons';
import { createElement, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';
import { UiLanguage, useLanguageStore } from '@/store/languageStore';

type DemoStep = 'splash' | 'login' | 'language' | 'home';

const languageOptions: Array<{
  code: UiLanguage;
  label: string;
  nativeLabel: string;
}> = [
  { code: 'ko', label: 'Korean', nativeLabel: '한국어' },
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
  { code: 'zh', label: 'Chinese', nativeLabel: '中文' },
  { code: 'vi', label: 'Vietnamese', nativeLabel: 'Tiếng Việt' },
];

const steps: Array<{ key: DemoStep; label: string }> = [
  { key: 'splash', label: '앱 실행' },
  { key: 'login', label: '로그인' },
  { key: 'language', label: '언어 선택' },
  { key: 'home', label: '홈 화면' },
];

export default function LandingScreen() {
  const [step, setStep] = useState<DemoStep>('splash');
  const { width } = useWindowDimensions();
  const setUiLanguage = useLanguageStore((state) => state.setUiLanguage);
  const selectedLanguage = useLanguageStore((state) => state.uiLanguage);
  const isWide = width >= 980;

  const goNext = () => {
    if (step === 'splash') setStep('login');
    if (step === 'login') setStep('language');
    if (step === 'language') setStep('home');
  };

  const selectLanguage = (language: UiLanguage) => {
    setUiLanguage(language);
    setStep('home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <View style={[styles.shell, isWide && styles.shellWide]}>
          <View style={[styles.story, isWide && styles.storyWide]}>
            <View style={styles.brandRow}>
              <View style={styles.logoMark}>
                <MaterialIcons name="school" size={24} color={colors.navyDeep} />
              </View>
              <Text style={styles.brandText}>UniMeet</Text>
            </View>

            <Text style={styles.headline}>
              동아리 경험을{'\n'}하나의 앱으로
            </Text>
            <Text style={styles.description}>
              내국인 학생과 유학생이 같은 흐름에서 동아리를 찾고, 지원하고,{'\n'}
              알림으로 결과를 확인하는 모바일 동아리 앱입니다.
            </Text>

            <View style={styles.featureGrid}>
              <FeaturePill icon="language" label="다국어 UI" />
              <FeaturePill icon="assignment" label="지원서 제출" />
              <FeaturePill icon="verified-user" label="권한별 화면" />
            </View>

            <View style={styles.timeline}>
              {steps.map((item, index) => {
                const activeIndex = steps.findIndex((current) => current.key === step);
                const isActive = item.key === step;
                const isComplete = index < activeIndex;

                return (
                  <TouchableOpacity
                    key={item.key}
                    style={[
                      styles.timelineItem,
                      isActive && styles.timelineItemActive,
                      isComplete && styles.timelineItemComplete,
                    ]}
                    activeOpacity={0.82}
                    onPress={() => setStep(item.key)}
                  >
                    <Text
                      style={[
                        styles.timelineNumber,
                        (isActive || isComplete) && styles.timelineNumberActive,
                      ]}
                    >
                      {index + 1}
                    </Text>
                    <Text
                      style={[
                        styles.timelineLabel,
                        (isActive || isComplete) && styles.timelineLabelActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.phoneStage}>
            <View style={styles.phone}>
              <View style={styles.phoneSideButtonLeft} />
              <View style={styles.phoneSideButtonRightTop} />
              <View style={styles.phoneSideButtonRightBottom} />
              <View style={styles.phoneCamera} />
              <View style={styles.phoneScreen}>
                {step === 'splash' && <SplashStep onNext={goNext} />}
                {step === 'login' && <LoginStep onNext={goNext} />}
                {step === 'language' && (
                  <LanguageStep
                    selectedLanguage={selectedLanguage}
                    onSelectLanguage={selectLanguage}
                    onNext={goNext}
                  />
                )}
                {step === 'home' && <EmbeddedAppStep />}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeaturePill({ icon, label }: { icon: keyof typeof MaterialIcons.glyphMap; label: string }) {
  return (
    <View style={styles.featurePill}>
      <MaterialIcons name={icon} size={17} color={colors.gold} />
      <Text style={styles.featureText}>{label}</Text>
    </View>
  );
}

function SplashStep({ onNext }: { onNext: () => void }) {
  return (
    <View style={styles.splashScreen}>
      <View style={styles.appLogo}>
        <MaterialIcons name="groups" size={42} color={colors.canvas} />
      </View>
      <Text style={styles.appTitle}>UniMeet</Text>
      <Text style={styles.appSubtitle}>Campus clubs, one connection.</Text>
      <TouchableOpacity style={styles.phonePrimaryButton} activeOpacity={0.86} onPress={onNext}>
        <Text style={styles.phonePrimaryButtonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

function LoginStep({ onNext }: { onNext: () => void }) {
  return (
    <View style={styles.phoneContent}>
      <Text style={styles.phoneEyebrow}>Sunmoon University</Text>
      <Text style={styles.phoneTitle}>학교 이메일로 로그인</Text>
      <Text style={styles.phoneBody}>
        @sunmoon.ac.kr 계정으로 인증하면 동아리 탐색과 지원서 제출을 시작할 수 있습니다.
      </Text>

      <View style={styles.inputMock}>
        <MaterialIcons name="mail-outline" size={18} color={colors.inkMuted} />
        <Text style={styles.inputMockText}>student@sunmoon.ac.kr</Text>
      </View>
      <View style={styles.inputMock}>
        <MaterialIcons name="lock-outline" size={18} color={colors.inkMuted} />
        <Text style={styles.inputMockText}>••••••••</Text>
      </View>

      <TouchableOpacity style={styles.phonePrimaryButton} activeOpacity={0.86} onPress={onNext}>
        <Text style={styles.phonePrimaryButtonText}>로그인</Text>
      </TouchableOpacity>
      <Text style={styles.phoneCaption}>발표용 시연에서는 인증 과정을 빠르게 넘깁니다.</Text>
    </View>
  );
}

function LanguageStep({
  selectedLanguage,
  onSelectLanguage,
  onNext,
}: {
  selectedLanguage: UiLanguage;
  onSelectLanguage: (language: UiLanguage) => void;
  onNext: () => void;
}) {
  return (
    <View style={styles.phoneContent}>
      <Text style={styles.phoneEyebrow}>Language</Text>
      <Text style={styles.phoneTitle}>사용할 언어를 선택하세요</Text>
      <Text style={styles.phoneBody}>
        앱 버튼과 메뉴는 선택한 언어로만 표시하고, 동아리 소개는 원문과 번역을 함께 보여줍니다.
      </Text>

      <View style={styles.languageList}>
        {languageOptions.map((item) => {
          const selected = selectedLanguage === item.code;
          return (
            <TouchableOpacity
              key={item.code}
              style={[styles.languageItem, selected && styles.languageItemActive]}
              activeOpacity={0.82}
              onPress={() => onSelectLanguage(item.code)}
            >
              <View>
                <Text style={[styles.languageNative, selected && styles.languageNativeActive]}>
                  {item.nativeLabel}
                </Text>
                <Text style={styles.languageEnglish}>{item.label}</Text>
              </View>
              {selected && <MaterialIcons name="check-circle" size={22} color={colors.gold} />}
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.phoneSecondaryButton} activeOpacity={0.86} onPress={onNext}>
        <Text style={styles.phoneSecondaryButtonText}>선택 완료</Text>
      </TouchableOpacity>
    </View>
  );
}

function EmbeddedAppStep() {
  if (Platform.OS === 'web') {
    return createElement('iframe', {
      src: '/home',
      title: 'UniMeet app demo',
      style: {
        backgroundColor: colors.surface,
        border: 0,
        height: '100%',
        width: '100%',
      },
    });
  }

  return (
    <View style={styles.phoneContent}>
      <Text style={styles.phoneTitle}>홈 화면</Text>
      <Text style={styles.phoneBody}>웹 시연에서는 이 영역에 실제 앱 화면이 표시됩니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.navyDeep,
    flex: 1,
  },
  page: {
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  shell: {
    alignItems: 'center',
    gap: 28,
    maxWidth: 1240,
    width: '100%',
  },
  shellWide: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  story: {
    alignItems: 'center',
    gap: 18,
    maxWidth: 560,
    width: '100%',
  },
  storyWide: {
    alignItems: 'flex-start',
    flex: 1,
  },
  brandRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  logoMark: {
    alignItems: 'center',
    backgroundColor: colors.goldPale,
    borderRadius: 12,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  brandText: {
    color: colors.canvas,
    fontSize: 22,
    fontWeight: '900',
  },
  headline: {
    color: colors.canvas,
    fontSize: 46,
    fontWeight: '900',
    lineHeight: 54,
    maxWidth: 560,
    textAlign: 'center',
  },
  description: {
    color: colors.goldPale,
    fontSize: 17,
    lineHeight: 27,
    maxWidth: 520,
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  featurePill: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.11)',
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  featureText: {
    color: colors.canvas,
    fontSize: 13,
    fontWeight: '800',
  },
  timeline: {
    gap: 8,
    maxWidth: 420,
    width: '100%',
  },
  timelineItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 11,
  },
  timelineItemActive: {
    backgroundColor: colors.canvas,
  },
  timelineItemComplete: {
    borderColor: colors.gold,
  },
  timelineNumber: {
    color: colors.goldPale,
    fontSize: 13,
    fontWeight: '900',
    width: 20,
  },
  timelineNumberActive: {
    color: colors.gold,
  },
  timelineLabel: {
    color: colors.goldPale,
    fontSize: 14,
    fontWeight: '800',
  },
  timelineLabelActive: {
    color: colors.navyDeep,
  },
  phoneStage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  phone: {
    backgroundColor: '#070B12',
    borderColor: 'rgba(255,255,255,0.32)',
    borderRadius: 54,
    borderWidth: 2,
    height: 900,
    maxHeight: 900,
    maxWidth: 438,
    padding: 12,
    width: '100%',
  },
  phoneCamera: {
    backgroundColor: '#05070B',
    borderColor: '#202939',
    borderRadius: 999,
    borderWidth: 2,
    height: 20,
    left: '50%',
    marginLeft: -10,
    position: 'absolute',
    top: 24,
    width: 20,
    zIndex: 5,
  },
  phoneSideButtonLeft: {
    backgroundColor: '#273142',
    borderRadius: 999,
    height: 86,
    left: -5,
    position: 'absolute',
    top: 154,
    width: 4,
  },
  phoneSideButtonRightTop: {
    backgroundColor: '#273142',
    borderRadius: 999,
    height: 58,
    position: 'absolute',
    right: -5,
    top: 164,
    width: 4,
  },
  phoneSideButtonRightBottom: {
    backgroundColor: '#273142',
    borderRadius: 999,
    height: 78,
    position: 'absolute',
    right: -5,
    top: 246,
    width: 4,
  },
  phoneSpeaker: {
    alignSelf: 'center',
    backgroundColor: '#344054',
    borderRadius: 999,
    height: 5,
    marginBottom: 10,
    width: 70,
  },
  phoneScreen: {
    backgroundColor: colors.surface,
    borderColor: '#182230',
    borderRadius: 44,
    borderWidth: 1,
    flex: 1,
    overflow: 'hidden',
  },
  splashScreen: {
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    flex: 1,
    justifyContent: 'center',
    padding: 28,
  },
  appLogo: {
    alignItems: 'center',
    backgroundColor: colors.gold,
    borderRadius: 26,
    height: 86,
    justifyContent: 'center',
    marginBottom: 18,
    width: 86,
  },
  appTitle: {
    color: colors.canvas,
    fontSize: 38,
    fontWeight: '900',
  },
  appSubtitle: {
    color: colors.goldPale,
    fontSize: 15,
    marginBottom: 34,
    marginTop: 8,
  },
  phoneContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 22,
  },
  phoneAppContent: {
    flex: 1,
    gap: 16,
    padding: 18,
    paddingTop: 28,
  },
  phoneEyebrow: {
    color: colors.gold,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 8,
  },
  phoneTitle: {
    color: colors.inkDeep,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  phoneBody: {
    color: colors.inkMuted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 22,
    marginTop: 10,
  },
  inputMock: {
    alignItems: 'center',
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  inputMockText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  phonePrimaryButton: {
    alignItems: 'center',
    backgroundColor: colors.gold,
    borderRadius: 999,
    justifyContent: 'center',
    marginTop: 14,
    minHeight: 48,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  phonePrimaryButtonText: {
    color: colors.canvas,
    fontSize: 15,
    fontWeight: '900',
  },
  phoneSecondaryButton: {
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    borderRadius: 999,
    justifyContent: 'center',
    marginTop: 12,
    minHeight: 48,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  phoneSecondaryButtonText: {
    color: colors.canvas,
    fontSize: 15,
    fontWeight: '900',
  },
  phoneCaption: {
    color: colors.inkMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 13,
    textAlign: 'center',
  },
  languageList: {
    gap: 8,
  },
  languageItem: {
    alignItems: 'center',
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 13,
  },
  languageItemActive: {
    borderColor: colors.gold,
    borderWidth: 2,
  },
  languageNative: {
    color: colors.inkDeep,
    fontSize: 15,
    fontWeight: '900',
  },
  languageNativeActive: {
    color: colors.gold,
  },
  languageEnglish: {
    color: colors.inkMuted,
    fontSize: 12,
    marginTop: 2,
  },
  miniHeader: {
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  miniGreeting: {
    color: colors.canvas,
    fontSize: 18,
    fontWeight: '900',
  },
  miniSubtext: {
    color: colors.goldPale,
    fontSize: 12,
    marginTop: 5,
  },
  miniBell: {
    alignItems: 'center',
    backgroundColor: colors.goldPale,
    borderRadius: 999,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  miniStats: {
    flexDirection: 'row',
    gap: 8,
  },
  miniStatCard: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    padding: 10,
  },
  miniStatValue: {
    color: colors.inkDeep,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 8,
  },
  miniStatLabel: {
    color: colors.inkMuted,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
  },
  miniSection: {
    gap: 9,
  },
  miniSectionTitle: {
    color: colors.inkDeep,
    fontSize: 17,
    fontWeight: '900',
  },
  miniStatusCard: {
    alignItems: 'center',
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 13,
  },
  miniStatusTitle: {
    color: colors.inkDeep,
    fontSize: 14,
    fontWeight: '900',
  },
  miniStatusDate: {
    color: colors.inkMuted,
    fontSize: 11,
    marginTop: 3,
  },
  miniBadge: {
    backgroundColor: colors.goldPale,
    borderRadius: 999,
    color: colors.navyDeep,
    fontSize: 11,
    fontWeight: '900',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  miniClubCard: {
    backgroundColor: colors.canvas,
    borderColor: colors.borderSoft,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  miniClubImage: {
    alignItems: 'center',
    backgroundColor: colors.navy,
    height: 86,
    justifyContent: 'center',
  },
  miniClubText: {
    gap: 4,
    padding: 12,
  },
  miniClubName: {
    color: colors.inkDeep,
    fontSize: 15,
    fontWeight: '900',
  },
  miniClubTagline: {
    color: colors.inkMuted,
    fontSize: 12,
    lineHeight: 17,
  },
});
