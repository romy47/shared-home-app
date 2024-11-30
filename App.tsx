import React from 'react';
import GuestStack from './navigation/auth-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/auth-stack';
import DrawerStack from './navigation/drawer-stack';
import HomeTabStack from './navigation/home-tab-stack';
import { LoggedInProvider, useLoggedIn } from './services/auth/auth-context';

const AppNavigator = () => {
  const { isLoggedIn } = useLoggedIn();
  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeTabStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <LoggedInProvider>
      <AppNavigator />
    </LoggedInProvider>
  );
};

export default App;