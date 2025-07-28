import { createContext, useContext, useState, ReactNode } from 'react';
import { Coordinates } from '@/apis/getLocation';

interface LocationContextType {
    coordinates: Coordinates | null;
    setCoordinates: (coords: Coordinates | null) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

    return (
        <LocationContext.Provider value={{ coordinates, setCoordinates }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};