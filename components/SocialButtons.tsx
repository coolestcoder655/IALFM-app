import React from 'react';
import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react-native';


const SocialButtons: React.FC = () => {
    const openFacebook = () => {
        Linking.openURL('https://www.facebook.com/ialfmmasjid/');
    };

    const openYoutube = () => {
        Linking.openURL('https://youtube.com/@ialfmmasjid?si=I2Riex-EsQRPNm2F');
    };
    const openTwitter = () => {
        Linking.openURL('https://x.com/ialfm');
    };

    const openInstagram = () => {
        Linking.openURL('https://www.instagram.com/ialfm_masjid/?utm_source=ig_web_button_share_sheet');
    };

    const shareViaEmail = () => {
        Linking.openURL('mailto:?subject=Check out IALFM&body=I wanted to share the Islamic Association of Lewisville and Flower Mound with you. Visit: https://ialfm.org');
    };


    return (
        <View style={styles.socialButtonsContainer}>
            <Pressable style={[styles.socialButton, { backgroundColor: '#1877F2' }]} onPress={openFacebook}>
                <Facebook size={24} color="white" />
                <Text style={styles.socialButtonText}>Facebook</Text>
            </Pressable>

            <Pressable style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]} onPress={openTwitter}>
                <Twitter size={24} color="white" />
                <Text style={styles.socialButtonText}>Twitter</Text>
            </Pressable>

            <Pressable style={[styles.socialButton, { backgroundColor: '#E4405F' }]} onPress={openInstagram}>
                <Instagram size={24} color="white" />
                <Text style={styles.socialButtonText}>Instagram</Text>
            </Pressable>

            <Pressable style={[styles.socialButton, { backgroundColor: '#FF0000' }]} onPress={openYoutube}>
                <Youtube size={24} color="white" />
                <Text style={styles.socialButtonText}>YouTube</Text>
            </Pressable>

            <Pressable style={[styles.socialButton, { backgroundColor: '#34495E' }]} onPress={shareViaEmail}>
                <Mail size={24} color="white" />
                <Text style={styles.socialButtonText}>Share via Email</Text>
            </Pressable>
        </View>
    );
};

export default SocialButtons;

const styles = StyleSheet.create({
    socialButtonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        minWidth: '48%',
        marginBottom: 10,
    },
    socialButtonText: {
        fontSize: 14,
        color: 'white',
        fontWeight: '600',
        marginLeft: 8,
    },
});
