import { StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react-native';

import { Text, View } from '@/components/Themed';

export default function HomeScreen() {
  const openWebsite = () => {
    Linking.openURL('https://ialfm.org');
  };

  const openMaps = () => {
    Linking.openURL('https://maps.google.com/?q=Islamic+Association+of+Lewisville+and+Flower+Mound');
  };

  const callMasjid = () => {
    Linking.openURL('tel:+19727236335');
  };

  const emailMasjid = () => {
    Linking.openURL('mailto:info@ialfm.org');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Islamic Association of{'\n'}Lewisville & Flower Mound</Text>
        <Text style={styles.subtitle}>IALFM Masjid</Text>
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to IALFM</Text>
        <Text style={styles.welcomeText}>
          Alhumdulillah, after the successful completion of construction of our New IALFM Masjid building in 2021,
          we have been using it regularly for Friday prayers and community activities.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.quickAction} onTouchEnd={openWebsite}>
          <ExternalLink size={20} color="#2E8B57" />
          <Text style={styles.quickActionText}>Visit Website</Text>
        </View>

        <View style={styles.quickAction} onTouchEnd={openMaps}>
          <MapPin size={20} color="#2E8B57" />
          <Text style={styles.quickActionText}>Get Directions</Text>
        </View>

        <View style={styles.quickAction} onTouchEnd={callMasjid}>
          <Phone size={20} color="#2E8B57" />
          <Text style={styles.quickActionText}>Call Masjid</Text>
        </View>

        <View style={styles.quickAction} onTouchEnd={emailMasjid}>
          <Mail size={20} color="#2E8B57" />
          <Text style={styles.quickActionText}>Email Us</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services & Facilities</Text>
        <Text style={styles.serviceItem}>• Daily Five Prayers</Text>
        <Text style={styles.serviceItem}>• Friday Jummah Prayers</Text>
        <Text style={styles.serviceItem}>• Quran School</Text>
        <Text style={styles.serviceItem}>• Sunday School</Text>
        <Text style={styles.serviceItem}>• Youth Programs</Text>
        <Text style={styles.serviceItem}>• Educational Programs</Text>
        <Text style={styles.serviceItem}>• Community Events</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.contactText}>Email: info@ialfm.org</Text>
        <Text style={styles.contactText}>Website: ialfm.org</Text>
        <Text style={styles.contactText}>
          Follow us on Facebook @IALFMMasjid for updates and announcements
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2E8B57',
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  section: {
    padding: 20,
    backgroundColor: 'white',
    margin: 15,
    marginTop: 0,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 15,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f0f8f0',
    borderRadius: 8,
    marginBottom: 10,
  },
  quickActionText: {
    fontSize: 16,
    color: '#2E8B57',
    marginLeft: 12,
    fontWeight: '500',
  },
  serviceItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
});
