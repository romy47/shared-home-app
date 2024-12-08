import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/auth-stack';
import HomeTabStack from './navigation/home-tab-stack';
import auth from '@react-native-firebase/auth';

const AppNavigator = () => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
  
    // Handle user state changes
    function onAuthStateChanged(user: any) {
      if (user) {
        if (user.emailVerified === true) {
          console.log('email is verified');
          setUser(user);
        } else {
          console.log('email is not verified');
        }
      } else {
        setUser(user);
      }
      if (initializing) setInitializing(false);

    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <HomeTabStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const App = () => {
  return (
      <AppNavigator />
  );
};

export default App;