import React from 'react';
import GuestStack from './navigation/auth-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/auth-stack';
import DrawerStack from './navigation/drawer-stack';
import HomeTabStack from './navigation/home-tab-stack';

export default function App() {
  return (
    <NavigationContainer>
      {/* <HomeTabStack /> */}
      <AuthStack />
    </NavigationContainer>
  );
}
