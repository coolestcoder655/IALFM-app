import { createContext, useContext, useState, ReactNode } from 'react';

interface InternetContextType {
    isConnected: boolean;
    setIsConnected: (status: boolean) => void;
};

const InternetContext = createContext<InternetContextType | undefined>(undefined);

export const InternetProvider = ({ children }: { children: ReactNode }) => {
    const [isConnected, setIsConnected] = useState<boolean>(navigator.onLine);

    return (
        <InternetContext.Provider value={{ isConnected, setIsConnected }}>
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