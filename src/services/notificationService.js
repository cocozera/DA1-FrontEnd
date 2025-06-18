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
    console.log('✅ Permiso ya otorgado');
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
  console.log(`[Notification] Polling cada ${intervalMinutes} min`);

  notificationInterval = setInterval(async () => {
    try {
      const res = await api.get('/notifications'); 
      const notifications = res.data;

      console.log(notifications);

      if (notifications.length > 0) {
        for (const n of notifications) {
          await sendNotification(n.title, n.message);
          console.log(`[Notification] Noti enviada: ${n.title}`);
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
    console.log('[Notification] Polling detenido');
  }
}

export function isNotificationServiceRunning() {
  return notificationInterval !== null;
}
