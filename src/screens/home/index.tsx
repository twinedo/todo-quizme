import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { TWStyles } from 'twrn-styles'
import { Toolbar } from 'twrn-components'
import HomeDateTabs from 'navigations/home-date-tabs'
import todoStore from 'stores/todo'
import moment from 'moment'
import { onDisplayNotification } from 'services/notifications'
import { checkNotifications } from 'utils/fun'

const Home = () => {
  const todos = todoStore(state => state.todos);

  useEffect(() => {
    checkNotifications(todos);
  }, [todos])
  
  return (
    <View style={[TWStyles.container]}>
      <Toolbar text='TTD' textStyle={[TWStyles.w100, TWStyles.textAlignCenter, {fontWeight: 'bold', fontSize: 24}]} containerStyle={{elevation: 0}} />
      <HomeDateTabs />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})