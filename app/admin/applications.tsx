// app/admin/applications.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useClubApplicationStore } from "@/store/clubApplicationStore";
import { useUserStore } from "@/store/userStore";
import { ClubApplication } from "@/types/clubApplication";

const STATUS_COLOR: Record<string, string> = {
  pending: "#f59e0b",
  approved: "#10b981",
  rejected: "#ef4444",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "심사 중",
  approved: "승인됨",
  rejected: "거절됨",
};

export default function AdminApplicationsScreen() {
  const { clubId } = useLocalSearchParams<{ clubId: string }>();
  const { currentUser } = useUserStore();
  const { getApplicationsByClub, approveApplication, rejectApplication } =
    useClubApplicationStore();

  const [refreshing, setRefreshing] = useState(false);
  const applications = getApplicationsByClub(clubId ?? "");

  const handleApprove = (app: ClubApplication) => {
    Alert.alert(
      "승인 확인",
      `${app.applicantName}님의 신청을 승인하시겠습니까?\n\n"축하합니다. ${app.clubName} 가입 완료되었습니다." 알림이 전송됩니다.`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "승인",
          onPress: () => approveApplication(app.id, currentUser?.id ?? "admin"),
        },
      ]
    );
  };

  const handleReject = (app: ClubApplication) => {
    Alert.alert(
      "거절 확인",
      `${app.applicantName}님의 신청을 거절하시겠습니까?\n\n"${app.clubName}에 지원해주셔서 감사합니다. 아쉽지만 다음 기회에 도전해주세요." 알림이 전송됩니다.`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "거절",
          style: "destructive",
          onPress: () => rejectApplication(app.id, currentUser?.id ?? "admin"),
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: ClubApplication }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.applicantName}>{item.applicantName}</Text>
          <Text style={styles.applicantEmail}>{item.applicantEmail}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: STATUS_COLOR[item.status] + "20" },
          ]}
        >
          <Text style={[styles.statusText, { color: STATUS_COLOR[item.status] }]}>
            {STATUS_LABEL[item.status]}
          </Text>
        </View>
      </View>

      <Text style={styles.date}>
        신청일: {new Date(item.appliedAt).toLocaleDateString("ko-KR")}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>지원 동기</Text>
        <Text style={styles.sectionContent}>{item.motivation}</Text>
      </View>

      {!!item.experience && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>관련 경험</Text>
          <Text style={styles.sectionContent}>{item.experience}</Text>
        </View>
      )}

      {!!item.availability && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>활동 가능 시간</Text>
          <Text style={styles.sectionContent}>{item.availability}</Text>
        </View>
      )}

      {item.status === "pending" && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => handleReject(item)}
          >
            <Text style={styles.rejectText}>❌ 거절</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.approveButton}
            onPress={() => handleApprove(item)}
          >
            <Text style={styles.approveText}>✅ 승인</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>가입 신청 관리</Text>
      <Text style={styles.subHeader}>
        총 {applications.length}건 ·{" "}
        {applications.filter((a) => a.status === "pending").length}건 심사 중
      </Text>

      <FlatList
        data={applications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>신청서가 없습니다.</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(false)}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a2e",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 4,
  },
  subHeader: {
    fontSize: 13,
    color: "#888",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  list: { padding: 16, gap: 14 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  applicantName: { fontSize: 16, fontWeight: "700", color: "#1a1a2e" },
  applicantEmail: { fontSize: 12, color: "#888", marginTop: 2 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: { fontSize: 12, fontWeight: "600" },
  date: { fontSize: 12, color: "#aaa", marginBottom: 12 },
  section: { marginBottom: 10 },
  sectionTitle: { fontSize: 12, fontWeight: "600", color: "#666", marginBottom: 4 },
  sectionContent: { fontSize: 14, color: "#333", lineHeight: 20 },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  approveButton: {
    flex: 1,
    backgroundColor: "#d1fae5",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  approveText: { color: "#065f46", fontWeight: "700", fontSize: 14 },
  rejectButton: {
    flex: 1,
    backgroundColor: "#fee2e2",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  rejectText: { color: "#991b1b", fontWeight: "700", fontSize: 14 },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyText: { color: "#aaa", fontSize: 15 },
});
