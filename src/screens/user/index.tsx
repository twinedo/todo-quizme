import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ComingSoon } from 'components'
import { TWStyles } from 'twrn-styles'

const User = () => {
  return (
    <View style={[TWStyles.container, TWStyles.alignCenter, TWStyles.justifyCenter]}>
      <ComingSoon />
    </View>
  )
}

export default User

const styles = StyleSheet.create({})