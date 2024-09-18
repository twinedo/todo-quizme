import { Dimensions, StyleSheet } from "react-native";
import { TWColors } from "twrn-styles";

export const styles = StyleSheet.create({
    container: {
    },
    dayWrapper: {
      width: Dimensions.get('window').width / 7,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    blurLeft: {
      opacity: 0.5,
      marginLeft: -20,
    },
    blurRight: {
      opacity: 0.5,
      marginRight: -20,
    },
    dayItem: {
      padding: 10,
      borderRadius: 8,
      backgroundColor: 'white',
      alignItems: 'center',
    },
    today: {
      backgroundColor: '#5A91FF',
    },
    selectedDay: {
        backgroundColor: TWColors.GREEN1,
      },
    dayText: {
      fontSize: 16,
      color: 'black',
    },
    todayText: {
      color: 'white',
    },
  });
  