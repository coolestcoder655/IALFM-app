import { StyleSheet, ScrollView, Linking, Alert, Pressable, SafeAreaView } from 'react-native';
import { Heart, Home, BookOpen, Users, Lightbulb, ExternalLink, CreditCard } from 'lucide-react-native';

import { Text, View } from '@/components/Themed';

interface DonationCategory {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    priority: 'high' | 'medium' | 'ongoing';
}

const DonateScreen = () => {
    const donationCategories: DonationCategory[] = [
        {
            id: '1',
            title: 'Masjid Maintenance & Operations',
            description: 'Support daily operations, utilities, cleaning, and maintenance of our beautiful new masjid building.',
            icon: Home,
            priority: 'high',
        },
        {
            id: '2',
            title: 'Educational Programs',
            description: 'Fund Quran school, Sunday school, and educational activities for our community members.',
            icon: BookOpen,
            priority: 'high',
        },
        {
            id: '3',
            title: 'Community Services',
            description: 'Support community events, youth programs, and outreach activities.',
            icon: Users,
            priority: 'medium',
        },
        {
            id: '4',
            title: 'General Fund',
            description: 'Unrestricted donations that help us address the most pressing needs of our community.',
            icon: Heart,
            priority: 'ongoing',
        },
        {
            id: '5',
            title: 'Emergency Relief',
            description: 'Help community members in need and support emergency relief efforts.',
            icon: Lightbulb,
            priority: 'ongoing',
        },
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return '#F44336';
            case 'medium':
                return '#FF9800';
            case 'ongoing':
                return '#4CAF50';
            default:
                return '#666';
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'High Priority';
            case 'medium':
                return 'Medium Priority';
            case 'ongoing':
                return 'Ongoing Need';
            default:
                return '';
        }
    };

    const openDonationWebsite = () => {
        Linking.openURL('https://ialfm.org');
    };

    const handleDonatePress = (category: string) => {
        Alert.alert(
            'Donate to IALFM',
            `Thank you for your interest in supporting ${category}. Please visit our website for donations.`,
            [
                { text: 'Visit Website', onPress: openDonationWebsite },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Heart size={32} color="white" />
                    <Text style={styles.headerTitle}>Support IALFM</Text>
                    <Text style={styles.headerSubtitle}>Your donations make a difference</Text>
                </View>

                <View style={styles.inspirationSection}>
                    <Text style={styles.inspirationQuote}>
                        "The believer's shade on the Day of Resurrection will be his charity."
                    </Text>
                    <Text style={styles.inspirationSource}>- Prophet Muhammad (ﷺ)</Text>
                </View>

                <View style={styles.impactSection}>
                    <Text style={styles.impactTitle}>Your Impact</Text>
                    <Text style={styles.impactText}>
                        Alhumdulillah, through the generous support of our community, we completed our new masjid building in 2021.
                        Your continued support helps us maintain this beautiful facility and expand our services to the community.
                    </Text>
                </View>

                <View style={styles.categoriesSection}>
                    <Text style={styles.sectionTitle}>Donation Categories</Text>

                    {donationCategories.map((category) => (
                        <View key={category.id} style={styles.categoryCard}>
                            <View style={styles.categoryHeader}>
                                <View style={styles.categoryTitleRow}>
                                    <category.icon size={24} color="#2E8B57" />
                                    <Text style={styles.categoryTitle}>{category.title}</Text>
                                </View>
                                <View
                                    style={[
                                        styles.priorityBadge,
                                        { backgroundColor: getPriorityColor(category.priority) }
                                    ]}
                                >
                                    <Text style={styles.priorityText}>
                                        {getPriorityLabel(category.priority)}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.categoryDescription}>{category.description}</Text>

                            <Pressable
                                style={styles.donateButton}
                                onPress={() => handleDonatePress(category.title)}
                            >
                                <CreditCard size={20} color="white" />
                                <Text style={styles.donateButtonText}>Donate Now</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>

                <View style={styles.waysToGiveSection}>
                    <Text style={styles.waysTitle}>Ways to Give</Text>
                    <View style={styles.waysList}>
                        <View style={styles.wayItem}>
                            <Text style={styles.wayTitle}>💳 Online Donation</Text>
                            <Text style={styles.wayDescription}>Secure online donations through our website</Text>
                        </View>

                        <View style={styles.wayItem}>
                            <Text style={styles.wayTitle}>🏦 Bank Transfer</Text>
                            <Text style={styles.wayDescription}>Direct bank transfer to masjid account</Text>
                        </View>

                        <View style={styles.wayItem}>
                            <Text style={styles.wayTitle}>💵 Cash/Check</Text>
                            <Text style={styles.wayDescription}>In-person donations at the masjid</Text>
                        </View>

                        <View style={styles.wayItem}>
                            <Text style={styles.wayTitle}>📅 Monthly Giving</Text>
                            <Text style={styles.wayDescription}>Set up recurring monthly donations</Text>
                        </View>

                        <View style={styles.wayItem}>
                            <Text style={styles.wayTitle}>🌟 Zakat & Sadaqah</Text>
                            <Text style={styles.wayDescription}>Fulfill your religious obligations</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.zakatSection}>
                    <Text style={styles.zakatTitle}>Zakat Information</Text>
                    <Text style={styles.zakatText}>
                        IALFM accepts Zakat donations for eligible recipients in our community.
                        Your Zakat helps support those in need and funds Islamic education programs.
                    </Text>
                    <Text style={styles.zakatNote}>
                        Please specify if your donation is intended as Zakat when making your contribution.
                    </Text>
                </View>

                <View style={styles.transparencySection}>
                    <Text style={styles.transparencyTitle}>Financial Transparency</Text>
                    <Text style={styles.transparencyText}>
                        We are committed to transparency in how your donations are used.
                        Financial reports and updates on our projects are shared with the community regularly.
                    </Text>
                </View>

                <View style={styles.websiteSection}>
                    <Text style={styles.websiteTitle}>Make a Donation</Text>
                    <Text style={styles.websiteText}>
                        For secure online donations and more information about supporting IALFM:
                    </Text>
                    <Pressable style={styles.websiteButton} onPress={openDonationWebsite}>
                        <ExternalLink size={20} color="#2E8B57" />
                        <Text style={styles.websiteButtonText}>Visit IALFM Website</Text>
                    </Pressable>
                </View>

                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Donation Inquiries</Text>
                    <Text style={styles.contactText}>
                        For questions about donations, planned giving, or specific funding needs:
                    </Text>
                    <Text style={styles.contactInfo}>
                        📧 Email: info@ialfm.org{'\n'}
                        🌐 Website: ialfm.org{'\n'}
                        🏢 Visit us at the masjid during community hours
                    </Text>
                </View>

                <View style={styles.footerSection}>
                    <Text style={styles.footerText}>
                        "And whatever you spend in good, it will be repaid to you in full, and you shall not be wronged."
                    </Text>
                    <Text style={styles.footerSource}>- Quran 2:272</Text>
                    <Text style={styles.footerGratitude}>
                        جزاكم الله خيراً{'\n'}
                        May Allah reward you with goodness
                    </Text>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default DonateScreen;

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
    inspirationSection: {
        backgroundColor: '#e8f5e8',
        margin: 15,
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2E8B57',
        alignItems: 'center',
    },
    inspirationQuote: {
        fontSize: 18,
        color: '#2E8B57',
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 10,
    },
    inspirationSource: {
        fontSize: 14,
        color: '#2E8B57',
        fontWeight: '500',
    },
    impactSection: {
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
    impactTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 10,
    },
    impactText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    categoriesSection: {
        margin: 15,
        marginTop: 0,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 15,
    },
    categoryCard: {
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
    categoryHeader: {
        marginBottom: 15,
    },
    categoryTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
        flex: 1,
    },
    priorityBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    priorityText: {
        fontSize: 12,
        color: 'white',
        fontWeight: '500',
    },
    categoryDescription: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
        marginBottom: 20,
    },
    donateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2E8B57',
        padding: 15,
        borderRadius: 8,
    },
    donateButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    waysToGiveSection: {
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
    waysTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 15,
    },
    waysList: {
        gap: 15,
    },
    wayItem: {
        borderLeftWidth: 4,
        borderLeftColor: '#2E8B57',
        paddingLeft: 15,
    },
    wayTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    wayDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    zakatSection: {
        backgroundColor: '#fff3e0',
        margin: 15,
        marginTop: 0,
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ff9800',
    },
    zakatTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff9800',
        marginBottom: 10,
    },
    zakatText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 10,
    },
    zakatNote: {
        fontSize: 14,
        color: '#ff9800',
        fontStyle: 'italic',
        lineHeight: 20,
    },
    transparencySection: {
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
    transparencyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 10,
    },
    transparencyText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    websiteSection: {
        backgroundColor: '#e3f2fd',
        margin: 15,
        marginTop: 0,
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#4A90E2',
    },
    websiteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A90E2',
        marginBottom: 10,
    },
    websiteText: {
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
    footerSection: {
        backgroundColor: '#f8f9fa',
        margin: 15,
        marginTop: 0,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#2E8B57',
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 10,
    },
    footerSource: {
        fontSize: 14,
        color: '#2E8B57',
        fontWeight: '500',
        marginBottom: 15,
    },
    footerGratitude: {
        fontSize: 16,
        color: '#2E8B57',
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '500',
    },
});
