import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function CreateScreen() {
  return (
    <SafeAreaView style={s.container}>
      <View style={s.content}>
        <View style={s.iconCircle}>
          <MaterialIcons name="add" size={40} color="#fff" />
        </View>
        <Text style={s.title}>새 게시물 만들기</Text>
        <Text style={s.sub}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fbf8fd' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#1A2E5A',
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: '700', color: '#1A2E5A' },
  sub: { fontSize: 14, color: '#718096' },
});
