import { FlatList, RefreshControl, ScrollView, View } from 'react-native'
import React, { useRef, useState } from 'react'
import todoStore from 'stores/todo'
import { TWStyles } from 'twrn-styles';
import moment from 'moment';
import { TTodoDetail } from 'stores/todo/todo.type';
import { ActionsSheetNote, Calendars, CardNote, EmptyNote, ToolbarList } from 'components';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParam } from 'navigations/navigations.type';
import { styles } from './monthly.style';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { SELECTED_FORMAT } from './monthly.const';
import { checkNotifications, onDefaultMonthly, onDefaultSort } from 'utils/fun';

const Monthly = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavParam, 'Monthly'>>()
  const { onGetTodoById } = todoStore();
  const todos = todoStore((state) => state.todos)
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [filteredTodos, setFilteredTodos] = useState<TTodoDetail[]>(todos)
  const [markedDates, setMarkedDates] = useState({})
  const [searchTxt, setSearchTxt] = useState<string>('')
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [selectedFilter, setSelectedFilter] = useState('All')

  useFocusEffect(
    React.useCallback(() => {
      const flattenDate = todos.flatMap(o => o.createdDate)
      let newArr = {};
      flattenDate.map(o => {
        let item = {
          [`${moment(o).format('YYYY-MM-DD')}`]: SELECTED_FORMAT
        }
        newArr = { ...item, ...newArr }
      });
      setMarkedDates(newArr)
      const filtered = onDefaultMonthly(todos, selectedMonth);
      const sort = onDefaultSort(filtered)
      setFilteredTodos(sort);
    }, [todos, selectedMonth])
  );

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
      const filtered = onDefaultMonthly(todos, selectedMonth);
      const sort = onDefaultSort(filtered)
      setFilteredTodos(sort);
    }
  }

  const onFilterSubmit = (val: string) => {
    const dat = [...filteredTodos];
    setSelectedFilter(val)
    let filtered = dat;
    filtered = onDefaultMonthly(todos, selectedMonth)
    if (val.toLowerCase() !== 'all') {
      filtered = filtered.filter(item => item.status === val);
    }
    const sort = onDefaultSort(filtered)
    setFilteredTodos(sort);
    actionSheetRef.current?.hide()
  }

  const renderItem = ({ item }: { item: TTodoDetail, index: number }) => (
    <CardNote
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
        contentContainerStyle={[TWStyles.flexGrow, { paddingHorizontal: 4 }]} 
        refreshControl={<RefreshControl onRefresh={() => checkNotifications(todos)} refreshing={false} />}
        >
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

export default Monthly