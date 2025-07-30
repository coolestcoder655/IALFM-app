import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, Wallet, XCircle, Lock, Megaphone } from 'lucide-react-native';

const itemMargin = 15;

const MenuScreen = () => {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Menu</Text>
                <Text style={styles.subtitle}>View Additional Pages</Text>
            </View>
            <View style={styles.grid}>
                {/* Row 1 */}
                <Pressable
                    style={({ pressed }) => [styles.square, pressed && styles.squarePressed]}
                    onPress={() => router.navigate('/prayer-times')}
                >
                    <Phone size={28} color={'#2E8B57'} />
                    <Text style={styles.label}>Prayer Times</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.square, pressed && styles.squarePressed]}
                    onPress={() => router.navigate('/daily-dua')}
                >
                    <Wallet size={28} color={'#2E8B57'} />
                    <Text style={styles.label}>Daily Dua</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.square, pressed && styles.squarePressed]}
                    onPress={() => router.navigate('/events')}
                >
                    <XCircle size={28} color={'#2E8B57'} />
                    <Text style={styles.label}>Events</Text>
                </Pressable>
                {/* Row 2 */}
                <Pressable
                    style={({ pressed }) => [styles.square, pressed && styles.squarePressed]}
                    onPress={() => router.navigate('/donate')}
                >
                    <Phone size={28} color={'#2E8B57'} />
                    <Text style={styles.label}>Donate</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.square, pressed && styles.squarePressed]}
                    onPress={() => router.navigate('/programs')}
                >
                    <Wallet size={28} color={'#2E8B57'} />
                    <Text style={styles.label}>Programs</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.square, pressed && styles.squarePressed]}
                    onPress={() => router.navigate('/community')}
                >
                    <Lock size={28} color={'#2E8B57'} />
                    <Text style={styles.label}>Community</Text>
                </Pressable>
                {/* Row 3 */}
                <Pressable
                    style={({ pressed }) => [styles.square, pressed && styles.squarePressed]}
                    onPress={() => router.navigate('/announcements')}
                >
                    <Megaphone size={28} color={'#2E8B57'} />
                    <Text style={styles.label}>Announcements</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default MenuScreen;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2E8B57',
        padding: 30,
        alignItems: 'center',
        marginBottom: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        opacity: 0.9,
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
    },
    square: {
        minWidth: 90,
        minHeight: 90,
        margin: itemMargin / 2,
        backgroundColor: 'transparent',
        borderRadius: 14,
        borderWidth: 3,
        borderColor: '#2E8B57',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 4,
        elevation: 2,
        transitionDuration: '100ms',
        paddingVertical: 18,
        paddingHorizontal: 18,
        alignSelf: 'flex-start',
    },
    squarePressed: {
        opacity: 0.7,
        transform: [{ scale: 0.97 }],
    },
    label: {
        fontSize: 25,
        fontWeight: '600',
        color: '#2E8B57',
        textAlign: 'center',
        marginTop: 6,
    },
});
