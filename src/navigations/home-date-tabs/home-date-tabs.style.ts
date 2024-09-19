import { StyleSheet } from "react-native";
import { TWColors } from "twrn-styles";

export const styles = StyleSheet.create({
    containerTabItem: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 50, 
        borderRadius: 50
    },
    container: { flexDirection: 'row', marginVertical: 20, borderWidth: 1, borderColor: TWColors.GREYD9, borderRadius: 50 }
})