import { Moment } from "moment";

export type TWeekNoteProps = {
    onSelectedDate: (date: string) => void
}

export type TDayItemProps = { 
    day: Moment;
    isToday: boolean; 
    onPress: () => void; 
    selectedDay: string; 
}