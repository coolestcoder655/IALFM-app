import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import {
    MapPin,
    Mail,
    Users,
    Calendar,
    MessageCircle,
    Award,
    Info,
    Building,
    Heart,
    BookOpen,
    Star,
    CheckCircle,
} from 'lucide-react-native';

// Combine Our Imam section into one paragraph

// Move Emails to Contact Us in `index.tsx`

// imam@ialfm.org, bod@ialfm.org



const AboutUsSection: React.FC = () => {
    const handleEmailPress = (email: string) => {
        Linking.openURL(`mailto:${email}`);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <View style={styles.iconContainer}>
                        <Building size={48} color="#2c5530" />
                    </View>
                    <Text style={styles.mainTitle}>About IALFM</Text>
                    <View style={styles.decorativeLine} />
                    <Text style={styles.subtitle}>Islamic Association of Lewisville-Flower Mound</Text>
                    <View style={styles.badgeContainer}>
                        <View style={styles.badge}>
                            <Star size={16} color="#FFD700" />
                            <Text style={styles.badgeText}>501(c)(3) Non-Profit</Text>
                        </View>
                        <View style={styles.badge}>
                            <CheckCircle size={16} color="#28a745" />
                            <Text style={styles.badgeText}>Established 2006</Text>
                        </View>
                    </View>
                </View>

                {/* Section 1: Organization Overview */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIconContainer}>
                            <Info size={24} color="#fff" />
                        </View>
                        <Text style={styles.sectionTitle}>Our Organization</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.introBox}>
                        <Text style={styles.bodyText}>
                            <Text style={styles.boldText}>Islamic Association of Lewisville-Flower Mound</Text> or{' '}
                            <Text style={styles.highlightText}>IALFM</Text> is a registered non-profit religious organization.
                            IALFM is an independent member-based organization and operates strictly under the religious
                            guidance of the <Text style={styles.boldText}>Islamic Association of North Texas (IANT)</Text>.
                        </Text>
                    </View>

                    <View style={styles.missionBox}>
                        <View style={styles.missionHeader}>
                            <Heart size={20} color="#1a4d20" />
                            <Text style={styles.missionTitle}>Our Mission</Text>
                        </View>
                        <Text style={styles.bodyText}>
                            IALFM is dedicated to <Text style={styles.boldText}>worship, education, and community service</Text> in
                            the Flower Mound, Lewisville, Highland Village, Double Oak, Lantana, Lake Dallas, Grapevine,
                            and surrounding areas.
                        </Text>
                    </View>
                </View>

                {/* Section 2: Imam Information */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIconContainer}>
                            <BookOpen size={24} color="#fff" />
                        </View>
                        <Text style={styles.sectionTitle}>Our Imam</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={{ marginTop: 16 }}>
                        <Text style={[styles.bodyText, { paddingTop: 4 }]}>
                            <Text style={styles.boldText}>Imam Rasheed Farah</Text> was born in{' '}
                            Somalia and became a{' '}
                            Hafiz at age ten.
                            He studied Tafseer, Arabic, Fiqh, Tajweed & Seerah from
                            various scholars and completed two years of Islamic
                            Studies at American International University. He served as
                            an Assistant Imam for{' '}
                            three years at the{' '}
                            Islamic Society of Arlington, Texas before joining
                            IALFM in 2006. Since then, he has been serving our
                            community, leading daily & Friday prayers,
                            Tarawih prayers in Ramadan, and{' '}
                            Eid prayers annually.
                        </Text>
                    </View>
                </View>

                {/* Section 3: Board of Directors */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIconContainer}>
                            <Users size={24} color="#fff" />
                        </View>
                        <Text style={styles.sectionTitle}>Board of Directors</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.boardList}>
                        <View style={styles.boardMemberRow}>
                            <View style={styles.roleIcon}>
                                <Building size={16} color="#2c5530" />
                            </View>
                            <Text style={styles.boardMember}>
                                <Text style={styles.boldText}>Br Razaq Khazi-Syed</Text> – President{' '}
                                <Text style={styles.italicText}>(elected for 2024-25 term)</Text>
                            </Text>
                        </View>

                        <View style={styles.boardMemberRow}>
                            <View style={styles.roleIcon}>
                                <Users size={16} color="#2c5530" />
                            </View>
                            <Text style={styles.boardMember}>
                                <Text style={styles.boldText}>Br Harris Khan</Text> – Vice President{' '}
                                <Text style={styles.italicText}>(elected for 2025-26 term)</Text>
                            </Text>
                        </View>

                        <View style={styles.boardMemberRow}>
                            <View style={styles.roleIcon}>
                                <BookOpen size={16} color="#2c5530" />
                            </View>
                            <Text style={styles.boardMember}>
                                <Text style={styles.boldText}>Br Syed Bukhari</Text> – Secretary{' '}
                                <Text style={styles.italicText}>(elected for 2025-26 term)</Text>
                            </Text>
                        </View>

                        <View style={styles.boardMemberRow}>
                            <View style={styles.roleIcon}>
                                <Award size={16} color="#2c5530" />
                            </View>
                            <Text style={styles.boardMember}>
                                <Text style={styles.boldText}>Br Masud Rahman</Text> – Treasurer{' '}
                                <Text style={styles.italicText}>(elected for 2024-25 term)</Text>
                            </Text>
                        </View>

                        <View style={styles.boardMemberRow}>
                            <View style={styles.roleIcon}>
                                <CheckCircle size={16} color="#2c5530" />
                            </View>
                            <Text style={styles.boardMember}>
                                <Text style={styles.boldText}>Br Firoz Vohra</Text>{' '}
                                <Text style={styles.italicText}>(elected for 2024-25 term)</Text>
                            </Text>
                        </View>

                        <View style={styles.boardMemberRow}>
                            <View style={styles.roleIcon}>
                                <CheckCircle size={16} color="#2c5530" />
                            </View>
                            <Text style={styles.boardMember}>
                                <Text style={styles.boldText}>Br Jamal Ahmed</Text>{' '}
                                <Text style={styles.italicText}>(elected for 2025-26 term)</Text>
                            </Text>
                        </View>

                        <View style={styles.boardMemberRow}>
                            <View style={styles.roleIcon}>
                                <CheckCircle size={16} color="#2c5530" />
                            </View>
                            <Text style={styles.boardMember}>
                                <Text style={styles.boldText}>Br Mahmood Alvi</Text>{' '}
                                <Text style={styles.italicText}>(elected for 2025-26 term)</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView >
    );
};

