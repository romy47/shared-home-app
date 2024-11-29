import React from 'react';
import GuestStack from './navigation/auth-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/auth-stack';
import DrawerStack from './navigation/drawer-stack';

export default function App() {
  return (
    <NavigationContainer>
      {/* <DrawerStack /> */}
      <AuthStack />
    </NavigationContainer>
  );
}
