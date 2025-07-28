import { Sunrise, Sun, Sunset, Moon } from "lucide-react-native";
import getDate from "./getDate";
import type { Coordinates } from "./getLocation";

// https://api.aladhan.com/v1/timings/2025-07-28?latitude=40.7128&longitude=-74.0060&method=2&madhab=1

interface AladhanResponse {
  code: number; // e.g. 200
  status: string; // e.g. "OK"
  data: {
    timings: {
      Fajr: string; // "04:39"
      Sunrise: string; // "06:02"
      Dhuhr: string; // "13:08"
      Asr: string; // "17:00"
      Maghrib: string; // "20:07"
      Isha: string; // "21:31"
      Imsak: string; // "04:29"
      Midnight: string; // "00:08"
    };
    date: {
      readable: string; // "28 Jul 2025"
      timestamp: string; // Unix timestamp, e.g. "1753680000"
      gregorian: {
        date: string; // "28-07-2025"
        format: string;
        day: string;
        weekday: { en: string };
        month: { number: number; en: string };
        year: string;
      };
      hijri: {
        date: string; // "2-02-1447"
        format: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string };
        year: string;
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
      };
      latitudeAdjustmentMethod: string; // "ANGLE_BASED" | "MIDDLE_OF_THE_NIGHT" etc.
      midnightMode: string;
      school: string; // "Shafi" | "Hanafi"
      offset: Record<string, number>;
    };
  };
}

interface PrayerTime {
  name: string;
  time: string;
  icon: React.ComponentType<any>;
}

function to12Hour(time24: string): string {
  const [h, m] = time24.split(":");
  return new Date(0, 0, 0, Number(h), Number(m)).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const getPrayerTimes = async (
  coordinates: Coordinates
): Promise<PrayerTime[] | undefined> => {
  const date = await getDate();

  if (!date) {
    console.error("Could not retrieve date. Please check your system time.");
    return;
  }

  if (!coordinates) {
    console.log(
      "Could not retrieve location. Please check permissions. If permissions are granted, please open an issue at https://github.com/coolestcoder655/IALFM-app"
    );
    return;
  }

  const url = `https://api.aladhan.com/v1/timings/${date}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&method=2&madhab=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: AladhanResponse = await response.json();

    const fajr: PrayerTime = {
      name: "Fajr",
      time: to12Hour(data.data.timings.Fajr),
      icon: Sunrise,
    };
    const dhuhr: PrayerTime = {
      name: "Dhuhr",
      time: to12Hour(data.data.timings.Dhuhr),
      icon: Sun,
    };
    const asr: PrayerTime = {
      name: "Asr",
      time: to12Hour(data.data.timings.Asr),
      icon: Sun,
    };
    const maghrib: PrayerTime = {
      name: "Maghrib",
      time: to12Hour(data.data.timings.Maghrib),
      icon: Sunset,
    };
    const isha: PrayerTime = {
      name: "Isha",
      time: to12Hour(data.data.timings.Isha),
      icon: Moon,
    };

    return [fajr, dhuhr, asr, maghrib, isha];
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return;
  }
};

export { getPrayerTimes };
export type { PrayerTime };
