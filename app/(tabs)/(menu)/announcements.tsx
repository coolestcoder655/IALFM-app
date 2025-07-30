
import { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface Announcement {
    id: number;
    title: string;
    image: any;
    createdAt: Date;
    content: string;
};

export const announcements: Announcement[] = [
    {
        id: 1,
        title: 'Eid Celebration 2025',
        image: require('@/assets/images/header.png'),
        createdAt: new Date('2025-06-06T09:00:00Z'),
        content: `Join us for the Eid celebration at IALFM! Festivities, food, and fun for all ages. The event will start after Eid prayers and will include games, food stalls, and activities for children and adults. Everyone is welcome! Don’t forget to bring your friends and family.

This year, we have arranged a special program for kids, including face painting, a bouncy castle, and storytelling sessions. Delicious food from local vendors will be available throughout the day. Volunteers are welcome to help with setup and activities. Please RSVP on our website to help us plan better. We look forward to celebrating this joyous occasion with you and your loved ones!

In addition to the festivities, there will be a community bazaar featuring local artisans and businesses, offering a variety of products and services. The bazaar is a great opportunity to support small businesses within our community. We will also have a health and wellness booth providing free check-ups and information on healthy living. Our guest speaker, Dr. Amina Siddiqui, will deliver an inspiring talk on the importance of unity and compassion in our community.

Parking will be available at the adjacent lot, and shuttle services will run throughout the day for your convenience. Please arrive early to secure a good spot for the Eid prayer. We encourage everyone to bring reusable water bottles and minimize waste to help us keep the environment clean. Security and first aid volunteers will be present to ensure a safe and enjoyable experience for all attendees.

For those interested in volunteering, please sign up on our website or contact the event coordinator directly. We are grateful for the continued support and enthusiasm of our community members. Let’s make this Eid celebration a memorable and meaningful event for everyone!`,
    },
    {
        id: 2,
        title: 'Sunday School Registration',
        image: require('@/assets/images/sunday-school.jpg'),
        content: `Registration for Sunday School is now open. Classes start September 1st. Please register your children early to reserve a spot. Our curriculum includes Quran, Islamic Studies, and Arabic. For more information, visit our website or contact the office.

We are excited to announce new interactive learning modules and extracurricular activities this year. Our experienced teachers are dedicated to providing a nurturing and educational environment for all students. Parents are encouraged to attend the orientation session on August 25th to meet the teachers and learn more about the program. Scholarships are available for families in need. We look forward to another successful year of learning and growth!

This year, we are introducing a mentorship program where older students can assist younger ones with their studies and participate in leadership workshops. Our Sunday School will also host monthly family nights, featuring guest speakers, group discussions, and fun activities for all ages. The school library has been expanded with new books and resources, and students will have access to digital learning tools to enhance their educational experience.

Parents are encouraged to get involved by joining the PTA or volunteering for classroom activities and field trips. We believe that a strong partnership between parents and teachers is essential for student success. If you have any questions or would like to schedule a tour of our facilities, please contact the school office. We are committed to fostering a welcoming and inclusive environment for every family. Thank you for choosing IALFM Sunday School for your child’s Islamic education!`,
        createdAt: new Date('2025-01-01T10:00:00Z'),
    },
];

const getPreview = (content: string, wordLimit: number = 15) => {
    const words = content.split(/\s+/);
    if (words.length <= wordLimit) return content;
    return words.slice(0, wordLimit).join(' ') + '...';
};

const AnnouncementsPage = () => {
    const [expanded, setExpanded] = useState<{ [id: number]: boolean }>({});

    const toggleExpand = (id: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.pageTitle}>Announcements</Text>
            {announcements.map(a => (
                <View key={a.id} style={styles.card}>
                    <Image source={a.image} style={styles.image} />
                    <Text style={styles.title}>{a.title}</Text>
                    <Text style={expanded[a.id] ? styles.fullContent : styles.excerpt}>
                        {expanded[a.id] ? a.content : getPreview(a.content)}
                    </Text>
                    <Pressable style={styles.button} onPress={() => toggleExpand(a.id)}>
                        <Text style={styles.buttonText}>{expanded[a.id] ? 'Show Less' : 'Show More'}</Text>
                    </Pressable>
                </View>
            ))}
        </ScrollView>
    );
};

export default AnnouncementsPage;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 18,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 160,
        borderRadius: 10,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 8,
    },
    excerpt: {
        fontSize: 15,
        color: '#333',
        marginBottom: 10,
    },
    button: {
        alignSelf: 'flex-start',
        backgroundColor: '#2E8B57',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 8,
        marginBottom: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    // modalOverlay and modalContent removed
    fullContent: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        marginTop: 10,
        textAlign: 'left',
    },
});
