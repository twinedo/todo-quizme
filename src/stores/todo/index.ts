import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { TTodo, TTodoDetail, TTodoFilterStatus, TTodoSort, TTodoSortDate, TTodoSubmitMethod } from './todo.type';
import { v7 as uuid7 } from 'uuid';
import moment from 'moment';
import lodash from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

const todoStore = create<TTodo>()(
	devtools(
		persist(
			(set, get) => ({
				todos: [],
				selectedTodo: null,
				onSubmit: (data: TTodoDetail) => {
					let newArr: TTodoDetail[] = get().todos
					let item: TTodoDetail = {
						...data,
						id: uuid7(),
						title: data.title,
						description: data.description,
						createdDate: moment(new Date()).toString(),
						updatedDate: undefined,
						status: 'active',
					}
					newArr.push(item);
					set({ todos: newArr });
				},
				onUpdate: (data: TTodoDetail) => {
					let dat = [...get().todos];
					const findIdx = dat.findIndex(o => o.id === data.id);

					dat[findIdx].title = data.title;
					dat[findIdx].description = data.description;
					dat[findIdx].status = data.status;
					dat[findIdx].updatedDate = moment(new Date()).toString();
					set({todos: dat});
				},
				onDelete: (id: string) => {
					let data = get().todos
					const filter = data.filter(item => item.id !== id);
					set({ todos: filter });
				},
				onFilter: (status: TTodoFilterStatus) => {
					let data = get().todos
					let filter = data;
					if (status !== 'all') {
						filter = data.filter(item => item.status === status);
					}
					set({ todos: filter });
				},
				onFilterByDate: (date: string) => {
					let data = get().todos
					const filter = data.filter(item => item.createdDate === date);
					set({ todos: filter });
					return filter
				},
				onSearch: (text: string) => {
					let data = get().todos
					if (text.length > 0) {
						const filter = data.filter(
							item => item.title.toLowerCase().includes(text.toLowerCase()) ||
								item.description.toLowerCase().includes(text.toLowerCase()) ||
								item.status?.toLowerCase().includes(text.toLowerCase())
						);

						set({ todos: filter });
					}
					set({todos: data})
				},
				onSort: (sort?: TTodoSort, date?: TTodoSortDate) => {
					let data = get().todos
					// Sorting by alphabet
					if (sort) {
						data = lodash.orderBy(
							data,
							[(item: TTodoDetail) => item.title.toLowerCase()],
							[sort === 'A-Z' ? 'asc' : 'desc']
						);
					}

					// Sorting by date
					if (date) {
						data = lodash.orderBy(
							data,
							['created_at'], // assuming the 'created_at' field holds the date
							[date === 'latest' ? 'desc' : 'asc']
						);
					}
					set({ todos: data })
				},
				onGetTodoById: (id: string) => {
					let data = get().todos
					const filter = data.filter(item => item.id === id);
					set({ selectedTodo: filter[0] });
				},
				onSetSelectedTodo: (data: TTodoDetail | null) => {
					set({selectedTodo: data})
				}
			}),
			{
				name: '@todoState-quizme',
				storage: createJSONStorage(() => AsyncStorage),
			}
		)
	)
);

export default todoStore;
