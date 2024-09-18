import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import moment from 'moment';
import { styles } from './week-note.style';
import { TDayItemProps, TWeekNoteProps } from './week-note.type';

const getWeekDays = () => {
    const startOfWeek = moment().startOf('week');
    const days = [];

    for (let i = 0; i < 7; i++) {
        days.push(startOfWeek.clone().add(i, 'days'));
    }

    return days;
};


const DayItem = (props: TDayItemProps) => {
    const {day, onPress, isToday, selectedDay} = props;
    return (
        <Pressable onPress={onPress} style={[styles.dayItem, isToday && styles.today, day.format('YYYY-MM-DD') === selectedDay && !isToday && styles.selectedDay ]}>
            <Text style={[styles.dayText, isToday && styles.todayText]}>
                {day.format('ddd')}
            </Text>
            <Text style={[styles.dayText, isToday && styles.todayText]}>
                {day.format('DD')}
            </Text>
        </Pressable>
    );
};

const WeekNote = (props: TWeekNoteProps) => {
    const {onSelectedDate} = props;
    const days = useMemo(getWeekDays, []);
    const today = moment();
    const [selectedDate, setSelectedDate] = useState('')

    return (
        <FlatList
            data={days}
            keyExtractor={(item) => item.format('YYYY-MM-DD')}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
                const isToday = item.isSame(today, 'day');
                const isLeftMost = index === 0;
                const isRightMost = index === days.length - 1;

                return (
                    <View
                        style={[
                            styles.dayWrapper,
                            isLeftMost && styles.blurLeft,
                            isRightMost && styles.blurRight
                        ]}>
                        <DayItem 
                            day={item} 
                            isToday={isToday}
                            selectedDay={selectedDate}
                            onPress={() => {
                                console.log(item.format('YYYY-MM-DD'))
                                setSelectedDate(item.format('YYYY-MM-DD'))
                                onSelectedDate(item.toString());
                            }} 
                        />
                        {isToday ? <Text>Today</Text> : <View />}
                    </View>
                );
            }}
        />
    );
};

export default WeekNote