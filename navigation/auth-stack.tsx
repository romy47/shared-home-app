import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login-screen";
import SignUpScreen from "../screens/signup-screen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
