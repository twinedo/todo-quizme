export type TTodoDetail = {
    id: string;
    title: string;
    description: string;
    createdDate: string | undefined;
    updatedDate: string | undefined;
    status: 'active' | 'done'
}

export type TTodoSubmitMethod = 'create' | 'update'

export type TTodoFilterStatus = 'all' | 'active' | 'done'

export type TTodoSort = 'A-Z' | 'Z-A'

export type TTodoSortDate = 'latest' | 'oldest'

export type TTodo = {
    todos: TTodoDetail[],
    selectedTodo: TTodoDetail | null,
    onSubmit?: (data: TTodoDetail) => void,
    onUpdate?: (data: TTodoDetail) => void,
    onDelete?: (id: string) => void,
    onFilter?: (status: TTodoFilterStatus) => void,
    onFilterByDate?: (date: string) => void;
    onSearch?: (text: string) => void,
    onSort?: (sort?: TTodoSort, date?: TTodoSortDate) => void,
    onGetTodoById?: (id: string) => void
    onSetSelectedTodo?: (data: TTodoDetail | null) => void,
}

export type TDayPressProps = {
    dateString: string;
    day: number;
    month: number;
    timestamp: number; 
    year: number;
}