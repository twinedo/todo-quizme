export type TReturnDate = {
    dateString?: string;
    day?: number;
    month?: number;
    year?: number;
}

export type TCalendarsProps<T> = {
    markedDates: T,
    onMonthChange?: (date: TReturnDate) => void
}