import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WifiOff } from 'lucide-react-native';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useInternetStatus } from '@/context/internetContext';
import returnInternetStatus from '@/apis/checkInternet';


const IsOfflineScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { setIsConnected } = useInternetStatus();
    const router = useRouter();


    const handleRetry = async () => {
        setLoading(true);
        try {
            const status = await returnInternetStatus();
            setIsConnected(status);
            if (status) {
                // Navigate back to the previous screen or home
                handleGoBack();
            } else {
                alert('Still offline. Please check your connection.');
            }
        } catch (error) {
            console.error('Error checking internet status:', error);
            alert('Failed to check internet status. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        router.navigate('/');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <WifiOff size={64} color="#e74c3c" />
                </View>
                <Text style={styles.title}>No Internet Connection</Text>
                <Text style={styles.message}>
                    It seems you're currently offline. Please check your internet connection to continue using the app.
                </Text>
                <View style={styles.steps}>
                    <Text style={styles.stepTitle}>Try:</Text>
                    <Text style={styles.step}>• Check your WiFi or mobile data</Text>
                    <Text style={styles.step}>• Move to an area with better signal</Text>
                    <Text style={styles.step}>• Restart your connection</Text>
                </View>

                <View style={{ marginTop: 28, width: '100%' }}>
                    <TouchableOpacity
                        style={[styles.retryConnectionButton, { opacity: loading ? 0.7 : 1, }]}
                        onPress={handleRetry}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>
                                Retry Connection
                            </Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.goBackButton}
                        onPress={handleGoBack}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.goBackButtonText}>
                            Go Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default IsOfflineScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    content: {
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
        maxWidth: 350,
    },
    iconContainer: {
        backgroundColor: '#ffeaea',
        borderRadius: 50,
        padding: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#e74c3c',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#e74c3c',
        textAlign: 'center',
        marginBottom: 16,
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    steps: {
        alignSelf: 'stretch',
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    step: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
        lineHeight: 20,
    },
    retryConnectionButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 5
    },
    goBackButton: {
        backgroundColor: 'transparent',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
        borderWidth: 2,
        borderColor: '#e74c3c',
    },
    goBackButtonText: {
        color: '#e74c3c',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
