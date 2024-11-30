import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home-screen';
import MemberScreen from '../screens/members-screen';

const Tab = createBottomTabNavigator();

export default function HomeTabScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Members" component={MemberScreen} />
        </Tab.Navigator>
    );
}