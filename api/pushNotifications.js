import { Permissions, Notifications } from 'exponent';

const PUSH_ENDPOINT = 'https://powerful-sea-10435.herokuapp.com';

async function getPushNotificationsToken() {
  const { status } = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS);

  if (status === 'denied') {
    Alert.alert('Please allow Location permission from your phone configuration');
  } else {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
      return 'denied';
    }

    // Get the token that uniquely identifies this device
    const token = await Notifications.getExponentPushTokenAsync();

    return token;
  }
}

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
  getPushNotificationsToken,
  photoUploadedPushNotification
};

export default pushNotifications;
