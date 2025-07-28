import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Alert, Animated } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshCw } from 'lucide-react-native';
import { Pressable } from 'react-native';

interface Dua {
    arabic: string;
    transliteration: string;
    translation: string;
    source: string;
}

const DUAS: Dua[] = [
    {
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatika",
        translation: "O Allah, help me to remember You, to thank You, and to worship You in the best manner.",
        source: "Sunan Abu Dawood"
    },
    {
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbana atina fi'd-dunya hasanatan wa fi'l-akhirati hasanatan wa qina 'adhab an-nar",
        translation: "Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire.",
        source: "Quran 2:201"
    },
    {
        arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي وَوَسِّعْ لِي فِي دَارِي وَبَارِكْ لِي فِيمَا رَزَقْتَنِي",
        transliteration: "Allahumma ighfir li dhanbi wa wassi' li fi dari wa barik li fima razaqtani",
        translation: "O Allah, forgive my sins, expand my home for me, and bless what You have provided for me.",
        source: "Sunan at-Tirmidhi"
    },
    {
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
        transliteration: "Rabbi ishrah li sadri wa yassir li amri",
        translation: "My Lord, expand my chest and ease my affairs.",
        source: "Quran 20:25-26"
    },
    {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
        transliteration: "Allahumma inni as'aluka'l-huda wa't-tuqa wa'l-'afafa wa'l-ghina",
        translation: "O Allah, I ask You for guidance, piety, chastity, and independence.",
        source: "Sahih Muslim"
    },
    {
        arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا",
        transliteration: "Rabbana la tu'akhidhna in nasina aw akhta'na",
        translation: "Our Lord, do not impose blame upon us if we forget or make mistakes.",
        source: "Quran 2:286"
    },
    {
        arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي",
        transliteration: "Allahumma aslih li dini'lladhi huwa 'ismatu amri",
        translation: "O Allah, set right my religion which is the safeguard of my affairs.",
        source: "Sahih Muslim"
    },
    {
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
        transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin",
        translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes.",
        source: "Quran 25:74"
    },
    {
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Allahumma barik lana fima razaqtana wa qina 'adhab an-nar",
        translation: "O Allah, bless what You have provided for us and save us from the punishment of the Fire.",
        source: "Sunan Abu Dawood"
    },
    {
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ",
        transliteration: "Rabbi awzi'ni an ashkura ni'mataka'llati an'amta 'alayya",
        translation: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me.",
        source: "Quran 27:19"
    }
];

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
        const randomIndex = Math.floor(Math.random() * DUAS.length);
        return DUAS[randomIndex];
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
        spinIcon(); // Spin immediately when pressed
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

                    <View style={styles.transliterationContainer}>
                        <Text style={styles.sectionLabel}>Transliteration:</Text>
                        <Text style={styles.transliterationText}>{currentDua.transliteration}</Text>
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
    transliterationContainer: {
        marginBottom: 20,
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
    transliterationText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#555',
        lineHeight: 24,
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

export default DailyDuaScreen;
