import { StyleSheet, View } from 'react-native'
import React from 'react'
import { TWStyles } from 'twrn-styles'
import { ComingSoon } from 'components'

const History = () => {
  return (
    <View style={[TWStyles.container, TWStyles.alignCenter, TWStyles.justifyCenter]}>
      <ComingSoon />
    </View>
  )
}

export default History

const styles = StyleSheet.create({})