import React from 'react';
import { StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { Users, Heart, Calendar, GraduationCap } from 'lucide-react-native';
import MenuItem from '@/components/MenuBox';
import Colors from '@/constants/Colors';


const MenuScreen: React.FC = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const menuItems = [
    {
      title: 'Community',
      description: 'Connect with our Islamic community',
      icon: <Users size={32} color="#fff" />,
      route: '/(tabs)/(menu)/community',
    },
    {
      title: 'Donate',
      description: 'Support our mosque and programs',
      icon: <Heart size={32} color="#fff" />,
      route: '/(tabs)/(menu)/donate',
    },
    {
      title: 'Events',
      description: 'Upcoming events and activities',
      icon: <Calendar size={32} color="#fff" />,
      route: '/(tabs)/(menu)/events',
    },
    {
      title: 'Programs',
      description: 'Educational and religious programs',
      icon: <GraduationCap size={32} color="#fff" />,
      route: '/(tabs)/(menu)/programs',
    },
  ];

  const handleMenuPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Menu</Text>
        <Text style={[styles.headerSubtitle, { color: colors.text + '80' }]}>
          Explore our services and programs
        </Text>
      </View>

      <View style={[styles.menuGrid, { backgroundColor: colors.background }]}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            route={item.route}
            onPress={() => handleMenuPress(item.route)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
});

export default MenuScreen;