export default AboutUsSection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: 16,
    },
    headerSection: {
        backgroundColor: 'white',
        marginBottom: 20,
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    iconContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#e8f5e8',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#2c5530',
    },
    badgeContainer: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 12,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e9ecef',
        gap: 6,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#495057',
        textAlign: 'left',
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1a4d20',
        marginBottom: 8,
        textAlign: 'center',
        letterSpacing: 1,
    },
    decorativeLine: {
        width: 60,
        height: 3,
        backgroundColor: '#2c5530',
        marginVertical: 8,
        borderRadius: 2,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    section: {
        backgroundColor: 'white',
        marginBottom: 16,
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionIconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#2c5530',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    sectionNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c5530',
        backgroundColor: '#e8f5e8',
        width: 40,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 20,
        marginRight: 12,
        overflow: 'hidden',
    },
    introBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        gap: 12,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    partnershipBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#e3f2fd',
        padding: 16,
        borderRadius: 8,
        marginVertical: 12,
        gap: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#2196f3',
    },
    missionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    imamIntroBox: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#2c5530',
    },
    imamBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff3cd',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 8,
        gap: 4,
    },
    educationBox: {
        backgroundColor: '#e3f2fd',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    experienceBox: {
        backgroundColor: '#f3e5f5',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    serviceTimeline: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    timelineText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a4d20',
        textAlign: 'left',
    },
    contactHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    emailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 6,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c5530',
        flex: 1,
        textAlign: 'left',
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginBottom: 0,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c5530',
        marginTop: 16,
        textAlign: 'left',
    },
    bodyText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#333',
        marginBottom: 12,
        textAlign: 'left',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#1a4d20',
    },
    italicText: {
        fontStyle: 'italic',
        color: '#666',
    },
    highlightText: {
        fontWeight: 'bold',
        color: '#2c5530',
        backgroundColor: '#e8f5e8',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 3,
    },
    indentedBox: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        marginVertical: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#2c5530',
        borderRadius: 6,
    },
    missionBox: {
        backgroundColor: '#e8f5e8',
        padding: 16,
        marginVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2c5530',
    },
    missionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a4d20',
        marginBottom: 8,
        textAlign: 'center',
    },
    locationBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff3cd',
        padding: 12,
        marginTop: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ffeaa7',
        gap: 8,
    },
    locationText: {
        fontSize: 14,
        color: '#856404',
        fontWeight: '500',
        flex: 1,
        textAlign: 'left',
    },
    boardList: {
        marginVertical: 16,
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
    },
    boardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 16,
        marginBottom: 8,
    },
    boardMemberRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        gap: 12,
    },
    roleIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#e8f5e8',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    boardMember: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
        flex: 1,
        textAlign: 'left',
    },
    noteBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        marginTop: 16,
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 6,
        borderLeftWidth: 3,
        borderLeftColor: '#ddd',
    },
    contactSection: {
        backgroundColor: '#f0f8ff',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#b3d9ff',
    },
    emailLink: {
        fontSize: 15,
        color: '#1e90ff',
        textDecorationLine: 'underline',
        fontWeight: '500',
        textAlign: 'left',
    },
    noteText: {
        fontSize: 13,
        lineHeight: 20,
        color: '#666',
        fontStyle: 'italic',
        flex: 1,
        textAlign: 'left',
    },
    highlightBox: {
        backgroundColor: '#e8f5e8',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#2c5530',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    agendaSection: {
        marginTop: 16,
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    agendaItem: {
        fontSize: 14,
        lineHeight: 22,
        color: '#333',
        marginBottom: 6,
        paddingLeft: 8,
        textAlign: 'left',
    },
});