import { FlatList, RefreshControl, ScrollView, View } from 'react-native'
import React, { useRef, useState } from 'react'
import todoStore from 'stores/todo'
import { TWStyles } from 'twrn-styles';
import { TTodoDetail } from 'stores/todo/todo.type';
import { ActionsSheetNote, CardNote, EmptyNote, ToolbarList, WeekNote } from 'components';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParam } from 'navigations/navigations.type';
import { styles } from './daily.style';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { checkNotifications, onDefaultDaily, onDefaultSort } from 'utils/fun';

const Daily = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavParam, 'Monthly'>>()
  const { onGetTodoById } = todoStore();
  const todos = todoStore((state) => state.todos)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredTodos, setFilteredTodos] = useState<TTodoDetail[]>(todos)
  const [searchTxt, setSearchTxt] = useState('')
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [selectedFilter, setSelectedFilter] = useState('All')

  useFocusEffect(
    React.useCallback(() => {
      const filtered = onDefaultDaily(todos, selectedDate)
      const sort = onDefaultSort(filtered)
      setFilteredTodos(sort);
    }, [todos, selectedDate])
  );

  const onSearchChange = (text: string) => {
    const dat = [...filteredTodos];
    setSearchTxt(text)
    let filtered = [];
    if (text.length > 0) {
      filtered = dat.filter(
        item => item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.description.toLowerCase().includes(text.toLowerCase()) ||
          item.status?.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      filtered = onDefaultDaily(todos, selectedDate)
    }
    const sort = onDefaultSort(filtered)
    setFilteredTodos(sort);
  }

  const onFilterSubmit = (val: string) => {
    const dat = [...filteredTodos];
    setSelectedFilter(val)
    let filtered = dat;
    filtered = onDefaultDaily(todos, selectedDate)
    if (val.toLowerCase() !== 'all') {
      filtered = filtered.filter(item => item.status === val);
      setFilteredTodos(filtered)
    }
    const sort = onDefaultSort(filtered);
    setFilteredTodos(sort);
    actionSheetRef.current?.hide()
  }

  const renderItem = ({ item }: { item: TTodoDetail, index: number }) => (
    <CardNote
      type='daily'
      data={item}
      onPress={() => {
        onGetTodoById?.(item.id)
        navigation.navigate('Notes', { type: 'update', id: item.id })
      }}
    />
  )

  return (
    <View style={[TWStyles.displayFlex, TWStyles.verticalDefaultPadding, TWStyles.horizontalDefaultPadding]}>
      <ScrollView 
        contentContainerStyle={[TWStyles.flexGrow, TWStyles.px4]}
        refreshControl={<RefreshControl onRefresh={() => checkNotifications(filteredTodos)} refreshing={false} />}
        >
        <View>
          <WeekNote onSelectedDate={(date) => setSelectedDate(new Date(date))} />
        </View>

        <ToolbarList
          onSearchChange={onSearchChange}
          value={searchTxt}
          onFilterPress={() => actionSheetRef.current?.show()}
        />

        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={renderItem}
          keyboardDismissMode='none'
          ListEmptyComponent={() => <EmptyNote />}
          contentContainerStyle={[TWStyles.displayFlex, styles.listContainer]}
        />
        <ActionSheet ref={actionSheetRef}>
          <ActionsSheetNote
            onClose={() => actionSheetRef.current?.hide()}
            onReset={() => actionSheetRef.current?.hide()}
            onSubmit={onFilterSubmit}
            value={selectedFilter}
          />
        </ActionSheet>
      </ScrollView>
    </View>
  )
}

export default Daily