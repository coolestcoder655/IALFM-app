import { StyleSheet, ActivityIndicator, Animated, Easing } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Clock, MapPin } from 'lucide-react-native';
import { getPrayerTimes } from '@/apis/getPrayerTimes';
import { getLocation } from '@/apis/getLocation';
import { Text, View } from '@/components/Themed';
import { usePrayerTimes } from '@/context/prayerTimesContext';
import { useLocation } from '@/context/locationContext';

const PrayerTimesScreen = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const { prayerTimes, setPrayerTimes } = usePrayerTimes();
    const { coordinates, setCoordinates } = useLocation();
    const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFriday, setIsFriday] = useState(false);

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const currentPrayerScale = useRef(new Animated.Value(1)).current;
    const timeUpdateAnim = useRef(new Animated.Value(1)).current;

    // Animate entry on component mount
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                easing: Easing.out(Easing.back(1.2)),
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // Animate prayer transitions
    const animatePrayerTransition = () => {
        Animated.sequence([
            Animated.timing(currentPrayerScale, {
                toValue: 1.1,
                duration: 150,
                easing: Easing.elastic(1.2),
                useNativeDriver: true,
            }),
            Animated.timing(currentPrayerScale, {
                toValue: 1,
                duration: 400,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    };



    // Time update animation
    useEffect(() => {
        const interval = setInterval(() => {
            Animated.sequence([
                Animated.timing(timeUpdateAnim, {
                    toValue: 1.05,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(timeUpdateAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 60000); // Every minute
        return () => clearInterval(interval);
    }, []);

    // Update current time every second
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(timeInterval);
    }, []);

    useEffect(() => {
        // Check if today is Friday
        const today = new Date();
        setIsFriday(today.getDay() === 5); // 5 is Friday in JavaScript Date
    }, [])

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

        const checkCurrentPrayer = () => {
            if (!prayerTimes || prayerTimes.length === 0) return;

            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const currentTimeInMinutes = currentHour * 60 + currentMinute;

            let activePrayer = null;

            // Convert prayer times to minutes for comparison
            const prayerTimesWithMinutes = prayerTimes.map(prayer => {
                // Use regex to parse time format like "4:52 AM" or "1:15 PM"
                const timeMatch = prayer.time.match(/(\d+):(\d+)\s*(AM|PM)/i);

                if (!timeMatch) {
                    console.log(`Failed to parse time in checkCurrentPrayer: ${prayer.time}`);
                    return {
                        name: prayer.name,
                        timeInMinutes: NaN,
                        originalTime: prayer.time
                    };
                }

                const hours = parseInt(timeMatch[1]);
                const minutes = parseInt(timeMatch[2]);
                const period = timeMatch[3].toUpperCase();

                let hour24 = hours;

                if (period === 'PM' && hours !== 12) {
                    hour24 += 12;
                } else if (period === 'AM' && hours === 12) {
                    hour24 = 0;
                }

                return {
                    name: prayer.name,
                    timeInMinutes: hour24 * 60 + minutes,
                    originalTime: prayer.time
                };
            });

            // Sort by time to ensure proper order
            prayerTimesWithMinutes.sort((a, b) => a.timeInMinutes - b.timeInMinutes);

            // Much more generous current prayer detection
            for (let i = 0; i < prayerTimesWithMinutes.length; i++) {
                const prayer = prayerTimesWithMinutes[i];

                // Very wide window: 30 minutes before to 90 minutes after prayer time
                const windowStart = prayer.timeInMinutes - 30;
                const windowEnd = prayer.timeInMinutes + 90;

                // If we're in this prayer's window
                if (currentTimeInMinutes >= windowStart && currentTimeInMinutes <= windowEnd) {
                    activePrayer = prayer.name;
                    break;
                }
            }

            // If no prayer found with the tight window, use a broader approach
            // Find which prayer period we're currently in
            if (!activePrayer) {
                for (let i = 0; i < prayerTimesWithMinutes.length; i++) {
                    const currentPrayerTime = prayerTimesWithMinutes[i];
                    const nextPrayerTime = prayerTimesWithMinutes[i + 1];

                    // If current time is after this prayer and before the next prayer
                    if (currentTimeInMinutes >= currentPrayerTime.timeInMinutes) {
                        if (!nextPrayerTime || currentTimeInMinutes < nextPrayerTime.timeInMinutes) {
                            activePrayer = currentPrayerTime.name;
                            break;
                        }
                    }
                }
            }

            // If no prayer found with the wide window, try a simpler approach
            if (!activePrayer) {
                // Find the most recent prayer that has passed
                for (let i = prayerTimesWithMinutes.length - 1; i >= 0; i--) {
                    const prayer = prayerTimesWithMinutes[i];

                    // If current time is within 2 hours after this prayer
                    if (currentTimeInMinutes >= prayer.timeInMinutes &&
                        currentTimeInMinutes <= prayer.timeInMinutes + 120) {
                        activePrayer = prayer.name;
                        break;
                    }
                }
            }

            // Special case: after midnight but before Fajr, highlight Isha
            if (!activePrayer && prayerTimesWithMinutes.length > 1) {
                const fajr = prayerTimesWithMinutes[0];
                const isha = prayerTimesWithMinutes[prayerTimesWithMinutes.length - 1];
                if (currentTimeInMinutes < fajr.timeInMinutes) {
                    activePrayer = isha.name;
                }
            }

            setCurrentPrayer(activePrayer);

            // Trigger animation when current prayer changes
            if (activePrayer && activePrayer !== currentPrayer) {
                animatePrayerTransition();
            }
        };

        // Check immediately
        checkCurrentPrayer();

        // Then check every 30 seconds for more responsive updates
        const interval = setInterval(checkCurrentPrayer, 30 * 1000);
        return () => clearInterval(interval);
    }, [prayerTimes]); // Depend on prayerTimes so it updates when prayer times change

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
        if (!prayerTimes || prayerTimes.length === 0) {
            return { next: 'Loading...', timeLeft: 0 };
        }

        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        // Convert prayer times to minutes for comparison
        const prayerTimesInMinutes = prayerTimes.map((prayer, index) => {
            // Use regex to parse time format like "4:52 AM" or "1:15 PM"
            const timeMatch = prayer.time.match(/(\d+):(\d+)\s*(AM|PM)/i);

            if (!timeMatch) {
                console.log(`Failed to parse time: ${prayer.time}`);
                return NaN;
            }

            const hours = parseInt(timeMatch[1]);
            const minutes = parseInt(timeMatch[2]);
            const period = timeMatch[3].toUpperCase();

            let hour24 = hours;

            if (period === 'PM' && hours !== 12) {
                hour24 += 12;
            } else if (period === 'AM' && hours === 12) {
                hour24 = 0;
            }

            const timeInMinutes = hour24 * 60 + minutes;
            return timeInMinutes;
        });

        // Find the next prayer today
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
        const fajrTomorrowMinutes = prayerTimesInMinutes[0]; // Fajr is the first prayer
        return {
            next: prayerTimes[0].name, // Fajr
            timeLeft: minutesUntilMidnight + fajrTomorrowMinutes,
        };
    };

    const getCurrentPrayerTimeLeft = () => {
        if (!prayerTimes || prayerTimes.length === 0 || !currentPrayer) {
            return 0;
        }

        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        // Convert prayer times to minutes for comparison
        const prayerTimesInMinutes = prayerTimes.map((prayer) => {
            const timeMatch = prayer.time.match(/(\d+):(\d+)\s*(AM|PM)/i);

            if (!timeMatch) return NaN;

            const hours = parseInt(timeMatch[1]);
            const minutes = parseInt(timeMatch[2]);
            const period = timeMatch[3].toUpperCase();

            let hour24 = hours;

            if (period === 'PM' && hours !== 12) {
                hour24 += 12;
            } else if (period === 'AM' && hours === 12) {
                hour24 = 0;
            }

            return hour24 * 60 + minutes;
        });

        // Find the next prayer after the current prayer
        for (let i = 0; i < prayerTimesInMinutes.length; i++) {
            if (currentTimeInMinutes < prayerTimesInMinutes[i]) {
                return prayerTimesInMinutes[i] - currentTimeInMinutes;
            }
        }

        // If past all prayers, time until Fajr tomorrow
        const minutesUntilMidnight = 24 * 60 - currentTimeInMinutes;
        const fajrTomorrowMinutes = prayerTimesInMinutes[0];
        return minutesUntilMidnight + fajrTomorrowMinutes;
    };

    const formatTimeLeft = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const nextPrayer = getCurrentPrayerStatus();
    const currentPrayerTimeLeft = getCurrentPrayerTimeLeft();

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
        <Animated.ScrollView
            style={[styles.container, {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
            }]}
        >
            <View style={styles.header}>
                <Clock size={32} color="white" />
                <Text style={styles.headerTitle}>Prayer Times</Text>
                <Text style={styles.headerSubtitle}>Lewisville & Flower Mound</Text>
            </View>

            <Animated.View style={[styles.currentTimeSection, {
                transform: [{ scale: timeUpdateAnim }]
            }]}>
                <Text style={styles.currentTimeLabel}>Current Time</Text>
                <Text style={styles.currentTime}>
                    {currentTime.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })}
                </Text>
            </Animated.View>

            {isFriday && (
                <Animated.View style={[styles.fridaySection, {
                    opacity: fadeAnim,
                    transform: [
                        { scale: fadeAnim },
                        {
                            rotateX: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['90deg', '0deg']
                            })
                        }
                    ]
                }]}>
                    <Text style={styles.fridayTitle}>Friday (Jummah) Prayer</Text>
                    <Text style={styles.fridayTime}>1:30 PM</Text>
                    <Text style={styles.fridayNote}>
                        Khutbah starts at 1:30 PM{'\n'}
                        Please arrive early for better seating
                    </Text>
                </Animated.View>
            )}

            {currentPrayer && (
                <View style={styles.currentPrayerSection}>
                    <Text style={styles.currentPrayerLabel}>Current Prayer</Text>
                    <Text style={styles.currentPrayerName}>{currentPrayer}</Text>
                    <Text style={styles.currentPrayerTimeLeft}>
                        ends in {formatTimeLeft(currentPrayerTimeLeft)}
                    </Text>
                </View>
            )}

            <View style={styles.nextPrayerSection}>
                <Text style={styles.nextPrayerLabel}>Next Prayer</Text>
                <Text style={styles.nextPrayerName}>{nextPrayer.next}</Text>
                <Text style={styles.timeLeft}>
                    in {formatTimeLeft(nextPrayer.timeLeft)}
                </Text>
            </View>

            <View style={styles.prayerTimesSection}>
                <Text style={styles.sectionTitle}>Today's Prayer Times</Text>
                {prayerTimes.map((prayer, index) => {
                    const isCurrentPrayer = currentPrayer === prayer.name;
                    const isNextPrayer = nextPrayer.next === prayer.name;

                    if (isCurrentPrayer) {
                        return (
                            <View
                                key={prayer.name}
                                style={styles.currentPrayerTimeRow}
                            >
                                <View style={isCurrentPrayer ? [styles.currentPrayerInfo, { backgroundColor: '#2E8B57' }] : styles.currentPrayerInfo}>
                                    <prayer.icon size={28} color="#ffffff" />
                                    <View style={isCurrentPrayer ? [styles.prayerNameWithBadge, { backgroundColor: '#2E8B57' }] : styles.prayerNameWithBadge}>
                                        <Text style={styles.currentPrayerItemName}>{prayer.name}</Text>
                                        <View style={styles.currentBadge}>
                                            <Text style={styles.currentLabel}>NOW</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.currentPrayerTimeText}>{prayer.time}</Text>
                            </View>
                        );
                    } else if (isNextPrayer) {
                        return (
                            <Animated.View
                                key={prayer.name}
                                style={[styles.nextPrayerTimeRow, {
                                    opacity: fadeAnim,
                                    transform: [
                                        {
                                            translateY: fadeAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [20, 0]
                                            })
                                        }
                                    ]
                                }]}
                            >
                                <View style={isNextPrayer ? [styles.nextPrayerInfo, { backgroundColor: '#E3F2FD' }] : styles.nextPrayerInfo}>
                                    <prayer.icon size={26} color="#1565C0" />
                                    <View style={isNextPrayer ? [styles.prayerNameWithBadge, { backgroundColor: '#E3F2FD' }] : styles.prayerNameWithBadge}>
                                        <Text style={styles.nextPrayerNameText}>{prayer.name}</Text>
                                        <View style={styles.nextBadge}>
                                            <Text style={styles.nextLabel}>NEXT</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.nextPrayerTimeText}>{prayer.time}</Text>
                            </Animated.View>
                        );
                    } else {
                        return (
                            <Animated.View
                                key={prayer.name}
                                style={[styles.prayerTimeRow, {
                                    opacity: fadeAnim,
                                    transform: [{
                                        translateY: fadeAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [20, 0]
                                        })
                                    }]
                                }]}
                            >
                                <View style={styles.prayerInfo}>
                                    <prayer.icon size={24} color="#2E8B57" />
                                    <Text style={styles.prayerName}>{prayer.name}</Text>
                                </View>
                                <Text style={styles.prayerTime}>{prayer.time}</Text>
                            </Animated.View>
                        );
                    }
                })}
            </View>

            <View style={styles.noticeSection}>
                <Text style={styles.noticeTitle}>Important Notice</Text>
                <Text style={styles.noticeText}>
                    Prayer times are calculated for Lewisville, TX area.{'\n'}
                    Times may vary slightly based on your exact location.{'\n'}
                    Please check with the masjid for any special announcements.
                </Text>
            </View>
        </Animated.ScrollView>
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
    currentPrayerSection: {
        backgroundColor: '#fff3e0',
        margin: 15,
        marginTop: 0,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ff9800',
    },
    currentPrayerLabel: {
        fontSize: 16,
        color: '#ff9800',
        marginBottom: 5,
    },
    currentPrayerName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff9800',
    },
    currentPrayerTimeLeft: {
        fontSize: 16,
        color: '#ff9800',
        marginTop: 5,
    },
    nextPrayerSection: {
        margin: 15,
        marginTop: 0,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
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
        paddingVertical: 16,
        paddingHorizontal: 15,
        backgroundColor: '#2E8B57',
        borderRadius: 20,
        marginVertical: 6,
        marginHorizontal: 4,
        elevation: 6,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        borderWidth: 3,
        borderColor: '#1e5a3a',
    },
    nextPrayerTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        backgroundColor: '#E3F2FD',
        borderRadius: 20,
        marginVertical: 4,
        marginHorizontal: 2,
        borderWidth: 2,
        borderColor: '#1565C0',
        elevation: 2,
    },
    prayerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentPrayerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    nextPrayerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    prayerNameWithBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    prayerName: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
    },
    currentPrayerItemName: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    nextPrayerNameText: {
        fontSize: 19,
        color: '#1565C0',
        fontWeight: '600',
    },
    currentBadge: {
        marginLeft: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 35,
    },
    nextBadge: {
        marginLeft: 8,
        backgroundColor: 'rgba(21, 101, 192, 0.15)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#1565C0',
        minWidth: 35,
    },
    currentLabel: {
        fontSize: 9,
        color: '#2E8B57',
        fontWeight: 'bold',
        letterSpacing: 0.3,
        textAlign: 'center',
    },
    nextLabel: {
        fontSize: 9,
        color: '#1565C0',
        fontWeight: 'bold',
        letterSpacing: 0.3,
        textAlign: 'center',
    },
    prayerTime: {
        fontSize: 18,
        color: '#2E8B57',
        fontWeight: 'bold',
    },
    currentPrayerTimeText: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    nextPrayerTimeText: {
        fontSize: 19,
        color: '#1565C0',
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
    debugSection: {
        backgroundColor: '#fff3cd',
        margin: 15,
        marginTop: 0,
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ffc107',
    },
    debugTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#856404',
        marginBottom: 8,
    },
    debugText: {
        fontSize: 14,
        color: '#856404',
        marginBottom: 4,
    },
});
