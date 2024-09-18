import moment from 'moment';
import * as Notifications from 'expo-notifications';

const todos = [
  { id: 1, title: 'Task 1', description: 'Do something', time: '11 AM' },
  { id: 2, title: 'Task 2', description: 'Do something else', time: '12 PM' }
];

export function scheduleTodoNotifications() {
  todos.forEach(todo => {
    const now = moment(); // Current date and time
    const todoTime = moment(todo.time, 'hh A'); // Parse the time from the string

    const currentDayTodoTime = moment().set({
        hour: todoTime.get('hour'),
        minute: todoTime.get('minute'),
        second: 0,
        millisecond: 0
      });
    const testTime = currentDayTodoTime.add(1, 'minutes');

    if (testTime.isAfter(now)) {
      scheduleNotification(todo, todoTime);
    }
  });
}

function scheduleNotification(todo, todoTime) {
  const trigger = new Date(todoTime);

  Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder",
      body: `${todo.title}: ${todo.description}`,
    },
    trigger: trigger,
  });
}
