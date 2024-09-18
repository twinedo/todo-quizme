import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { scheduleTodoNotifications } from 'services/notifications';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
        console.log('error taskmanager', error)
      return;
    }
    if (data) {
        console.log('data taskmanger', data);
        scheduleTodoNotifications();
    //   const { locations } = data;
      // do something with the locations captured in the background
    }
  });

export async function registerBackgroundFetch() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 2, // 2 minutes
    stopOnTerminate: false,
    startOnBoot: true,
  });
}
