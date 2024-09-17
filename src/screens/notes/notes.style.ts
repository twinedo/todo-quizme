import { Dimensions, StyleSheet } from "react-native";
import { TWColors, TWStyles } from "twrn-styles";


export const styles = StyleSheet.create({
    containerToolbar: {
        borderTopWidth: 1, 
        borderLeftWidth: 1, 
        borderRightWidth: 1, 
        borderTopLeftRadius: 5, 
        borderColor: TWColors.GREYD9, 
        borderTopRightRadius: 5, 
        position: 'relative', 
        overflow:'hidden', 
        width: '100%'
    },
    containerToolbarError: {
        borderTopWidth: 1, 
        borderLeftWidth: 1, 
        borderRightWidth: 1, 
        borderTopLeftRadius: 5, 
        borderColor: TWColors.RED, 
        borderTopRightRadius: 5, 
        position: 'relative', 
        overflow:'hidden', 
        width: '100%'
    },
    containerEditor: { 
        position: 'relative', 
        borderLeftWidth: 1, 
        borderRightWidth: 1, 
        borderBottomWidth: 1, 
        borderColor: TWColors.GREYD9, 
    },
    containerEditorError: { 
        position: 'relative', 
        borderLeftWidth: 1, 
        borderRightWidth: 1, 
        borderBottomWidth: 1, 
        borderColor: TWColors.RED, 
        marginBottom: 12
    },
    richEditor: { 
        marginBottom: 10, 
        height: '100%', 
        width: Dimensions.get('window').width - TWStyles.horizontalDefaultPadding.paddingHorizontal * 2 - 10 
    },
    textError: {
        color: TWColors.RED,
        fontStyle: 'italic'
      }
})