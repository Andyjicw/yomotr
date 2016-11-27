import { createRouter } from '@exponent/ex-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import FriendsScreen from '../screens/FriendsScreen';

const Router = createRouter(() =>
   ({
     profile: () => ProfileScreen,
     friends: () => FriendsScreen
   })
);

export default Router;
