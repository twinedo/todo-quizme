import { ICategory } from '@/services/api/category';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface ICategoryState {
	id: string;
	name: string;
}

interface ICategoryStore {
	selectedCategory: ICategory;
	_onSelectedCategory: (data: ICategory) => void;
	_onResetSelectedCategory: () => void;
}

const initState: ICategory = {
	id: '',
	name: '',
	image: '',
	hashtag: '',
};

const categoryStore = create<ICategoryStore>()(
	devtools(
		persist(
			(set) => ({
				selectedCategory: initState,
				_onSelectedCategory: (data: ICategory) => {
					set({ selectedCategory: data });
				},
				_onResetSelectedCategory: () => {
					set({ selectedCategory: initState });
				},
			}),
			{
				name: '@categoryState-cookingapp',
				// storage: createJSONStorage(() => zustandStorage),
				storage: createJSONStorage(() => localStorage),
			}
		)
	)
);

export default categoryStore;
