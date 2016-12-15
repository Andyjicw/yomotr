import { Alert } from 'react-native';
import { Permissions, Notifications } from 'exponent';

const PUSH_ENDPOINT = 'https://powerful-sea-10435.herokuapp.com';

async function getPushNotificationsToken() {
  const { status } = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS);

  if (status === 'denied') {
    Alert.alert(
      'Push permissions error!',
      'Please allow this app to use Push notifications from your phone configuration'
    );

    return 'denied';
  }

  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  const ask = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (ask.status === 'denied') {
    return 'denied';
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExponentPushTokenAsync();

  return token;
}

const sendYo = (token, from) => (
  // POST the token to our backend so we can use it to send pushes from there
   fetch(`${PUSH_ENDPOINT}/sendyo/${token}/${from}`, {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json'
     }
   })
);

const pushNotifications = {
  getPushNotificationsToken,
  sendYo
};

export default pushNotifications;
