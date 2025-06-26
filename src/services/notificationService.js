import * as Notifications from 'expo-notifications';
import api from './api';

let notificationInterval = null;

export async function configureNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  if (existingStatus === 'granted') {
    return true;
  }

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}


export async function sendNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
}

export function startPeriodicNotifications(intervalMinutes = 1) {
  if (notificationInterval) clearInterval(notificationInterval);

  const intervalMs = intervalMinutes * 60 * 1000;

  notificationInterval = setInterval(async () => {
    try {
      const res = await api.get('/notifications'); 
      const notifications = res.data;


      if (notifications.length > 0) {
        for (const n of notifications) {
          await sendNotification(n.title, n.message);
        }
      }
    } catch (err) {
      console.error('[Notification] Error consultando:', err.message);
    }
  }, intervalMs);
}

export function stopPeriodicNotifications() {
  if (notificationInterval) {
    clearInterval(notificationInterval);
    notificationInterval = null;
  }
}

export function isNotificationServiceRunning() {
  return notificationInterval !== null;
}
