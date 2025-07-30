import { StyleSheet, ScrollView, Linking, Modal, SafeAreaView, Dimensions, ImageBackground } from 'react-native';
import { MapPin, Phone, Mail, ExternalLink, X, Car } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import Carousel, {
  ICarouselInstance,
} from "react-native-reanimated-carousel";
import { announcements } from './(menu)/announcements'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

interface CarouselItem {
  title: string;
  description: string;
  image: string;
};

const carouselItems: CarouselItem[] = [
  {
    title: 'Daily Five Prayers',
    description: 'Join us for the five daily prayers held at the masjid throughout the day.',
    image: 'https://placeimg.com/640/360/any',
  },
  {
    title: 'Friday Jummah Prayers',
    description: 'Attend our weekly Friday Jummah prayers and khutbah.',
    image: 'https://placeimg.com/640/360/people',
  },
  {
    title: 'Quran School',
    description: 'Enroll your children in our Quran School for structured Quranic education.',
    image: 'https://placeimg.com/640/360/education',
  },
  {
    title: 'Sunday School',
    description: 'Our Sunday School offers Islamic education for kids every Sunday morning.',
    image: require('../../assets/images/sunday-school.jpg'),
  },
  {
    title: 'Youth Programs',
    description: 'Participate in youth programs designed for spiritual and social growth.',
    image: 'https://placeimg.com/640/360/youth',
  },
  {
    title: 'Educational Programs',
    description: 'Benefit from our educational programs for all ages and backgrounds.',
    image: 'https://placeimg.com/640/360/tech',
  },
  {
    title: 'Community Events',
    description: 'Join our community events and stay connected with fellow members.',
    image: require('../../assets/images/header.png'),
  },
];

