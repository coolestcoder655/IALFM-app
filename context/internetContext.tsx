import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface InternetContextType {
    isConnected: boolean | null;
    setIsConnected: (status: boolean | null) => void;
    checkConnection: () => Promise<void>;
};

const InternetContext = createContext<InternetContextType | undefined>(undefined);

export const InternetProvider = ({ children }: { children: ReactNode }) => {
    const [isConnected, setIsConnected] = useState<boolean | null>(true); // Start optimistically connected

    const checkConnection = async () => {
        try {
            // Add timeout to prevent hanging
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Network check timeout')), 5000)
            );

            const networkPromise = NetInfo.fetch();
            const state = await Promise.race([networkPromise, timeoutPromise]) as any;
            const connected = state.isConnected && state.isInternetReachable !== false;
            setIsConnected(connected);
        } catch (error) {
            console.error('Error checking connection:', error);
            setIsConnected(true); // Default to connected to prevent blocking
        }
    };

    useEffect(() => {
        // Defer initial connection check to prevent blocking app startup
        const checkInitialConnection = async () => {
            try {
                // Add timeout to prevent hanging on app startup
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Initial network check timeout')), 3000)
                );

                const networkPromise = NetInfo.fetch();
                const state = await Promise.race([networkPromise, timeoutPromise]) as any;
                setIsConnected(state.isConnected && state.isInternetReachable !== false);
            } catch (error) {
                console.error('Error checking initial connection:', error);
                // Fallback to navigator.onLine if available, otherwise assume connected
                setIsConnected(navigator?.onLine ?? true);
            }
        };

        // Delay initial check to allow app to load first
        const timer = setTimeout(checkInitialConnection, 2000);

        // Subscribe to network state changes
        const handleConnectivityChange = (state: any) => {
            console.log('Connection type:', state.type);
            console.log('Is connected?', state.isConnected);
            console.log('Is internet reachable?', state.isInternetReachable);
            setIsConnected(state.isConnected && state.isInternetReachable !== false);
        };

        const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

        return () => {
            clearTimeout(timer);
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    return (
        <InternetContext.Provider value={{ isConnected, setIsConnected, checkConnection }}>
            {children}
        </InternetContext.Provider>
    );
};

export const useInternetStatus = () => {
    const context = useContext(InternetContext);
    if (!context) {
        throw new Error('useInternetStatus must be used within an InternetProvider');
    }
    return context;
}