import { StyleSheet, ScrollView, Linking, Pressable, SafeAreaView } from 'react-native';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react-native';

import { Text, View } from '@/components/Themed';

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    type: 'religious' | 'educational' | 'community' | 'youth';
}

const EventsScreen = () => {
    const events: Event[] = [
        {
            id: '1',
            title: 'Friday Jummah Prayer',
            date: 'Every Friday',
            time: '1:30 PM',
            location: 'IALFM Masjid',
            description: 'Weekly congregational prayer with khutbah (sermon). Please arrive early for better seating.',
            type: 'religious',
        },
        {
            id: '2',
            title: 'Quran Study Circle',
            date: 'Every Sunday',
            time: '2:00 PM - 3:30 PM',
            location: 'IALFM Masjid',
            description: 'Weekly Quran study and discussion session for all community members.',
            type: 'educational',
        },
        {
            id: '3',
            title: 'Youth Program',
            date: 'Every Saturday',
            time: '10:00 AM - 12:00 PM',
            location: 'IALFM Masjid',
            description: 'Educational and recreational activities for youth ages 13-18.',
            type: 'youth',
        },
        {
            id: '4',
            title: 'Community Iftar',
            date: 'During Ramadan',
            time: 'Maghrib Time',
            location: 'IALFM Masjid',
            description: 'Community gathering to break fast together during the holy month of Ramadan.',
            type: 'community',
        },
        {
            id: '5',
            title: 'Islamic History Lecture',
            date: 'First Saturday of Month',
            time: '7:00 PM - 8:30 PM',
            location: 'IALFM Masjid',
            description: 'Monthly educational lecture on Islamic history and culture.',
            type: 'educational',
        },
        {
            id: '6',
            title: 'Sisters\' Program',
            date: 'Every Wednesday',
            time: '7:00 PM - 8:30 PM',
            location: 'IALFM Masjid',
            description: 'Weekly program for sisters including Quran study and community discussions.',
            type: 'educational',
        },
    ];

    const getEventTypeColor = (type: string) => {
        switch (type) {
            case 'religious':
                return '#2E8B57';
            case 'educational':
                return '#4A90E2';
            case 'community':
                return '#FF9800';
            case 'youth':
                return '#9C27B0';
            default:
                return '#666';
        }
    };

    const getEventTypeLabel = (type: string) => {
        switch (type) {
            case 'religious':
                return 'Religious';
            case 'educational':
                return 'Educational';
            case 'community':
                return 'Community';
            case 'youth':
                return 'Youth';
            default:
                return 'Event';
        }
    };

    const openWebsite = () => {
        Linking.openURL('https://ialfm.org');
    };

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Calendar size={32} color="white" />
                    <Text style={styles.headerTitle}>Events & Programs</Text>
                    <Text style={styles.headerSubtitle}>IALFM Community Activities</Text>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>Stay Updated</Text>
                    <Text style={styles.infoText}>
                        Events and programs are regularly updated on our website, newsletter, and community WhatsApp group.
                    </Text>
                    <Pressable style={styles.websiteButton} onPress={openWebsite}>
                        <ExternalLink size={20} color="#2E8B57" />
                        <Text style={styles.websiteButtonText}>Visit Website for Latest Updates</Text>
                    </Pressable>
                </View>

                <View style={styles.eventsSection}>
                    <Text style={styles.sectionTitle}>Regular Events & Programs</Text>

                    {events.map((event) => (
                        <View key={event.id} style={styles.eventCard}>
                            <View style={styles.eventHeader}>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                <View
                                    style={[
                                        styles.eventType,
                                        { backgroundColor: getEventTypeColor(event.type) }
                                    ]}
                                >
                                    <Text style={styles.eventTypeText}>
                                        {getEventTypeLabel(event.type)}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.eventDetails}>
                                <View style={styles.eventDetailRow}>
                                    <Calendar size={16} color="#666" />
                                    <Text style={styles.eventDetailText}>{event.date}</Text>
                                </View>

                                <View style={styles.eventDetailRow}>
                                    <Clock size={16} color="#666" />
                                    <Text style={styles.eventDetailText}>{event.time}</Text>
                                </View>

                                <View style={styles.eventDetailRow}>
                                    <MapPin size={16} color="#666" />
                                    <Text style={styles.eventDetailText}>{event.location}</Text>
                                </View>
                            </View>

                            <Text style={styles.eventDescription}>{event.description}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.registrationSection}>
                    <Text style={styles.registrationTitle}>Program Registration</Text>
                    <Text style={styles.registrationText}>
                        <Text style={styles.bold}>Quran School:</Text> Registration for new academic year opens in late July/August.{'\n\n'}
                        <Text style={styles.bold}>Sunday School:</Text> Registration typically opens before the academic year begins.{'\n\n'}
                        For program registration and more information, please visit our website or contact the masjid directly.
                    </Text>
                </View>

                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Event Information</Text>
                    <Text style={styles.contactText}>
                        For specific event details, schedule changes, or to organize community events:
                    </Text>
                    <Text style={styles.contactInfo}>
                        📧 Email: info@ialfm.org{'\n'}
                        🌐 Website: ialfm.org{'\n'}
                        📱 Follow us on Facebook @IALFMMasjid
                    </Text>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default EventsScreen;

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
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'white',
        opacity: 0.9,
        marginTop: 5,
    },
    infoSection: {
        backgroundColor: 'white',
        margin: 15,
        padding: 20,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 15,
    },
    websiteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f0f8f0',
        borderRadius: 8,
    },
    websiteButtonText: {
        fontSize: 16,
        color: '#2E8B57',
        marginLeft: 10,
        fontWeight: '500',
    },
    eventsSection: {
        margin: 15,
        marginTop: 0,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 15,
        paddingLeft: 10,
        paddingTop: 10,
    },
    eventCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    eventHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    eventType: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    eventTypeText: {
        fontSize: 12,
        color: 'white',
        fontWeight: '500',
    },
    eventDetails: {
        marginBottom: 15,
    },
    eventDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    eventDetailText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },
    eventDescription: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
    registrationSection: {
        backgroundColor: '#e3f2fd',
        margin: 15,
        marginTop: 0,
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#4A90E2',
    },
    registrationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A90E2',
        marginBottom: 10,
    },
    registrationText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    bold: {
        fontWeight: 'bold',
    },
    contactSection: {
        backgroundColor: 'white',
        margin: 15,
        marginTop: 0,
        padding: 20,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 10,
    },
    contactText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 10,
    },
    contactInfo: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
});
