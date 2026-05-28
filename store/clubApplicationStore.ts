// app/club/[id]/apply.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useClubApplicationStore } from "@/store/clubApplicationStore";
import { useUserStore } from "@/store/userStore"; // 기존 사용자 스토어

export default function ClubApplyScreen() {
  const { id: clubId, name: clubName } = useLocalSearchParams<{
    id: string;
    name: string;
  }>();
  const router = useRouter();
  const { currentUser } = useUserStore();
  const { submitApplication, hasApplied } = useClubApplicationStore();

  const [motivation, setMotivation] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const alreadyApplied = hasApplied(currentUser?.id ?? "", clubId ?? "");

  const handleSubmit = async () => {
    if (!motivation.trim()) {
      Alert.alert("알림", "지원 동기를 입력해 주세요.");
      return;
    }
    if (!currentUser) return;

    setSubmitting(true);
    try {
      // 신청서 제출 + 관리자 알림 자동 발송
      submitApplication({
        clubId: clubId!,
        clubName: clubName ?? "동아리",
        applicantId: currentUser.id,
        applicantName: currentUser.name,
        applicantEmail: currentUser.email,
        motivation,
        experience,
        availability,
      });

      Alert.alert(
        "신청 완료",
        "가입 신청서가 제출되었습니다.\n심사 후 결과를 알림으로 알려드립니다.",
        [{ text: "확인", onPress: () => router.back() }]
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (alreadyApplied) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.alreadyAppliedText}>
          이미 가입 신청서를 제출하셨습니다.{"\n"}심사 결과를 기다려 주세요.
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>돌아가기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.header}>{clubName} 가입 신청</Text>

      {/* 지원 동기 */}
      <Text style={styles.label}>
        지원 동기 <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.textarea}
        placeholder="이 동아리에 지원하는 이유를 적어주세요."
        value={motivation}
        onChangeText={setMotivation}
        multiline
        numberOfLines={4}
        maxLength={500}
      />
      <Text style={styles.charCount}>{motivation.length}/500</Text>

      {/* 관련 경험 */}
      <Text style={styles.label}>관련 경험 (선택)</Text>
      <TextInput
        style={styles.textarea}
        placeholder="관련 경험이나 기술을 적어주세요."
        value={experience}
        onChangeText={setExperience}
        multiline
        numberOfLines={3}
        maxLength={300}
      />

      {/* 활동 가능 시간 */}
      <Text style={styles.label}>활동 가능 시간 (선택)</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 월/수 오후 6시, 주말 오전"
        value={availability}
        onChangeText={setAvailability}
        maxLength={100}
      />

      <TouchableOpacity
        style={[styles.submitButton, submitting && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>신청서 제출하기</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 24, color: "#1a1a2e" },
  label: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 6 },
  required: { color: "#e74c3c" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
    textAlignVertical: "top",
    marginBottom: 4,
    backgroundColor: "#fafafa",
  },
  charCount: {
    fontSize: 11,
    color: "#aaa",
    textAlign: "right",
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#4f46e5",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 40,
  },
  disabledButton: { backgroundColor: "#a5b4fc" },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  alreadyAppliedText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    lineHeight: 26,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
  },
  backButtonText: { color: "#fff", fontWeight: "600" },
});
