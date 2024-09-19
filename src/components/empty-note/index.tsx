import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { TWStyles } from 'twrn-styles'
import { styles } from './empty-note.style'

const EmptyNote = () => {
  return (
    <View style={[
        TWStyles.displayFlex, 
        TWStyles.alignCenter, 
        TWStyles.my16,
        TWStyles.justifyCenter, 
        TWStyles.rowGap12,
    ]}>
        <Text style={styles.title}>Empty Notes on this day</Text>
        <Text>Create one</Text>
        <AntDesign name="arrowdown" size={24} color="black" />
    </View>
  )
}

export default EmptyNote