import React from 'react';
import { StackNavigation } from '@exponent/ex-navigation';
import Router from '../navigation/Router';

class App extends React.Component {
  render() {
    const initialRoute = Router.getRoute('auth');

    return (
      <StackNavigation
        id="root"
        initialRoute={initialRoute}
      />
    );
  }
}

export default App;
