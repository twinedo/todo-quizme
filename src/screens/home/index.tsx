import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TWStyles } from 'twrn-styles'
import { Toolbar } from 'twrn-components'
import HomeDateTabs from 'navigations/home-date-tabs'

const Home = () => {
  return (
    <View style={[TWStyles.container]}>
      <Toolbar text='TTD' textStyle={[TWStyles.w100, TWStyles.textAlignCenter, {fontWeight: 'bold', fontSize: 24}]} containerStyle={{elevation: 0}} />
      <HomeDateTabs />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})