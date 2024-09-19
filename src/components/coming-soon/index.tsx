import { Image, View } from 'react-native'
import React from 'react'
import { styles } from './coming-soon.style'

const ComingSoon = () => {
  return (
    <View>
      <Image 
        style={styles.img} 
        source={require('../../../assets/img_coming_soon.jpg')} 
        resizeMode='contain' />
    </View>
  )
}

export default ComingSoon