import { createRouter } from '@exponent/ex-navigation';
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FriendsScreen from '../screens/FriendsScreen';

const Router = createRouter(() =>
   ({
     auth: () => AuthScreen,
     login: () => LoginScreen,
     signup: () => SignupScreen,
     friends: () => FriendsScreen,
     profile: () => ProfileScreen
   })
);

export default Router;
