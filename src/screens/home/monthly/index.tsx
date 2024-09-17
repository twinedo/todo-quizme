import { FlatList, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import todoStore from 'stores/todo'
import { TWStyles } from 'twrn-styles';
import moment from 'moment';
import { TTodoDetail } from 'stores/todo/todo.type';
import { ActionsSheetNote, Calendars, CardNote, EmptyNote, ToolbarList } from 'components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParam } from 'navigations/navigations.type';
import { styles } from './monthly.style';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { SELECTED_FORMAT } from './monthly.const';

const Monthly = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavParam, 'Monthly'>>()
  const { onGetTodoById } = todoStore();
  const todos = todoStore((state) => state.todos)
  const [selectedMonth, setSelectedMonth] = useState(moment().month());

  const [filteredTodos, setFilteredTodos] = useState<TTodoDetail[]>(todos)

  const [markedDates, setMarkedDates] = useState({})

  const [searchTxt, setSearchTxt] = useState('')

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [selectedFilter, setSelectedFilter] = useState('All')

  useEffect(() => {
    const flattenDate = todos.flatMap(o => o.createdDate)
    let newArr = {};
    flattenDate.map(o => {
      let item = {
        [`${moment(o).format('YYYY-MM-DD')}`]: SELECTED_FORMAT
      }
      newArr = { ...item, ...newArr }
    });
    setMarkedDates(newArr)

    const filtered = todos.filter(item => moment(item.createdDate).month() === selectedMonth);
    setFilteredTodos(filtered);

  }, [todos, selectedMonth])

  const renderItem = ({ item }: { item: TTodoDetail, index: number }) => (
    <CardNote
      data={item}
      onPress={() => {
        onGetTodoById?.(item.id)
        navigation.navigate('Notes', { type: 'update', id: item.id })
      }}
    />
  )

  const onSearchChange = (text: string) => {
    const dat = [...filteredTodos];
    setSearchTxt(text)
    if (text.length > 0) {
      const filter = dat.filter(
        item => item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.description.toLowerCase().includes(text.toLowerCase()) ||
          item.status?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTodos(filter);
    } else {
      const filtered = todos.filter(item => moment(item.createdDate).month() === selectedMonth);
      setFilteredTodos(filtered);
    }
  }

  const onFilterSubmit = (val: string) => {
    const dat = [...filteredTodos];
    setSelectedFilter(val)
    let filter = dat;
    if (val.toLowerCase() !== 'all') {
      const filtered = todos.filter(item => moment(item.createdDate).month() === selectedMonth);
      filter = filtered.filter(item => item.status === val);
      setFilteredTodos(filter)
    } else {
      const filtered = todos.filter(item => moment(item.createdDate).month() === selectedMonth);
      setFilteredTodos(filtered);
    }
    actionSheetRef.current?.hide()
    
  }

  return (
    <View style={[TWStyles.displayFlex, TWStyles.verticalDefaultPadding, TWStyles.horizontalDefaultPadding]}>
      <ScrollView contentContainerStyle={[TWStyles.flexGrow, { paddingHorizontal: 4 }]}>
        <Calendars
          markedDates={markedDates}
          onMonthChange={(date) => setSelectedMonth(date.month! - 1)}
        />

        <View style={{ marginTop: 20 }}>
          <ToolbarList
            onSearchChange={onSearchChange}
            value={searchTxt}
            onFilterPress={() => actionSheetRef.current?.show()}
          />
        </View>

        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={renderItem}
          keyboardDismissMode='none'
          ListEmptyComponent={() => <EmptyNote />}
          contentContainerStyle={styles.listContainer}
        />
        <ActionSheet ref={actionSheetRef}>
          <ActionsSheetNote 
            onClose={() => actionSheetRef.current?.hide()} 
            onReset={() => actionSheetRef.current?.hide()} 
            onSubmit={(val: string) => {
              onFilterSubmit(val)}
            } 
            value={selectedFilter}
          />
        </ActionSheet>
      </ScrollView>
    </View>
  )
}

export default Monthly