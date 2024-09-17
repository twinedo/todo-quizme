import { TTodoDetail } from "stores/todo/todo.type";

export type TCardNoteProps = { 
    data: TTodoDetail, 
    onPress: () => void,
    type?: 'monthly' | 'daily'
}