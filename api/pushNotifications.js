import { Permissions, Notifications } from 'exponent';

const PUSH_ENDPOINT = 'https://powerful-sea-10435.herokuapp.com';

const registerForPushNotifications = () => {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS)
  .then((response) => {
    const { status } = response;

    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
      return;
    }

    sendPushNotification('welcome');
  });
};

const photoUploadedPushNotification = () => {
  sendPushNotification('photo');
};

const sendPushNotification = (type) => {
  // Get the token that uniquely identifies this device
  Notifications.getExponentPushTokenAsync()
  .then((response) => {
    const token = response;

    // POST the token to our backend so we can use it to send pushes from there
    return fetch(`${PUSH_ENDPOINT}/${type}/${token}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  });
};

const pushNotifications = {
  registerForPushNotifications,
  photoUploadedPushNotification
};

export default pushNotifications;
