import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';


const CustomDateTimePicker = ({ date, onChange }) => {

    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const getDateString = () => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-based, so we add 1
        const day = String(date.getDate()).padStart(2, '0');  // Get the day of the month

        return `${day}-${month}-${year}`
    }

    const getTimeString = () => {
        const hours = String(date.getHours()).padStart(2, '0'); // Get the hours (0-23) and pad with zero if needed
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Get the minutes (0-59) and pad with zero if needed
        const seconds = String(date.getSeconds()).padStart(2, '0'); // Get the seconds (0-59) and pad with zero if needed

        return `${hours}:${minutes}`
    }

    const getTimeZoneAbbreviation = () => {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }


    return (
        <View style={styles.customDateTimePicker}>
            <View style={styles.dateTimeContainer}>
                <TouchableOpacity style={styles.date} onPress={showDatepicker}>
                    <Text>{getDateString()}</Text>
                    <Fontisto name="date" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.time} onPress={showTimepicker}>
                    <Text>{getTimeString()}</Text>
                    <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.timeZone}>{getTimeZoneAbbreviation()}</Text>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {
                        onChange(event, selectedDate);
                        setShow(Platform.OS === 'ios');
                    }}
                    timeZoneOffsetInMinutes={Constants.timezoneOffsetInMinutes}
                />
            )}
        </View>
    );
};

export default CustomDateTimePicker;

const styles = StyleSheet.create({
    customDateTimePicker: {
        alignItems: 'flex-start',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 5,
        flexShrink: 1,
        // backgroundColor: '#D0F0C0',
    },
    date: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        // backgroundColor: '#98FF98',
        padding: 10,
        borderRightWidth: 1,
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        // backgroundColor: '#90EE90',
        padding: 10,
        borderRightWidth: 1,
    },
    timeZone: {
        // backgroundColor: 'grey',
        padding: 10,
        // backgroundColor: '#D0F0C0',
    }
});