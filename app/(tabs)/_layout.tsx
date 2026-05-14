import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NAVY = '#1A2E5A';
const MUTED = '#94A3B8';

function FABButton({ onPress }: { onPress?: () => void }) {
  return (
    <TouchableOpacity style={s.fabWrapper} onPress={onPress} activeOpacity={0.85}>
      <View style={s.fabCircle}>
        <MaterialIcons name="add" size={28} color="#fff" />
      </View>
      <Text style={s.fabLabel}>만들기</Text>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: s.tabBar,
        tabBarActiveTintColor: NAVY,
        tabBarInactiveTintColor: MUTED,
        tabBarLabelStyle: s.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '탐색',
          tabBarIcon: ({ color }) => <MaterialIcons name="explore" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: '만들기',
          tabBarButton: (props) => <FABButton onPress={props.onPress ?? undefined} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: '채팅',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="chat-bubble-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '프로필',
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const s = StyleSheet.create({
  tabBar: {
    height: 83,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEF2F7',
    paddingTop: 8,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 10,
  },
  tabLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  fabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 0,
  },
  fabCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: NAVY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  fabLabel: {
    fontSize: 11,
    color: MUTED,
    fontWeight: '600',
    marginTop: 4,
  },
});
