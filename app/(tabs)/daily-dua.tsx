import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Alert, Animated } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshCw } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { Dua, Duas } from '@/constants/Duas';

const STORAGE_KEYS = {
    DAILY_DUA: 'daily_dua',
    LAST_UPDATED: 'daily_dua_last_updated'
};

const DailyDuaScreen = () => {
    const [currentDua, setCurrentDua] = useState<Dua | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState('');
    const spinValue = useRef(new Animated.Value(0)).current;
    // Function to calculate time left until midnight
    const getTimeLeftString = () => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        const diff = midnight.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Update timer every second
    useEffect(() => {
        setTimeLeft(getTimeLeftString());
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeftString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Function to get a random dua
    const getRandomDua = (): Dua => {
        const randomIndex = Math.floor(Math.random() * Duas.length);
        return Duas[randomIndex];
    };

    // Function to check if it's a new day (after 12 AM)
    const isNewDay = (lastUpdated: string): boolean => {
        const lastDate = new Date(lastUpdated);
        const currentDate = new Date();

        // Reset time to start of day for comparison
        const lastDay = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
        const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        return currentDay.getTime() > lastDay.getTime();
    };

    // Function to load or generate daily dua
    const loadDailyDua = async () => {
        try {
            setIsLoading(true);

            const storedDua = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_DUA);
            const lastUpdated = await AsyncStorage.getItem(STORAGE_KEYS.LAST_UPDATED);

            if (storedDua && lastUpdated && !isNewDay(lastUpdated)) {
                // Use stored dua if it's still the same day
                setCurrentDua(JSON.parse(storedDua));
            } else {
                // Generate new dua for new day
                await generateNewDua();
            }
        } catch (error) {
            console.error('Error loading daily dua:', error);
            // Fallback to a random dua if storage fails
            setCurrentDua(getRandomDua());
        } finally {
            setIsLoading(false);
        }
    };

    // Function to generate and save new dua
    const generateNewDua = async () => {
        spinIcon();
        try {
            const newDua = getRandomDua();
            const currentTime = new Date().toISOString();

            await AsyncStorage.setItem(STORAGE_KEYS.DAILY_DUA, JSON.stringify(newDua));
            await AsyncStorage.setItem(STORAGE_KEYS.LAST_UPDATED, currentTime);

            setCurrentDua(newDua);
        } catch (error) {
            console.error('Error saving daily dua:', error);
            Alert.alert('Error', 'Failed to save daily dua. Please try again.');
        }
    };

    // Function to spin the refresh icon
    const spinIcon = () => {
        spinValue.setValue(0);
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    // Function to manually refresh dua (for testing or user preference)
    const refreshDua = () => {
        Alert.alert(
            'Refresh Daily Dua',
            'Are you sure you want to get a new dua? This will replace your current daily dua.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: generateNewDua
                }
            ]
        );
    };

    // Create the spin interpolation
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => {
        loadDailyDua();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2E8B57" />
                    <Text style={styles.loadingText}>Loading today's dua...</Text>
                </View>
            </View>
        );
    }

    if (!currentDua) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Failed to load dua. Please try again.</Text>
                <Pressable style={styles.refreshButton} onPress={loadDailyDua}>
                    <RefreshCw size={20} color="#fff" />
                    <Text style={styles.refreshButtonText}>Retry</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Daily Dua</Text>
                    <Text style={styles.subtitle}>
                        Your spiritual companion for today
                        {timeLeft && (
                            <Text style={styles.timerText}> · Resets in {timeLeft}</Text>
                        )}
                    </Text>
                    <Pressable style={styles.refreshIconButton} onPress={refreshDua}>
                        <Animated.View style={{ transform: [{ rotate: spin }] }}>
                            <RefreshCw size={20} color="#2E8B57" />
                        </Animated.View>
                    </Pressable>
                </View>

                <View style={styles.duaCard}>
                    <View style={styles.arabicContainer}>
                        <Text style={styles.arabicText}>{currentDua.arabic}</Text>
                    </View>

                    <View style={styles.translationContainer}>
                        <Text style={styles.sectionLabel}>Translation:</Text>
                        <Text style={styles.translationText}>{currentDua.translation}</Text>
                    </View>

                    <View style={styles.sourceContainer}>
                        <Text style={styles.sourceLabel}>Source:</Text>
                        <Text style={styles.sourceText}>{currentDua.source}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default DailyDuaScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    content: {
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#dc3545',
        marginBottom: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        position: 'relative',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    refreshIconButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 10,
    },
    duaCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 25,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    arabicContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#2E8B57',
    },
    arabicText: {
        fontSize: 24,
        textAlign: 'right',
        lineHeight: 40,
        color: '#333',
        fontWeight: '500',
    },
    translationContainer: {
        marginBottom: 20,
    },
    sourceContainer: {
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
        paddingTop: 15,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2E8B57',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    translationText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    sourceLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#888',
        marginBottom: 5,
    },
    sourceText: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    timerText: {
        color: '#2E8B57',
        fontWeight: '600',
        fontSize: 15,
    },
    refreshButton: {
        backgroundColor: '#2E8B57',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    refreshButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});
