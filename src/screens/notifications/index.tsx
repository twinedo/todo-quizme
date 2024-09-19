import { View } from 'react-native'
import React from 'react'
import { TWStyles } from 'twrn-styles'
import { ComingSoon } from 'components'

const Notifications = () => {
  return (
    <View style={[TWStyles.container, TWStyles.alignCenter, TWStyles.justifyCenter]}>
      <ComingSoon />
    </View>
  )
}

export default Notifications