import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home-screen';
import ProfileDrawer from '../screens/profile-drawer';

const Tab = createBottomTabNavigator();

export default function HomeTabScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileDrawer} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
}