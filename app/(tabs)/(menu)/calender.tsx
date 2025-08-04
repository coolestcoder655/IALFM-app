import React, { useState } from 'react';
import { StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Text, View } from '@/components/Themed';
import { ChevronLeft, ChevronRight, Clock, MapPin, Info } from 'lucide-react-native';
import * as ExpoCalendar from 'expo-calendar';

interface Event {
    id: string;
    title: string;
    time: string;
    type: 'prayer' | 'program' | 'meeting' | 'other';
    description?: string;
}

interface EventsData {
    [date: string]: Event[];
}

const CalenderScreen: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);

    // Sample events data - you can replace this with actual data from your API
    const eventsData: EventsData = {
        '2025-01-07': [
            {
                id: '1',
                title: 'Middle Yoga',
                time: '9pm',
                type: 'program',
                description: 'Community yoga session for middle age group'
            },
            {
                id: '2',
                title: 'Ashtanga',
                time: '10pm',
                type: 'program',
                description: 'Advanced yoga practice session'
            },
            {
                id: '3',
                title: 'TRX',
                time: '11pm',
                type: 'program',
                description: 'TRX training session'
            },
            {
                id: '4',
                title: 'Evening Group',
                time: '7pm',
                type: 'meeting',
                description: 'Community discussion group'
            }
        ],
        '2025-01-08': [
            {
                id: '5',
                title: 'Jummah Prayer',
                time: '1:30pm',
                type: 'prayer',
                description: 'Weekly Friday prayer service'
            },
            {
                id: '6',
                title: 'Youth Program',
                time: '7pm',
                type: 'program',
                description: 'Weekly youth activities and discussion'
            }
        ],
        '2025-01-10': [
            {
                id: '7',
                title: 'Quran Study Circle',
                time: '2pm',
                type: 'program',
                description: 'Weekly Quran study and discussion'
            },
            {
                id: '8',
                title: 'Community Meeting',
                time: '7pm',
                type: 'meeting',
                description: 'Monthly community board meeting'
            }
        ],
        [today]: [
            {
                id: '9',
                title: 'Daily Prayer',
                time: '6am',
                type: 'prayer',
                description: 'Fajr prayer'
            },
            {
                id: '10',
                title: 'Evening Program',
                time: '7pm',
                type: 'program',
                description: 'Community evening program'
            }
        ]
    };

    // Create marked dates object for the calendar
    const markedDates = {
        ...Object.keys(eventsData).reduce((acc, date) => {
            acc[date] = {
                marked: true,
                dotColor: '#2E8B57',
                selectedColor: date === selectedDate ? '#2E8B57' : undefined,
                selected: date === selectedDate,
            };
            return acc;
        }, {} as any),
        [selectedDate]: {
            selected: true,
            selectedColor: '#2E8B57',
            selectedTextColor: 'white',
            marked: eventsData[selectedDate] ? true : false,
            dotColor: eventsData[selectedDate] ? '#ffffff' : '#2E8B57',
        }
    };

    const selectedDateEvents = eventsData[selectedDate] || [];

    const getEventTypeColor = (type: string) => {
        switch (type) {
            case 'prayer':
                return '#2E8B57';
            case 'program':
                return '#4CAF50';
            case 'meeting':
                return '#FF9800';
            default:
                return '#666';
        }
    };

    const getEventTypeIcon = (type: string) => {
        switch (type) {
            case 'prayer':
                return <MapPin size={16} color={getEventTypeColor(type)} />;
            case 'program':
                return <Clock size={16} color={getEventTypeColor(type)} />;
            case 'meeting':
                return <Info size={16} color={getEventTypeColor(type)} />;
            default:
                return <Info size={16} color={getEventTypeColor(type)} />;
        }
    };

    const formatSelectedDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    };

    const getCalendarPermission = async () => {
        const { status } = await ExpoCalendar.requestCalendarPermissionsAsync();
        if (status !== 'granted') {
            alert(
                'Permission Required: Calendar permission is needed to add events to your calendar.'
            );
            return false;
        }
        return true;
    };

    const addToCalendar = async (event: Event, date: string) => {
        try {
            const hasPermission = await getCalendarPermission();
            if (!hasPermission) return;

            // Get device calendars
            const calendars = await ExpoCalendar.getCalendarsAsync(ExpoCalendar.EntityTypes.EVENT);

            // Find the primary calendar or first writable calendar
            const defaultCalendar = calendars.find(
                cal => cal.source.name === 'Default' || cal.isPrimary
            ) || calendars.find(cal => cal.allowsModifications);

            if (!defaultCalendar) {
                alert('No writable calendar found on your device.');
                return;
            }

            // Parse the time (you might need to adjust this based on your time format)
            const eventDate = new Date(date);
            const timeMatch = event.time.match(/(\d{1,2}):?(\d{0,2})?\s*(am|pm)?/i);

            if (timeMatch) {
                let hours = parseInt(timeMatch[1]);
                const minutes = parseInt(timeMatch[2] || '0');
                const isPM = timeMatch[3]?.toLowerCase() === 'pm';

                if (isPM && hours !== 12) hours += 12;
                if (!isPM && hours === 12) hours = 0;

                eventDate.setHours(hours, minutes, 0, 0);
            }

            // Set end time (1 hour after start by default)
            const endDate = new Date(eventDate.getTime() + 60 * 60 * 1000);

            // Create the event
            const eventDetails = {
                title: event.title,
                startDate: eventDate,
                endDate: endDate,
                location: 'Islamic Association of Lethbridge and Fort Macleod', // You can make this dynamic
                notes: event.description || '',
                alarms: [
                    { relativeOffset: -15 }, // 15 minutes before
                    { relativeOffset: -60 }  // 1 hour before
                ],
            };

            const eventId = await ExpoCalendar.createEventAsync(defaultCalendar.id, eventDetails);

            alert(
                `"${event.title}" has been added to your calendar with reminders.`
            );

        } catch (error) {
            console.error('Error adding to calendar:', error);
            alert(
                'Failed to add event to calendar. Please try again.'
            );

        }
    };

    const renderEvent = ({ item }: { item: Event }) => (
        <View style={styles.eventCard}>
            <View style={styles.eventHeader}>
                <View style={styles.eventTimeContainer}>
                    <Clock size={14} color="#666" />
                    <Text style={styles.eventTime}>{item.time}</Text>
                </View>
                <View style={styles.eventTypeIndicator}>
                    {getEventTypeIcon(item.type)}
                </View>
            </View>
            <Text style={styles.eventTitle}>{item.title}</Text>
            {item.description && (
                <Text style={styles.eventDescription}>{item.description}</Text>
            )}
            <Pressable style={styles.infoButton} onPress={() => addToCalendar(item, selectedDate)}>
                <Text style={styles.infoButtonText}>Add To Calender</Text>
            </Pressable>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.screenTitle}>Calendar</Text>
                <Text style={styles.screenSubtitle}>Community Events & Programs</Text>
            </View>

            <View style={styles.calendarContainer}>
                <Calendar
                    current={selectedDate}
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    markedDates={markedDates}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#2E8B57',
                        selectedDayBackgroundColor: '#2E8B57',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#2E8B57',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#2E8B57',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#2E8B57',
                        monthTextColor: '#2E8B57',
                        indicatorColor: '#2E8B57',
                        textDayFontFamily: 'System',
                        textMonthFontFamily: 'System',
                        textDayHeaderFontFamily: 'System',
                        textDayFontWeight: '400',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '500',
                        textDayFontSize: 16,
                        textMonthFontSize: 18,
                        textDayHeaderFontSize: 14,
                    }}
                    renderArrow={(direction) => (
                        direction === 'left' ?
                            <ChevronLeft size={24} color="#2E8B57" /> :
                            <ChevronRight size={24} color="#2E8B57" />
                    )}
                    enableSwipeMonths={true}
                    style={styles.calendar}
                />
            </View>

            <View style={styles.eventsSection}>
                <Text style={styles.selectedDateTitle}>
                    {formatSelectedDate(selectedDate)}
                </Text>

                {selectedDateEvents.length > 0 ? (
                    <FlatList
                        data={selectedDateEvents}
                        renderItem={renderEvent}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                ) : (
                    <View style={styles.noEventsContainer}>
                        <Text style={styles.noEventsText}>No events scheduled for this day</Text>
                        <Text style={styles.noEventsSubtext}>
                            Check other dates or contact us for more information about upcoming programs.
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.legendSection}>
                <Text style={styles.legendTitle}>Event Types</Text>
                <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: '#2E8B57' }]} />
                        <Text style={styles.legendText}>Prayer Times</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
                        <Text style={styles.legendText}>Programs</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: '#FF9800' }]} />
                        <Text style={styles.legendText}>Meetings</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default CalenderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#2E8B57',
        padding: 20,
        paddingTop: 40,
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    screenSubtitle: {
        fontSize: 16,
        color: 'white',
        opacity: 0.9,
    },
    calendarContainer: {
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    calendar: {
        paddingBottom: 10,
    },
    eventsSection: {
        backgroundColor: 'white',
        margin: 15,
        marginTop: 0,
        borderRadius: 15,
        padding: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    selectedDateTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 15,
        textAlign: 'center',
    },
    eventCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#2E8B57',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    eventHeader: {
        flexDirection: 'row',
        backgroundColor: '#f8f9fa',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    eventTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e8f5e8',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    eventTime: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2E8B57',
        marginLeft: 4,
    },
    eventTypeIndicator: {
        padding: 4,
        backgroundColor: '#f8f9fa',
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    eventDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 10,
    },
    infoButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#2E8B57',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    infoButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    noEventsContainer: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    noEventsText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 8,
        textAlign: 'center',
    },
    noEventsSubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    legendSection: {
        backgroundColor: 'white',
        margin: 15,
        marginTop: 0,
        borderRadius: 15,
        padding: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    legendTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57',
        marginBottom: 15,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    legendText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
});