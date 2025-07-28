import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { PrayerTime } from '@/apis/getPrayerTimes';

type PrayerTimesContextType = {
    prayerTimes: PrayerTime[];
    setPrayerTimes: Dispatch<SetStateAction<PrayerTime[]>>;
};

const PrayerTimesContext = createContext<PrayerTimesContextType | undefined>(undefined);

export const PrayerTimesProvider = ({ children }: { children: ReactNode }) => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);

    return (
        <PrayerTimesContext.Provider value={{ prayerTimes, setPrayerTimes }}>
            {children}
        </PrayerTimesContext.Provider>
    );
};

export const usePrayerTimes = () => {
    const context = useContext(PrayerTimesContext);
    if (!context) {
        throw new Error('usePrayerTimes must be used within a PrayerTimesProvider');
    }
    return context;
};