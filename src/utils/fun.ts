import moment from "moment";
import { onDisplayNotification } from "services/notifications";
import { TTodoDetail } from "stores/todo/todo.type";

export const onDefaultMonthly = (data: TTodoDetail[], value: number) => {
  const filtered = data.filter(item => moment(item.createdDate).month() === value);
  return filtered
}

export const onDefaultDaily = (data: TTodoDetail[], value: Date) => {
  const filtered = data.filter(item => moment(item.createdDate).format('YYYY-MM-DD') === moment(value).format('YYYY-MM-DD'));
  return filtered
}

export const onDefaultSort = (data: TTodoDetail[]) => {
    const sort = data.sort((a, b) => {
      const dateA = new Date(`${a.createdDate}`).valueOf();
      const dateB = new Date(`${b.createdDate}`).valueOf();
      if (dateA < dateB) {
        return 1;
      }
      return -1
    })
    
    return sort
  }

export const checkNotifications = (data: TTodoDetail[]) => {
  const now = moment();
  const activeTodos = data.filter(item => item.status === 'active')
  const oneDayActiveTodos = activeTodos.filter(item => now.isAfter(moment(item.createdDate).add(1, 'days'))); //to check one day after note created
  oneDayActiveTodos.length > 0 && onDisplayNotification('Hey, buddy', `You have ${oneDayActiveTodos.length} active note(s). Please take an action!`)
};