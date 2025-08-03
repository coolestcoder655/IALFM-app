import { StyleSheet, ScrollView, Linking, Alert, Pressable } from 'react-native';
import { Users, MessageCircle, Briefcase, UserPlus, Mail, Facebook, Youtube, ExternalLink } from 'lucide-react-native';

import { Text, View } from '@/components/Themed';

interface CommunityFeature {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    action: () => void;
}

interface JobPosition {
    id: string;
    title: string;
    department: string;
    type: 'full-time' | 'part-time' | 'volunteer';
}

const CommunityScreen = () => {
    const openFacebook = () => {
        Linking.openURL('https://www.facebook.com/IALFMMasjid');
    };

    const openYoutube = () => {
        Linking.openURL('https://www.youtube.com/channel/UCPtx1gYmw-bwziiHEEzaHqQ');
    };

    const openEmail = () => {
        Linking.openURL('mailto:info@ialfm.org');
    };

    const openWebsite = () => {
        Linking.openURL('https://ialfm.org');
    };

    const openJobsPage = () => {
        Linking.openURL('https://ialfm.org/open-positions/');
    };

    const openStartPage = () => {
        Linking.openURL('https://ialfm.org/start/');
    };

    const requestWhatsAppInfo = () => {
        Alert.alert(
            'WhatsApp Community Group',
            'To join our community WhatsApp group for announcements and updates, please contact the masjid directly or ask during your visit.',
            [
                { text: 'Email Masjid', onPress: openEmail },
                { text: 'OK', style: 'cancel' },
            ]
        );
    };

    const communityFeatures: CommunityFeature[] = [
        {
            id: '1',
            title: 'Connect with IALFM',
            description: 'Start here to connect with our masjid community and learn about getting involved.',
            icon: UserPlus,
            action: openStartPage,
        },
        {
            id: '2',
            title: 'Community WhatsApp Group',
            description: 'Join our community announcement group for updates, events, and important information.',
            icon: MessageCircle,
            action: requestWhatsAppInfo,
        },
        {
            id: '3',
            title: 'Weekly Newsletter',
            description: 'Subscribe to our newsletter for regular updates about events, programs, and community news.',
            icon: Mail,
            action: openWebsite,
        },
        {
            id: '4',
            title: 'Facebook Page',
            description: 'Follow @IALFMMasjid on Facebook for photos, updates, and community discussions.',
            icon: Facebook,
            action: openFacebook,
        },
        {
            id: '5',
            title: 'YouTube Channel',
            description: 'Watch lectures, events, and educational content on our YouTube channel.',
            icon: Youtube,
            action: openYoutube,
        },
    ];

    const jobPositions: JobPosition[] = [
        {
            id: '1',
            title: 'Religious Director',
            department: 'Religious Affairs',
            type: 'full-time',
        },
        {
            id: '2',
            title: 'Sisters Program Lead',
            department: 'Education',
            type: 'part-time',
        },
        {
            id: '3',
            title: 'Youth Program Lead',
            department: 'Youth Services',
            type: 'part-time',
        },
        {
            id: '4',
            title: 'Facility Manager',
            department: 'Operations',
            type: 'full-time',
        },
    ];

    const getJobTypeColor = (type: string) => {
        switch (type) {
            case 'full-time':
                return '#4CAF50';
            case 'part-time':
                return '#FF9800';
            case 'volunteer':
                return '#2196F3';
            default:
                return '#666';
        }
    };

    const getJobTypeLabel = (type: string) => {
        switch (type) {
            case 'full-time':
                return 'Full-Time';
            case 'part-time':
                return 'Part-Time';
            case 'volunteer':
                return 'Volunteer';
            default:
                return type;
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Users size={32} color="white" />
                <Text style={styles.headerTitle}>Community</Text>
                <Text style={styles.headerSubtitle}>Connect • Engage • Grow Together</Text>
            </View>

            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeTitle}>Welcome to Our Community</Text>
                <Text style={styles.welcomeText}>
                    IALFM is more than a place of worship - we are a vibrant community dedicated to serving Allah
                    and supporting each other. Join us in building a strong, connected Islamic community in
                    Lewisville and Flower Mound.
                </Text>
            </View>

            <View style={styles.connectSection}>
                <Text style={styles.sectionTitle}>Stay Connected</Text>

                {communityFeatures.map((feature) => (
                    <View key={feature.id} style={styles.featureCard}>
                        <View style={styles.featureHeader}>
                            <feature.icon size={24} color="#2E8B57" />
                            <Text style={styles.featureTitle}>{feature.title}</Text>
                        </View>
                        <Text style={styles.featureDescription}>{feature.description}</Text>
                        <Pressable style={styles.featureButton} onPress={feature.action}>
                            <ExternalLink size={16} color="#2E8B57" />
                            <Text style={styles.featureButtonText}>Learn More</Text>
                        </Pressable>
                    </View>
                ))}
            </View>

            <View style={styles.jobsSection}>
                <Text style={styles.jobsTitle}>Join Our Team</Text>
                <Text style={styles.jobsSubtitle}>
                    IALFM is hiring dedicated individuals to join our vibrant community
                </Text>

                <View style={styles.jobsList}>
                    {jobPositions.map((job) => (
                        <View key={job.id} style={styles.jobCard}>
                            <View style={styles.jobHeader}>
                                <Text style={styles.jobTitle}>{job.title}</Text>
                                <View
                                    style={[
                                        styles.jobTypeBadge,
                                        { backgroundColor: getJobTypeColor(job.type) }
                                    ]}
                                >
                                    <Text style={styles.jobTypeText}>
                                        {getJobTypeLabel(job.type)}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.jobDepartment}>{job.department}</Text>
                        </View>
                    ))}
                </View>

                <Pressable style={styles.jobsButton} onPress={openJobsPage}>
                    <Briefcase size={20} color="#2E8B57" />
                    <Text style={styles.jobsButtonText}>View Open Positions</Text>
                </Pressable>
            </View>

            <View style={styles.volunteerSection}>
                <Text style={styles.volunteerTitle}>Volunteer Opportunities</Text>
                <Text style={styles.volunteerText}>
                    We welcome volunteers to help with various activities and services:
                </Text>
                <View style={styles.volunteerList}>
                    <Text style={styles.volunteerItem}>• Event organization and coordination</Text>
                    <Text style={styles.volunteerItem}>• Educational program assistance</Text>
                    <Text style={styles.volunteerItem}>• Masjid maintenance and cleaning</Text>
                    <Text style={styles.volunteerItem}>• Community outreach programs</Text>
                    <Text style={styles.volunteerItem}>• Translation services</Text>
                    <Text style={styles.volunteerItem}>• Technology and media support</Text>
                    <Text style={styles.volunteerItem}>• Youth program mentoring</Text>
                </View>
                <Text style={styles.volunteerContact}>
                    Contact us to learn about current volunteer opportunities.
                </Text>
            </View>

            <View style={styles.servicesSection}>
                <Text style={styles.servicesTitle}>Community Services</Text>
                <View style={styles.servicesList}>
                    <View style={styles.serviceItem}>
                        <Text style={styles.serviceTitle}>🤝 Marriage Services</Text>
                        <Text style={styles.serviceDescription}>Nikah ceremonies and marriage counseling</Text>
                    </View>

                    <View style={styles.serviceItem}>
                        <Text style={styles.serviceTitle}>📖 Islamic Education</Text>
                        <Text style={styles.serviceDescription}>Quran classes and Islamic studies for all ages</Text>
                    </View>

                    <View style={styles.serviceItem}>
                        <Text style={styles.serviceTitle}>🕌 Funeral Services</Text>
                        <Text style={styles.serviceDescription}>Janazah prayers and funeral arrangements</Text>
                    </View>

                    <View style={styles.serviceItem}>
                        <Text style={styles.serviceTitle}>💬 Counseling</Text>
                        <Text style={styles.serviceDescription}> Spiritual guidance and family counseling</Text>
                    </View >

                    <View style={styles.serviceItem}>
                        <Text style={styles.serviceTitle}>🍽️ Community Kitchen</Text>
                        <Text style={styles.serviceDescription}> Community meals and food assistance</Text>
                    </View >
                </View >
            </View >

            <View style={styles.guidelinesSection}>
                <Text style={styles.guidelinesTitle}>Community Guidelines</Text>
                <Text style={styles.guidelinesText}>
                    To maintain a respectful and welcoming environment for all:
                </Text>
                <View style={styles.guidelinesList}>
                    <Text style={styles.guidelineItem}>• Treat all community members with respect and kindness</Text>
                    <Text style={styles.guidelineItem}>• Maintain appropriate Islamic etiquette and dress code</Text>
                    <Text style={styles.guidelineItem}>• Keep discussions constructive and beneficial</Text>
                    <Text style={styles.guidelineItem}>• Respect the sanctity of the masjid space</Text>
                    <Text style={styles.guidelineItem}>• Follow safety protocols and guidelines</Text>
                    <Text style={styles.guidelineItem}>• Support community harmony and unity</Text>
                </View>
            </View >

            <View style={styles.contactSection}>
                <Text style={styles.contactTitle}>Get Involved</Text>
                <Text style={styles.contactText}>
                    Ready to join our community or have questions? We'd love to hear from you:
                </Text>
                <Text style={styles.contactInfo}>
                    📧 Email: info@ialfm.org{'\n'}
                    🌐 Website: ialfm.org{'\n'}
                    📱 Facebook: @IALFMMasjid{'\n'}
                    🏢 Visit us at the masjid during community hours
                </Text>
                <Pressable style={styles.startButton} onPress={openStartPage}>
                    <UserPlus size={20} color="white" />
                    <Text style={styles.startButtonText}>Start Here - Connect with IALFM</Text>
                </Pressable>
            </View>
        </ScrollView >
    );
};

