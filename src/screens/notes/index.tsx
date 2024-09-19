import { Pressable, ScrollView, Text, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { TWColors, TWStyles } from 'twrn-styles'
import { Button, Input } from 'twrn-components'
import { RichEditor, actions, RichToolbar } from 'react-native-pell-rich-editor'
import { styles } from './notes.style'
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NavParam } from 'navigations/navigations.type'
import todoStore from 'stores/todo'
import { TTodoDetail } from 'stores/todo/todo.type'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Feather from '@expo/vector-icons/Feather';
import { onDisplayNotification } from 'services/notifications'
import { successCreated } from './notes.const'

const schema = yup
    .object({
        title: yup.string().required('Required'),
        description: yup.string().required('Required'),
    })

const Notes = () => {
    const route = useRoute<RouteProp<NavParam, 'Notes'>>()
    const navigation = useNavigation<NativeStackNavigationProp<NavParam, 'Notes'>>()
    const richText = useRef<RichEditor>(null);
    const { onSubmit, onUpdate, selectedTodo, onDelete, onSetSelectedTodo } = todoStore((state) => state);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: selectedTodo ? selectedTodo.title : "",
            description: selectedTodo ? selectedTodo.description : "",
        },
    })

    const checks = useMemo(() => ['Active', 'Done'], []);

    const [selectedStatus, setSelectedStatus] = useState<'active' | 'done'>(selectedTodo?.status ?? 'active');

    const onSubmitNote = (data: TTodoDetail) => {
        if (route.params.type === 'update') {
            
            const newData = {
                ...selectedTodo,
                ...data,
                status: selectedStatus,
            }
            onUpdate?.(newData)
        } else {
            onSubmit?.(data)
        }
        onSetSelectedTodo?.(null)
        navigation.goBack();
        const successUpdated = `${data.title} has been updated!`
        onDisplayNotification(data.title, route.params.type === 'update' ? successUpdated : successCreated)
    }

    const handleChange = useCallback((html: string) => {
        richText.current = html
    }, []);

    const onDeleteTodo = () => {
        onDelete?.(selectedTodo?.id!);
        onSetSelectedTodo?.(null)
        navigation.goBack()
    }

    return (
        <View style={[
            TWStyles.container,
            TWStyles.verticalDefaultPadding,
            TWStyles.horizontalDefaultPadding,
            TWStyles.rowGap12
        ]}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder='Title here'
                        title="Title"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        errors={[errors.title ? errors.title?.message! : '', 'right']}
                    />
                )}
                name="title"
            />
            <Controller
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                    <View style={[TWStyles.displayFlex, TWStyles.rowGap12]}>
                        <Text>Description</Text>
                        <View style={TWStyles.displayFlex}>
                            <View style={errors.description ? styles.containerToolbarError : styles.containerToolbar}>
                                <RichToolbar
                                    editor={richText}
                                    actions={[
                                        actions.undo,
                                        actions.redo,
                                        actions.setBold,
                                        actions.setItalic,
                                        actions.setUnderline,
                                        actions.insertBulletsList,
                                        actions.insertOrderedList,
                                        actions.checkboxList,
                                        actions.alignLeft,
                                        actions.alignCenter,
                                        actions.alignRight,
                                        actions.code,
                                        actions.indent,
                                    ]}
                                />
                            </View>
                            <ScrollView
                                nestedScrollEnabled={true}
                                keyboardDismissMode='none'
                                style={errors.description ? styles.containerEditorError : styles.containerEditor}>
                                <RichEditor
                                    ref={richText}
                                    onChange={(text) => {
                                        onChange(text)
                                        handleChange(text)
                                    }}
                                    onBlur={onBlur}
                                    placeholder='Please type here'
                                    useContainer={true}
                                    style={styles.richEditor}
                                    initialContentHTML={value}
                                />
                            </ScrollView>
                            {errors.description &&
                                <Text style={[styles.textError, { textAlign: 'right' }]}>
                                    {errors.description.message}
                                </Text>
                            }
                        </View>
                    </View>
                )}
                name="description"
            />
            {route.params.type === 'update' && (<>
                <Text>Status</Text>
                <View style={[TWStyles.row, TWStyles.columnGap16]}>
                    {checks.map((o: string) => (
                        <Pressable style={[TWStyles.row, TWStyles.columnGap12, TWStyles.alignCenter]} onPress={() => setSelectedStatus(o === 'Active' ? 'active' : 'done')} >
                            <Feather name={selectedStatus?.toLowerCase() === o.toLowerCase() ? "check-square" : "square"} size={24} color="black" />
                            <Text>{o}</Text>
                        </Pressable>
                    ))}
                </View>
            </>)}

            <View style={[TWStyles.row, TWStyles.columnGap16, TWStyles.justifyAround]}>
                {route.params.type === 'update' && (
                    <Button
                        onPress={onDeleteTodo}
                        text='Delete'
                        disabled={!isValid}
                        backgroundColor={isValid ? TWColors.RED : TWColors.GREYB11}
                        containerStyle={TWStyles.displayFlex}
                    />
                )}

                <Button
                    onPress={handleSubmit(onSubmitNote)}
                    text='Submit'
                    disabled={!isValid}
                    backgroundColor={isValid ? "#5A91FF" : TWColors.GREYB11}
                    containerStyle={TWStyles.displayFlex}
                />
            </View>
        </View>
    )
}

export default Notes