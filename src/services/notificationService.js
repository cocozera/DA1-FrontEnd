// ./services/notificationService.js

import * as Notifications from 'expo-notifications';
import api from './api';

let notificationInterval = null;
let countdownInterval = null;

export async function configureNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

// PEDIDO: registra el token de Expo en tu backend
export async function registerPushToken(userId) {
  try {
    const { data: { data: expoToken } } = await Notifications.getExpoPushTokenAsync();
    await api.post('/push-token', { userId, token: expoToken });
  } catch (err) {
    console.error('[registerPushToken] ', err);
  }
}

export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function sendNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
}

export function startPeriodicNotifications(intervalSeconds = 10) {
  if (notificationInterval) clearInterval(notificationInterval);
  if (countdownInterval) clearInterval(countdownInterval);

  let countdown = intervalSeconds;
  countdownInterval = setInterval(() => {
    countdown--;
    if (countdown < 0) countdown = intervalSeconds;
  }, 1000);

  notificationInterval = setInterval(async () => {
    countdown = intervalSeconds;
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
  }, intervalSeconds * 1000);
}

export function stopPeriodicNotifications() {
  if (notificationInterval) {
    clearInterval(notificationInterval);
    notificationInterval = null;
  }
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

export function isNotificationServiceRunning() {
  return notificationInterval !== null;
}
