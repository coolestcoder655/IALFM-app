import React from 'react';
import { StyleSheet, ScrollView, Linking, Pressable } from 'react-native';
import { Megaphone, Calendar, Clock, AlertTriangle, Info, ExternalLink, Pin } from 'lucide-react-native';

import { Text, View } from '@/components/Themed';
import { announcements, type Announcement, getAnnouncementTypeColor } from '@/utils/announcementsData';

const AnnouncementScreen = () => {
    // Helper function to format date for display
    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Helper function to format time for display
    const formatTime = (time: Date): string => {
        return time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const getAnnouncementTypeLabel = (type: string) => {
        switch (type) {
            case 'urgent':
                return 'Urgent';
            case 'general':
                return 'General';
            case 'event':
                return 'Event';
            case 'reminder':
                return 'Reminder';
            default:
                return 'Notice';
        }
    };

    const getAnnouncementIcon = (type: string) => {
        switch (type) {
            case 'urgent':
                return <AlertTriangle size={16} color="white" />;
            case 'general':
                return <Info size={16} color="white" />;
            case 'event':
                return <Calendar size={16} color="white" />;
            case 'reminder':
                return <Clock size={16} color="white" />;
            default:
                return <Info size={16} color="white" />;
        }
    };

    const openWebsite = () => {
        Linking.openURL('https://ialfm.org');
    };

    const openWhatsApp = () => {
        Linking.openURL('https://chat.whatsapp.com/your-group-link');
    };

    // Sort announcements: pinned first, then by date (newest first)
    const sortedAnnouncements = announcements.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.date.getTime() - a.date.getTime();
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Megaphone size={32} color="white" />
                <Text style={styles.headerTitle}>Announcements</Text>
                <Text style={styles.headerSubtitle}>Stay informed with community updates</Text>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Stay Connected</Text>
                <Text style={styles.infoText}>
                    Get the latest announcements through our website, WhatsApp community group, or visit the masjid notice board.
                </Text>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.actionButton} onPress={openWebsite}>
                        <ExternalLink size={20} color="#2E8B57" />
                        <Text style={styles.actionButtonText}>Visit Website</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.announcementsSection}>
                <Text style={styles.sectionTitle}>Latest Announcements</Text>

                {sortedAnnouncements.map((announcement) => (
                    <View key={announcement.id} style={styles.announcementCard}>
                        <View style={styles.announcementHeader}>
                            <View style={styles.titleContainer}>
                                {announcement.isPinned && (
                                    <Pin size={16} color="#2E8B57" style={styles.pinIcon} />
                                )}
                                <Text style={[
                                    styles.announcementTitle,
                                    announcement.isPinned && styles.pinnedTitle
                                ]}>
                                    {announcement.title}
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.announcementType,
                                    { backgroundColor: getAnnouncementTypeColor(announcement.type) }
                                ]}
                            >
                                {getAnnouncementIcon(announcement.type)}
                                <Text style={styles.announcementTypeText}>
                                    {getAnnouncementTypeLabel(announcement.type)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.announcementMeta}>
                            <View style={styles.metaRow}>
                                <Calendar size={14} color="#666" />
                                <Text style={styles.metaText}>{formatDate(announcement.date)}</Text>
                            </View>
                            {announcement.time && (
                                <View style={styles.metaRow}>
                                    <Clock size={14} color="#666" />
                                    <Text style={styles.metaText}>{formatTime(announcement.time)}</Text>
                                </View>
                            )}
                        </View>

                        <Text style={styles.announcementContent}>{announcement.content}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.subscriptionSection}>
                <Text style={styles.subscriptionTitle}>Stay Updated</Text>
                <Text style={styles.subscriptionText}>
                    <Text style={styles.bold}>WhatsApp Group:</Text> Join our community WhatsApp group for instant notifications.{'\n\n'}
                    <Text style={styles.bold}>Website:</Text> Visit ialfm.org for detailed announcements and updates.{'\n\n'}
                    <Text style={styles.bold}>Notice Board:</Text> Check the physical notice board at the masjid entrance.
                </Text>
            </View>

            <View style={styles.contactSection}>
                <Text style={styles.contactTitle}>Submit Announcements</Text>
                <Text style={styles.contactText}>
                    Community members can submit announcements for approval:
                </Text>
                <Text style={styles.contactInfo}>
                    📧 Email: announcements@ialfm.org{'\n'}
                    📞 Phone: Contact masjid administration{'\n'}
                    🏢 In Person: Visit the main office during business hours
                </Text>
                <Text style={styles.note}>
                    All announcements are subject to approval and must align with Islamic values and community guidelines.
                </Text>
            </View>
        </ScrollView>
    );
};

export default AnnouncementScreen;

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
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f0f8f0',
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
    },
    actionButtonText: {
        fontSize: 16,
        color: '#2E8B57',
        marginLeft: 8,
        fontWeight: '500',
    },
    announcementsSection: {
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
    announcementCard: {
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
    announcementHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    pinIcon: {
        marginRight: 8,
        transform: [{ rotate: '45deg' }],
    },
    announcementTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    pinnedTitle: {
        color: '#2E8B57',
    },
    announcementType: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    announcementTypeText: {
        fontSize: 12,
        color: 'white',
        fontWeight: '500',
    },
    announcementMeta: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 12,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 14,
        color: '#666',
    },
    announcementContent: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    subscriptionSection: {
        backgroundColor: '#e8f5e8',
        margin: 15,
        marginTop: 0,
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2E8B57',
    },
    subscriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 10,
    },
    subscriptionText: {
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
        marginBottom: 15,
    },
    note: {
        fontSize: 14,
        color: '#888',
        fontStyle: 'italic',
        lineHeight: 20,
    },
});