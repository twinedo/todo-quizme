import { Text, View } from 'react-native'
import React from 'react'
import { Card } from 'twrn-components'
import type { TCardProps } from 'twrn-components/lib/typescript/src/components/atoms/card/card.type'
import { TWColors, TWStyles } from 'twrn-styles'
import { styles } from './card-note.style'
import moment from 'moment'
import { TCardNoteProps } from './card-note.type'

const CardNote = (props: TCardProps & TCardNoteProps) => {
  const { type = 'monthly'} = props;
  return (
    <Card 
      {...props}
      style={styles.container} 
      containerStyle={TWStyles.p0} 
      onPress={props.onPress}
      >
      <View style={TWStyles.alignEnd}>
        <Text style={[
          styles.statusText, 
          TWStyles.textAlignCenter, 
          {backgroundColor: props.data.status === 'active' ? TWColors.ORANGE : TWColors.GREEN1 }
        ]}>{props.data.status}</Text>
      </View>
      <View style={[TWStyles.row, TWStyles.columnGap8, { padding: 8 }]}>
        {type === 'monthly' && (
          <View style={TWStyles.alignCenter}>
            <Text style={styles.date}>{moment(props.data.createdDate).date()}</Text>
            <Text style={styles.date}>{moment(props.data.createdDate).format('MMM')}</Text>
          </View>
        )}

        {type === 'monthly' && <View style={styles.separator} />}
        <View style={[TWStyles.displayFlex, TWStyles.row, TWStyles.alignCenter, TWStyles.justifySpaceBetween]}>
          <Text style={styles.title}>{props.data.title}</Text>
          <Text style={styles.time}>{moment(props.data.createdDate).fromNow()}</Text>
        </View>
      </View>
    </Card>
  )
}

export default CardNote