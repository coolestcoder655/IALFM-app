import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react-native';
import { getPrayerTimes } from '@/apis/getPrayerTimes';
import { getLocation } from '@/apis/getLocation';
import { Text, View } from '@/components/Themed';
import { usePrayerTimes } from '@/context/prayerTimesContext';
import { useLocation } from '@/context/locationContext';


const PrayerTimesScreen = () => {
    const currentTime = new Date();
    const { prayerTimes, setPrayerTimes } = usePrayerTimes();
    const { coordinates, setCoordinates } = useLocation();
    const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch location on component mount
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const location = await getLocation();
                if (location) {
                    setCoordinates(location);
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching location:', error);
                setIsLoading(false);
            }
        };

        if (!coordinates) {
            fetchLocation();
        }
    }, [coordinates, setCoordinates]);

    useEffect(() => {
        const interval = setInterval(() => {
            prayerTimes.forEach(prayer => {
                if (prayer.time === currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })) {
                    setCurrentPrayer(prayer.name);
                }
            });
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        let isMounted = true;
        if (coordinates) {
            setIsLoading(true);
            getPrayerTimes(coordinates).then((data) => {
                if (isMounted && data) {
                    setPrayerTimes(data);
                    setIsLoading(false);
                }
            }).catch(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });
        }
        return () => {
            isMounted = false;
        };
    }, [coordinates]);

    const getCurrentPrayerStatus = () => {
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        // Convert prayer times to minutes for comparison
        const prayerTimesInMinutes = [
            5 * 60 + 45,  // Fajr
            12 * 60 + 35, // Dhuhr
            16 * 60 + 20, // Asr
            19 * 60 + 15, // Maghrib
            20 * 60 + 45, // Isha
        ];

        for (let i = 0; i < prayerTimesInMinutes.length; i++) {
            if (currentTimeInMinutes < prayerTimesInMinutes[i]) {
                return {
                    next: prayerTimes[i].name,
                    timeLeft: prayerTimesInMinutes[i] - currentTimeInMinutes,
                };
            }
        }

        // If past all prayers, next is Fajr tomorrow
        const minutesUntilMidnight = 24 * 60 - currentTimeInMinutes;
        const minutesFromMidnightToFajr = 5 * 60 + 45;
        return {
            next: 'Fajr',
            timeLeft: minutesUntilMidnight + minutesFromMidnightToFajr,
        };
    };

    const formatTimeLeft = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const nextPrayer = getCurrentPrayerStatus();

    // Show loading screen while fetching location or prayer times
    if (!coordinates || isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <View style={styles.loadingContent}>
                    <View style={styles.logoContainer}>
                        <MapPin size={48} color="#2E8B57" />
                    </View>
                    <ActivityIndicator size="large" color="#2E8B57" style={styles.spinner} />
                    <Text style={styles.loadingText}>
                        {!coordinates ? 'Getting your location...' : 'Loading prayer times...'}
                    </Text>
                    <Text style={styles.loadingSubtext}>
                        Please ensure location permissions are enabled
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Clock size={32} color="white" />
                <Text style={styles.headerTitle}>Prayer Times</Text>
                <Text style={styles.headerSubtitle}>Lewisville & Flower Mound</Text>
            </View>

            <View style={styles.currentTimeSection}>
                <Text style={styles.currentTimeLabel}>Current Time</Text>
                <Text style={styles.currentTime}>
                    {currentTime.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })}
                </Text>
            </View>

            <View style={styles.nextPrayerSection}>
                <Text style={styles.nextPrayerLabel}>Next Prayer</Text>
                <Text style={styles.nextPrayerName}>{nextPrayer.next}</Text>
                <Text style={styles.timeLeft}>
                    in {formatTimeLeft(nextPrayer.timeLeft)}
                </Text>
            </View>

            <View style={styles.prayerTimesSection}>
                <Text style={styles.sectionTitle}>Today's Prayer Times</Text>
                {prayerTimes.map((prayer, _) => (
                    <View key={prayer.name} style={currentPrayer === prayer.name ? styles.currentPrayerTimeRow : styles.prayerTimeRow}>
                        <View style={styles.prayerInfo}>
                            <prayer.icon size={24} color="#2E8B57" />
                            <Text style={styles.prayerName}>{prayer.name}</Text>
                        </View>
                        <Text style={styles.prayerTime}>{prayer.time}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.fridaySection}>
                <Text style={styles.fridayTitle}>Friday (Jummah) Prayer</Text>
                <Text style={styles.fridayTime}>1:30 PM</Text>
                <Text style={styles.fridayNote}>
                    Khutbah starts at 1:30 PM{'\n'}
                    Please arrive early for better seating
                </Text>
            </View>

            <View style={styles.noticeSection}>
                <Text style={styles.noticeTitle}>Important Notice</Text>
                <Text style={styles.noticeText}>
                    Prayer times are calculated for Lewisville, TX area.{'\n'}
                    Times may vary slightly based on your exact location.{'\n'}
                    Please check with the masjid for any special announcements.
                </Text>
            </View>
        </ScrollView>
    );
};

export default PrayerTimesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    loadingContent: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        minWidth: 280,
    },
    logoContainer: {
        backgroundColor: '#e8f5e8',
        borderRadius: 50,
        padding: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#2E8B57',
    },
    spinner: {
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2E8B57',
        textAlign: 'center',
        marginBottom: 8,
    },
    loadingSubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
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
    currentTimeSection: {
        backgroundColor: 'white',
        margin: 15,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    currentTimeLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    currentTime: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2E8B57',
    },
    nextPrayerSection: {
        backgroundColor: '#e8f5e8',
        margin: 15,
        marginTop: 0,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#2E8B57',
    },
    nextPrayerLabel: {
        fontSize: 16,
        color: '#2E8B57',
        marginBottom: 5,
    },
    nextPrayerName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E8B57',
    },
    timeLeft: {
        fontSize: 16,
        color: '#2E8B57',
        marginTop: 5,
    },
    prayerTimesSection: {
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 15,
    },
    prayerTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    currentPrayerTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#2E8B57',
        backgroundColor: '#e8f5e8',
    },
    prayerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    prayerName: {
        fontSize: 18,
        color: '#333',
        marginLeft: 12,
        fontWeight: '500',
    },
    prayerTime: {
        fontSize: 18,
        color: '#2E8B57',
        fontWeight: 'bold',
    },
    fridaySection: {
        backgroundColor: '#fff3e0',
        margin: 15,
        marginTop: 0,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ff9800',
    },
    fridayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff9800',
        marginBottom: 5,
    },
    fridayTime: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff9800',
        marginBottom: 10,
    },
    fridayNote: {
        fontSize: 14,
        color: '#ff9800',
        textAlign: 'center',
        lineHeight: 20,
    },
    noticeSection: {
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
    noticeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 10,
    },
    noticeText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});
