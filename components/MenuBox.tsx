import Colors from '@/constants/Colors';
import { StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import { Text, View } from '@/components/Themed';

interface MenuItemProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    route: string;
    onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, description, icon, onPress }) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <Pressable
            style={[
                styles.menuItem,
                {
                    backgroundColor: colors.background,
                    borderColor: colors.tint,
                    shadowColor: colorScheme === 'dark' ? '#fff' : '#000',
                }
            ]}
            onPress={onPress}
            android_ripple={{ color: colors.tint + '20' }}
        >
            <View style={[styles.iconContainer, { backgroundColor: colors.tint }]}>
                {icon}
            </View>
            <Text style={[styles.menuTitle, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.menuDescription, { color: colors.text + '80' }]}>{description}</Text>
        </Pressable>
    );
};

export default MenuItem;

const styles = StyleSheet.create({
    menuTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
        textAlign: 'center',
    },
    menuDescription: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 16,
    },
    menuItem: {
        width: '48%',
        aspectRatio: 1,
        marginBottom: 16,
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
})