const HomeScreen = () => {
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const router = useRouter();

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
    Linking.openURL('tel:+19727236335');
  };

  const emailMasjid = () => {
    setEmailModalVisible(true);
  };

  const openGmail = () => {
    Linking.openURL('https://mail.google.com/mail/?view=cm&to=info@ialfm.org');
  };

  const openMailto = () => {
    Linking.openURL('mailto:info@ialfm.org');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <ImageBackground
          source={require('@/assets/images/header.png')}
          style={styles.header}
          imageStyle={{ resizeMode: 'cover' }}
        >
          <Text style={styles.title}>IALFM</Text>
          <Text style={[styles.subtitle, { textAlign: 'center' }]}>Welcome to the Islamic Association of Lewisville and Flower Mound</Text>
        </ImageBackground>

        {/* Carousel Section */}
        <View style={styles.carouselContainer}>
          {(() => {
            const [currentIndex, setCurrentIndex] = useState(0);
            const [autoPlay, setAutoPlay] = useState(true);
            const carouselRef = useRef<ICarouselInstance | null>(null);
            const autoPlayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

            // Handler for manual scroll
            const handleSnapToItem = (index: number) => {
              setCurrentIndex(index);
              setAutoPlay(false);
              if (autoPlayTimeout.current) clearTimeout(autoPlayTimeout.current);
              // Resume auto play after 3 seconds
              autoPlayTimeout.current = setTimeout(() => {
                setAutoPlay(true);
              }, 3000);
            };

            return (
              <>
                <Carousel
                  ref={carouselRef}
                  loop
                  width={400}
                  height={400}
                  data={carouselItems}
                  scrollAnimationDuration={1200}
                  autoPlay={autoPlay}
                  autoPlayInterval={3500}
                  renderItem={({ item }) => (
                    <View style={styles.carouselItem}>
                      {typeof item.image === 'string' ? (
                        <ImageBackground
                          source={{ uri: item.image }}
                          style={styles.carouselImage}
                          imageStyle={{ borderRadius: 20 }}
                        />
                      ) : (
                        <ImageBackground
                          source={item.image}
                          style={styles.carouselImage}
                          imageStyle={{ borderRadius: 20 }}
                        />
                      )}
                      <Text style={styles.carouselTitle}>{item.title}</Text>
                      <Text style={styles.carouselDescription}>{item.description}</Text>
                    </View>
                  )}
                  mode="parallax"
                  onSnapToItem={handleSnapToItem}
                />
                {/* Pagination removed as requested */}
              </>
            );
          })()}
        </View>

        {/* Announcement Glimpse */}
        {announcements && announcements.length > 0 && (
          <View style={[styles.section, { marginBottom: 20 }]}>
            <Text style={styles.announcementGlimpseTitle}>Latest Announcement</Text>
            <Text style={styles.announcementGlimpseText} numberOfLines={2} ellipsizeMode="tail">
              {announcements[0].content.slice(0, 120).replace(/\n/g, ' ')}{announcements[0].content.length > 120 ? '...' : ''}
            </Text>
            <Pressable
              style={{ marginTop: 8, alignSelf: 'flex-end', backgroundColor: '#ffe58f', borderRadius: 6, paddingVertical: 4, paddingHorizontal: 12 }}
              onPress={() => {
                router.push('/(tabs)/(menu)/announcements');
              }}
            >
              <Text style={{ color: '#ad8b00', fontWeight: 'bold', fontSize: 14 }}>Show more</Text>
            </Pressable>
          </View>
        )}

        {/* View Events/Programs Via Calender */}
        <View style={styles.section}>
          <Calendar
            onDayPress={day => {
              console.log('selected day', day);
            }}
          />
        </View>

        <Pressable style={styles.quickAction} onPress={viewPrayerTimes}>
          <View><ExternalLink size={20} color="#2E8B57" /></View>
          <Text style={styles.quickActionText}>View Prayer Times</Text>
        </Pressable>

        <Pressable style={styles.quickAction} onPress={openWebsite}>
          <View><ExternalLink size={20} color="#2E8B57" /></View>
          <Text style={styles.quickActionText}>Visit Website</Text>
        </Pressable>

        <Pressable style={styles.quickAction} onPress={openMaps}>
          <View><MapPin size={20} color="#2E8B57" /></View>
          <Text style={styles.quickActionText}>Get Directions</Text>
        </Pressable>

        <Pressable style={styles.quickAction} onPress={callMasjid}>
          <View><Phone size={20} color="#2E8B57" /></View>
          <Text style={styles.quickActionText}>Call Masjid</Text>
        </Pressable>

        <Pressable style={styles.quickAction} onPress={emailMasjid}>
          <View><Mail size={20} color="#2E8B57" /></View>
          <Text style={styles.quickActionText}>Email Us</Text>
        </Pressable>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.contactItem}>
            <View><Mail size={18} color="#2E8B57" /></View>
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>info@ialfm.org</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <View><Phone size={18} color="#2E8B57" /></View>
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>(972) 723-6335</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <View><ExternalLink size={18} color="#2E8B57" /></View>
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
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#f8f9fa',
    paddingBottom: 30,
    minHeight: Dimensions.get('window').height,
  },
  header: {
    padding: 30,
    alignItems: 'center',
    height: 180,
    width: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 32,
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
  announcementGlimpse: {
    backgroundColor: '#fffbe6',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 18,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ffe58f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1,
  },
  announcementGlimpseTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ad8b00',
    marginBottom: 4,
  },
  announcementGlimpseText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 2,
  },
  announcementGlimpseDate: {
    fontSize: 13,
    color: '#b7a200',
    fontStyle: 'italic',
  },
  carouselContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // No padding here
  },
  carouselItem: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    marginHorizontal: 10,
    width: 340,
    height: 340,
  },
  carouselImage: {
    width: 300,
    height: 180,
    borderRadius: 20,
    marginBottom: 18,
    backgroundColor: '#e9ecef',
    overflow: 'hidden',
    // No padding here
  },
  carouselTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 8,
    textAlign: 'center',
  },
  carouselDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
});