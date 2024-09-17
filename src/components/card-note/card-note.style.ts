import { StyleSheet } from "react-native";
import { TWColors } from "twrn-styles";

export const styles = StyleSheet.create({
    container: { padding: 0, backgroundColor: 'white', overflow: 'hidden', borderRadius: 12, elevation: 2, },
    date: {
        fontWeight: 'bold',
        fontSize: 18,
        color: TWColors.GREYB11
    },
    title: {
        fontSize: 30,
        fontWeight: '500'
    },
    time: {
        color: TWColors.GREYB11,
        fontStyle: 'italic'
    }
})