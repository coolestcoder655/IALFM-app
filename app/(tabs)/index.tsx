import { StyleSheet, ScrollView, Linking, Modal, Alert } from 'react-native';
import { MapPin, Phone, Mail, ExternalLink, X } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const router = useRouter();

  const openWebsite = () => {
    Linking.openURL('https://www.ialfm.org/');
  };

  const viewPrayerTimes = () => {
    router.navigate('/prayer-times');
  }


  const openMaps = () => {
    Linking.openURL('https://maps.google.com/?q=Islamic+Association+of+Lewisville+and+Flower+Mound');
  };

  const callMasjid = () => {
    Linking.openURL('tel:+19727236335');
  };

  const emailMasjid = () => {
    setEmailModalVisible(true);
  };

  const openGmail = () => {
    Linking.openURL('https://mail.google.com/mail/?view=cm&to=info@ialfm.org')
    setEmailModalVisible(false);
  };

  const openMailto = () => {
    Linking.openURL('mailto:info@ialfm.org');
    setEmailModalVisible(false);
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
          Alhumdulillah, after the successful completion of construction of our new IALFM Masjid building in 2021,
          we have been using it regularly for Friday prayers and community activities.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <Pressable style={styles.quickAction} onPress={viewPrayerTimes}>
          <ExternalLink size={20} color="#2E8B57" />
          <Text style={styles.quickActionText}>View Prayer Times</Text>
        </Pressable>

        <Pressable style={styles.quickAction} onPress={openWebsite}>
          <ExternalLink size={20} color="#2E8B57" />
          <Text style={styles.quickActionText}>Visit Website</Text>
        </Pressable>

        <Pressable style={styles.quickAction} onPress={openMaps}>
          <MapPin size={20} color="#2E8B57" />
          <Text style={styles.quickActionText}>Get Directions</Text>
        </Pressable>

        <Pressable style={styles.quickAction} onPress={callMasjid}>
          <Phone size={20} color="#2E8B57" />
          <Text style={styles.quickActionText}>Call Masjid</Text>
        </Pressable>

        <Pressable style={styles.quickAction} onPress={emailMasjid}>
          <Mail size={20} color="#2E8B57" />
          <Text style={styles.quickActionText}>Email Us</Text>
        </Pressable>
      </View>

      <View style={styles.servicesCard}>
        <Text style={styles.sectionTitle}>Services & Facilities</Text>
        <View style={styles.servicesList}>
          <View style={styles.serviceRow}>
            <MapPin size={20} color="#2E8B57" style={styles.serviceIcon} />
            <Text style={styles.serviceItemText}>Daily Five Prayers</Text>
          </View>
          <View style={styles.serviceRow}>
            <MapPin size={20} color="#2E8B57" style={styles.serviceIcon} />
            <Text style={styles.serviceItemText}>Friday Jummah Prayers</Text>
          </View>
          <View style={styles.serviceRow}>
            <ExternalLink size={20} color="#2E8B57" style={styles.serviceIcon} />
            <Text style={styles.serviceItemText}>Quran School</Text>
          </View>
          <View style={styles.serviceRow}>
            <ExternalLink size={20} color="#2E8B57" style={styles.serviceIcon} />
            <Text style={styles.serviceItemText}>Sunday School</Text>
          </View>
          <View style={styles.serviceRow}>
            <Phone size={20} color="#2E8B57" style={styles.serviceIcon} />
            <Text style={styles.serviceItemText}>Youth Programs</Text>
          </View>
          <View style={styles.serviceRow}>
            <Phone size={20} color="#2E8B57" style={styles.serviceIcon} />
            <Text style={styles.serviceItemText}>Educational Programs</Text>
          </View>
          <View style={styles.serviceRow}>
            <Mail size={20} color="#2E8B57" style={styles.serviceIcon} />
            <Text style={styles.serviceItemText}>Community Events</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <View style={styles.contactItem}>
          <Mail size={18} color="#2E8B57" />
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>info@ialfm.org</Text>
          </View>
        </View>

        <View style={styles.contactItem}>
          <Phone size={18} color="#2E8B57" />
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>(972) 723-6335</Text>
          </View>
        </View>

        <View style={styles.contactItem}>
          <ExternalLink size={18} color="#2E8B57" />
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactLabel}>Website</Text>
            <Text style={styles.contactValue}>www.ialfm.org</Text>
          </View>
        </View>

        <View style={styles.socialMediaSection}>
          <Text style={styles.socialMediaTitle}>Follow Us</Text>
          <Text style={styles.socialMediaText}>
            Stay updated with our latest announcements and events on Facebook @IALFMMasjid
          </Text>
        </View>
      </View>

      {/* Email Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={emailModalVisible}
        onRequestClose={() => setEmailModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Contact IALFM</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setEmailModalVisible(false)}
              >
                <X size={24} color="#666" />
              </Pressable>
            </View>

            <Text style={styles.modalSubtitle}>Choose how you'd like to email us:</Text>

            <Pressable style={styles.modalOption} onPress={openGmail}>
              <Mail size={20} color="#EA4335" />
              <Text style={styles.modalOptionText}>Open in Gmail</Text>
            </Pressable>

            <Pressable style={styles.modalOption} onPress={openMailto}>
              <Mail size={20} color="#2E8B57" />
              <Text style={styles.modalOptionText}>Open in Default Email App</Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={() => setEmailModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HomeScreen;

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
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 12,
  },
  contactTextContainer: {
    marginLeft: 15,
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contactLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  socialMediaSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  socialMediaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 8,
  },
  socialMediaText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    minWidth: 300,
    maxWidth: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  closeButton: {
    padding: 5,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    fontWeight: '500',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  servicesCard: {
    backgroundColor: '#f0f8f0',
    margin: 15,
    marginTop: 0,
    borderRadius: 14,
    padding: 22,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e0ece0',
  },
  servicesList: {
    marginTop: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0f8f0',
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
  },
  serviceIcon: {
    marginRight: 14,
  },
  serviceItemText: {
    fontSize: 16,
    color: '#2E8B57',
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});
