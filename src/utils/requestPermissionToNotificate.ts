export const requestPermissionToNotificate = () => {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") return;

  if (Notification.permission === "denied") return;

  Notification.requestPermission().then((permission) => {
    console.log('permitiu notificação');
  });
}