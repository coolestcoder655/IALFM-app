import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Clock, Calendar, BookOpen, Heart, Users, BookText } from 'lucide-react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// Tab bar icon component using Lucide icons
const TabBarIcon = (props: {
  Icon: React.ComponentType<any>;
  color: string;
  size?: number;
}) => {
  const { Icon, color, size = 24 } = props;
  return <Icon size={size} color={color} style={{ marginBottom: -3 }} />;
};

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon Icon={Home} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="prayer-times"
        options={{
          title: 'Prayer Times',
          tabBarIcon: ({ color }) => <TabBarIcon Icon={Clock} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="daily-dua"
        options={{
          title: 'Daily Dua',
          tabBarIcon: ({ color }) => <TabBarIcon Icon={BookText} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <TabBarIcon Icon={Calendar} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="programs"
        options={{
          title: 'Programs',
          tabBarIcon: ({ color }) => <TabBarIcon Icon={BookOpen} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="donate"
        options={{
          title: 'Donate',
          tabBarIcon: ({ color }) => <TabBarIcon Icon={Heart} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color }) => <TabBarIcon Icon={Users} color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
