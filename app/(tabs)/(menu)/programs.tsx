import { StyleSheet, ScrollView, Linking, Pressable, SafeAreaView } from 'react-native';
import { BookOpen, Users, GraduationCap, Heart, Star, ExternalLink } from 'lucide-react-native';

import { Text, View } from '@/components/Themed';

interface Program {
    id: string;
    title: string;
    description: string;
    ageGroup: string;
    schedule: string;
    icon: React.ComponentType<any>;
    status: 'open' | 'closed' | 'ongoing';
}

const ProgramsScreen = () => {
    const programs: Program[] = [
        {
            id: '1',
            title: 'Quran School',
            description: 'Comprehensive Quran education for students of all levels, from beginners to advanced. Available both online and onsite at the masjid.',
            ageGroup: 'All Ages',
            schedule: 'Weekends & Evenings',
            icon: BookOpen,
            status: 'open',
        },
        {
            id: '2',
            title: 'Sunday School',
            description: 'Islamic education program covering Quran, Islamic history, Arabic language, and moral development for children and youth.',
            ageGroup: 'Children & Youth',
            schedule: 'Sundays',
            icon: GraduationCap,
            status: 'closed',
        },
        {
            id: '3',
            title: 'Youth Program',
            description: 'Engaging educational and recreational activities designed for teenagers, focusing on Islamic values and character building.',
            ageGroup: '13-18 years',
            schedule: 'Saturdays',
            icon: Users,
            status: 'ongoing',
        },
        {
            id: '4',
            title: 'Sisters Program',
            description: 'Weekly program for sisters including Quran study, Islamic education, and community building activities.',
            ageGroup: 'Adult Women',
            schedule: 'Wednesdays 7:00 PM',
            icon: Heart,
            status: 'ongoing',
        },
        {
            id: '5',
            title: 'Educational Programs',
            description: 'Various educational events including Islamic history lectures, Quran study circles, and spiritual development sessions.',
            ageGroup: 'All Community',
            schedule: 'Monthly & Weekly',
            icon: Star,
            status: 'ongoing',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open':
                return '#4CAF50';
            case 'closed':
                return '#F44336';
            case 'ongoing':
                return '#FF9800';
            default:
                return '#666';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'open':
                return 'Registration Open';
            case 'closed':
                return 'Registration Closed';
            case 'ongoing':
                return 'Ongoing Program';
            default:
                return '';
        }
    };

    const openQuranSchoolRegistration = () => {
        Linking.openURL('https://ialfm.org/qssreg/');
    };

    const openSundaySchoolRegistration = () => {
        Linking.openURL('https://ialfm.org/sssreg/');
    };

    const openWebsite = () => {
        Linking.openURL('https://ialfm.org/eyp/');
    };

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <BookOpen size={32} color="white" />
                    <Text style={styles.headerTitle}>Educational Programs</Text>
                    <Text style={styles.headerSubtitle}>Learning & Growth at IALFM</Text>
                </View>

                <View style={styles.introSection}>
                    <Text style={styles.introTitle}>Comprehensive Islamic Education</Text>
                    <Text style={styles.introText}>
                        IALFM offers various educational programs designed to strengthen Islamic knowledge,
                        character development, and community engagement for all ages.
                    </Text>
                </View>

                <View style={styles.programsSection}>
                    <Text style={styles.sectionTitle}>Our Programs</Text>

                    {programs.map((program) => (
                        <View key={program.id} style={styles.programCard}>
                            <View style={styles.programHeader}>
                                <View style={styles.programTitleRow}>
                                    <program.icon size={24} color="#2E8B57" />
                                    <Text style={styles.programTitle}>{program.title}</Text>
                                </View>
                                <View
                                    style={[
                                        styles.statusBadge,
                                        { backgroundColor: getStatusColor(program.status) }
                                    ]}
                                >
                                    <Text style={styles.statusText}>
                                        {getStatusLabel(program.status)}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.programDescription}>{program.description}</Text>

                            <View style={styles.programDetails}>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Age Group:</Text>
                                    <Text style={styles.detailValue}>{program.ageGroup}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Schedule:</Text>
                                    <Text style={styles.detailValue}>{program.schedule}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.registrationSection}>
                    <Text style={styles.registrationTitle}>Program Registration</Text>

                    <View style={styles.registrationCard}>
                        <Text style={styles.registrationCardTitle}>Quran School Registration</Text>
                        <Text style={styles.registrationCardText}>
                            Students from all levels are welcome! Choose between online or onsite classes.
                        </Text>
                        <Pressable style={styles.registrationButton} onPress={openQuranSchoolRegistration}>
                            <ExternalLink size={20} color="#2E8B57" />
                            <Text style={styles.registrationButtonText}>Register for Quran School</Text>
                        </Pressable>
                    </View>

                    <View style={styles.registrationCard}>
                        <Text style={styles.registrationCardTitle}>Sunday School Registration</Text>
                        <Text style={styles.registrationCardText}>
                            Registration for new academic year (2025-26) will start in late July or early August 2025.
                        </Text>
                        <Pressable style={styles.registrationButton} onPress={openSundaySchoolRegistration}>
                            <ExternalLink size={20} color="#2E8B57" />
                            <Text style={styles.registrationButtonText}>Sunday School Info</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.featuresSection}>
                    <Text style={styles.featuresTitle}>Program Features</Text>
                    <View style={styles.featuresList}>
                        <Text style={styles.featureItem}>• Qualified and experienced instructors</Text>
                        <Text style={styles.featureItem}>• Age-appropriate curriculum</Text>
                        <Text style={styles.featureItem}>• Flexible scheduling options</Text>
                        <Text style={styles.featureItem}>• Online and onsite delivery</Text>
                        <Text style={styles.featureItem}>• Character development focus</Text>
                        <Text style={styles.featureItem}>• Community engagement activities</Text>
                        <Text style={styles.featureItem}>• Regular progress assessments</Text>
                    </View>
                </View>

                <View style={styles.announcementSection}>
                    <Text style={styles.announcementTitle}>Stay Informed</Text>
                    <Text style={styles.announcementText}>
                        Educational events and youth programs are advertised through:
                    </Text>
                    <Text style={styles.announcementList}>
                        📧 Weekly Newsletter{'\n'}
                        💬 Community WhatsApp Group{'\n'}
                        📱 Facebook Page @IALFMMasjid
                    </Text>
                    <Pressable style={styles.websiteButton} onPress={openWebsite}>
                        <ExternalLink size={20} color="#2E8B57" />
                        <Text style={styles.websiteButtonText}>View Educational Programs</Text>
                    </Pressable>
                </View>

                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Program Inquiries</Text>
                    <Text style={styles.contactText}>
                        For questions about programs, registration, or scheduling:
                    </Text>
                    <Text style={styles.contactInfo}>
                        📧 Email: info@ialfm.org{'\n'}
                        🌐 Website: ialfm.org{'\n'}
                        Visit the masjid during community hours
                    </Text>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default ProgramsScreen;

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
    introSection: {
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
    introTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 10,
    },
    introText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    programsSection: {
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
    programCard: {
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
    programHeader: {
        marginBottom: 15,
    },
    programTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    programTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },
    statusText: {
        fontSize: 12,
        color: 'white',
        fontWeight: '500',
    },
    programDescription: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
        marginBottom: 15,
    },
    programDetails: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 15,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        width: 80,
    },
    detailValue: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    registrationSection: {
        margin: 15,
        marginTop: 0,
    },
    registrationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 15,
    },
    registrationCard: {
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
    registrationCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 10,
    },
    registrationCardText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        marginBottom: 15,
    },
    registrationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f0f8f0',
        borderRadius: 8,
    },
    registrationButtonText: {
        fontSize: 16,
        color: '#2E8B57',
        marginLeft: 10,
        fontWeight: '500',
    },
    featuresSection: {
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
    featuresTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 15,
    },
    featuresList: {
        paddingLeft: 10,
    },
    featureItem: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 5,
    },
    announcementSection: {
        backgroundColor: '#e8f5e8',
        margin: 15,
        marginTop: 0,
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2E8B57',
    },
    announcementTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 10,
    },
    announcementText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 10,
    },
    announcementList: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 15,
    },
    websiteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    websiteButtonText: {
        fontSize: 16,
        color: '#2E8B57',
        marginLeft: 10,
        fontWeight: '500',
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
