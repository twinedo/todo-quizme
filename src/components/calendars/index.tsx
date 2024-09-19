import React from 'react'
import { Calendar } from 'react-native-calendars'
import moment from 'moment'
import { TCalendarsProps } from './calendars.type'
import { styles } from './calendars.style'

const Calendars = <T,>(props: TCalendarsProps<T>) => {
  return (
      <Calendar
          style={styles.container}
          current={moment().format('YYYY-MM-DD')}
          markingType={'period'}
          markedDates={props.markedDates}
          onMonthChange={props.onMonthChange}
          theme={{
            todayTextColor: '#7954FA',
            fontWeight: 'bold',
            selectedDayBackgroundColor: "#57B9BB",
            selectedDayTextColor: "white",
          }}
        />
  )
}

export default Calendars