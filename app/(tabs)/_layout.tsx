import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Clock, BookOpen, Grid2X2 } from 'lucide-react-native';

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
          tabBarIcon: ({ color }) => <TabBarIcon Icon={BookOpen} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <TabBarIcon Icon={Grid2X2} color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
