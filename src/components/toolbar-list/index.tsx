import { Pressable, View } from 'react-native'
import React, { memo } from 'react'
import { TWStyles } from 'twrn-styles'
import { Input } from 'twrn-components'
import { TToolbarListProps } from './toolbar-list.type'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { styles } from './toolbar-list.style'
import { TInputProps } from 'twrn-components/lib/typescript/src/components/molecules/input/input.type'

const ToolbarList = (props: TToolbarListProps & TInputProps) => {
    const { onSearchChange, onFilterPress, onSortPress } = props;
    return (
        <View style={[TWStyles.row, TWStyles.columnGap8, TWStyles.alignCenter]} {...props}>
            <View style={TWStyles.displayFlex}>
                <Input
                    value={props.value}
                    onChangeText={onSearchChange}
                    placeholder='Please Type here...'
                    containerStyle={styles.containerInput}
                    {...props}
                />
            </View>
            {onFilterPress && (
                <Pressable style={styles.containerButton} onPress={onFilterPress}>
                    <AntDesign name="filter" size={24} color="black" />
                </Pressable>
            )}
            {onSortPress && (
                <Pressable style={styles.containerButton} onPress={onSortPress}>
                    <FontAwesome name="sort" size={24} color="black" />
                </Pressable>
            )}
        </View>
    )
}

export default memo(ToolbarList)