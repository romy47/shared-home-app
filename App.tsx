import React, { useEffect, useState } from 'react';
import GuestStack from './navigation/auth-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/auth-stack';
import DrawerStack from './navigation/drawer-stack';
import HomeTabStack from './navigation/home-tab-stack';
import { LoggedInProvider, useLoggedIn } from './services/auth/auth-context';
import auth from '@react-native-firebase/auth';

const AppNavigator = () => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
  
    // Handle user state changes
    function onAuthStateChanged(user: any) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;

  const { isLoggedIn } = useLoggedIn();
  return (
    <NavigationContainer>
      {user ? <HomeTabStack /> : <AuthStack />}
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