import { StyleSheet, ScrollView, Linking, Modal, Dimensions, Image } from 'react-native';
import { MapPin, Phone, Mail, ExternalLink, X } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

interface ProgramCarouselItem {
  id: string;
  title: string;
  description: string;
  image: any; // Use any for require() images
}

const HomeScreen = () => {
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const router = useRouter();
  const progress = useSharedValue<number>(0);
  const screenWidth = Dimensions.get('window').width;
  const carouselItems: ProgramCarouselItem[] = [
    {
      id: '1',
      title: 'Friday Jummah Prayers',
      description: 'Attend our weekly Jummah prayers every Friday.',
      image: require('@/assets/images/jummah.jpg'),
    },
    {
      id: '2',
      title: 'Quran School',
      description: 'Enroll your children in our Quran school.',
      image: require('@/assets/images/quranClasses.jpg'),
    },
    {
      id: '3',
      title: 'Sunday School',
      description: 'Educational programs for children and youth.',
      image: require('@/assets/images/sundarySchool.jpg'),
    },
    {
      id: '4',
      title: 'Pillars Academy',
      description: 'Comprehensive Islamic education and character development.',
      image: require('@/assets/images/pillarsAcademy.png'),
    },
    {
      id: '5',
      title: 'Join Our Team',
      description: 'We are hiring! Explore opportunities to serve our community.',
      image: require('@/assets/images/weAreHiring.jpg'),
    },
  ];

  const openWebsite = () => {
    Linking.openURL('https://www.ialfm.org/');
  };

  const viewPrayerTimes = () => {
    router.navigate('/prayer-times');
  };

  const openMaps = () => {
    Linking.openURL('https://maps.google.com/?q=Islamic+Association+of+Lewisville+and+Flower+Mound');
  };

  const callMasjid = () => {
    alert('No phone number available for this demo.');
    // Uncomment the line below to enable calling functionality
    // Linking.openURL('tel:+19727236335');
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
      <View style={styles.heroSection}>
        <Image source={require('@/assets/images/headerImage.png')} style={styles.heroImage} resizeMode="cover" />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Welcome to IALFM</Text>
          <Text style={styles.heroSubtitle}>Building a Strong Muslim Community</Text>
        </View>
      </View>

      <View style={styles.carouselContainer}>
        <Carousel
          autoPlay={true}
          autoPlayInterval={3000}
          data={carouselItems}
          height={300}
          loop
          pagingEnabled
          snapEnabled
          width={screenWidth - 30}
          mode='parallax'
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          onProgressChange={progress}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image source={item.image} style={styles.carouselImage} resizeMode="cover" />
              <Text style={styles.carouselTitle}>{item.title}</Text>
              <Text style={styles.carouselDescription}>{item.description}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Pressable style={styles.quickAction} onPress={() => router.navigate('/is-offline')}>
          <Text style={styles.quickActionText}>Check Internet Status</Text>
        </Pressable>


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
    position: 'relative',
    backgroundColor: '#2E8B57',
    padding: 30,
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'relative',
    zIndex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(46, 139, 87, 0.8)',
    padding: 10,
    borderRadius: 10,
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
  carouselContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    margin: 10,
    padding: 20,
    minHeight: 280,
    maxHeight: 320,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57',
    textAlign: 'center',
    marginBottom: 10,
  },
  carouselDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  carouselImage: {
    width: '100%',
    height: 120,
    maxHeight: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  featuredSection: {
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
  featuredImage: {
    width: '100%',
    height: 200,
    maxHeight: 250,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  featuredDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'left',
    marginBottom: 20,
  },
  learnMoreButton: {
    backgroundColor: '#2E8B57',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  learnMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  hiringSection: {
    padding: 20,
    backgroundColor: '#fff8f0',
    margin: 15,
    marginTop: 0,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f0e6d6',
  },
  heroSection: {
    position: 'relative',
    height: 200,
    maxHeight: 250,
    margin: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    maxHeight: 250,
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(46, 139, 87, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
});
