import { Pressable, Text, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { TWColors, TWStyles } from 'twrn-styles'
import { Feather, Ionicons } from '@expo/vector-icons'
import { Button } from 'twrn-components'
import { TActionSheetProps } from './actions-sheet-note.type'

const ActionsSheetNote = (props: TActionSheetProps) => {
    const { onReset, onSubmit, onClose, value = 'All' } = props;
    const options = useMemo(() => ['All', 'Active', 'Done'], [])

    const [selectedFilter, setSelectedFilter] = useState<string>(value)
    return (
        <View style={[
            TWStyles.rowGap16, 
            TWStyles.horizontalDefaultPadding, 
            TWStyles.verticalDefaultPadding
        ]}>
            <View style={[
                TWStyles.row, 
                TWStyles.alignCenter, 
                TWStyles.justifySpaceBetween
            ]}>
                <Text style={{fontWeight: 'bold'}}>Filter</Text>
                <Ionicons name="close" size={24} color={TWColors.GREY7F} onPress={onClose} />
            </View>
            <View style={[TWStyles.rowGap8]}>
                <Text>Status</Text>
                <View style={[TWStyles.row, TWStyles.columnGap16]}>
                    {options.map((o) => (
                        <Pressable style={[TWStyles.row, TWStyles.columnGap12, TWStyles.alignCenter]} onPress={() => setSelectedFilter(o.toLowerCase())} >
                            <Feather name={selectedFilter.toLowerCase() === o.toLowerCase() ? "check-square" : "square"} size={24} color="black" />
                            <Text>{o}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
            <View style={[TWStyles.row, TWStyles.columnGap16, TWStyles.justifyAround]}>
                <Button
                    onPress={onReset}
                    text='Reset'
                    backgroundColor={TWColors.RED}
                    containerStyle={TWStyles.displayFlex}
                />

                <Button
                    onPress={() => onSubmit?.(selectedFilter)}
                    text='Submit'
                    backgroundColor={"#5A91FF"}
                    containerStyle={TWStyles.displayFlex}
                />
            </View>
        </View>
    )
}

export default ActionsSheetNote