export default CommunityScreen;

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
    welcomeSection: {
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
    welcomeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    connectSection: {
        margin: 15,
        marginTop: 0,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 15,
    },
    featureCard: {
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
    featureHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 12,
    },
    featureDescription: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
        marginBottom: 15,
    },
    featureButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f0f8f0',
        borderRadius: 8,
    },
    featureButtonText: {
        fontSize: 16,
        color: '#2E8B57',
        marginLeft: 8,
        fontWeight: '500',
    },
    jobsSection: {
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
    jobsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 5,
    },
    jobsSubtitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        lineHeight: 22,
    },
    jobsList: {
        marginBottom: 20,
    },
    jobCard: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#2E8B57',
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    jobTypeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    jobTypeText: {
        fontSize: 12,
        color: 'white',
        fontWeight: '500',
    },
    jobDepartment: {
        fontSize: 14,
        color: '#666',
    },
    jobsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#f0f8f0',
        borderRadius: 8,
    },
    jobsButtonText: {
        fontSize: 16,
        color: '#2E8B57',
        marginLeft: 10,
        fontWeight: '500',
    },
    volunteerSection: {
        backgroundColor: '#e8f5e8',
        margin: 15,
        marginTop: 0,
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2E8B57',
    },
    volunteerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 10,
    },
    volunteerText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        lineHeight: 22,
    },
    volunteerList: {
        marginBottom: 15,
    },
    volunteerItem: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 5,
    },
    volunteerContact: {
        fontSize: 16,
        color: '#2E8B57',
        fontWeight: '500',
        fontStyle: 'italic',
    },
    servicesSection: {
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
    servicesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 15,
    },
    servicesList: {
        gap: 15,
    },
    serviceItem: {
        borderLeftWidth: 4,
        borderLeftColor: '#2E8B57',
        paddingLeft: 15,
    },
    serviceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    serviceDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    guidelinesSection: {
        backgroundColor: '#fff3e0',
        margin: 15,
        marginTop: 0,
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ff9800',
    },
    guidelinesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff9800',
        marginBottom: 10,
    },
    guidelinesText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        lineHeight: 22,
    },
    guidelinesList: {
        gap: 8,
    },
    guidelineItem: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
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
        marginBottom: 20,
    },
    startButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2E8B57',
        padding: 15,
        borderRadius: 8,
    },
    startButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
