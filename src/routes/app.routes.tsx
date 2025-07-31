import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Groups } from "@screens/groups"
import { NewGroup } from '../screens/NewGroup/index';
import Player from "@screens/Players";

const { Navigator, Screen } = createNativeStackNavigator()
export default function AppRoutes() {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen
                name="group"
                component={Groups}
            />
            <Screen
                name="new"
                component={NewGroup}
            />
            <Screen
                name="players"
                component={Player}
            />
        </Navigator>
    )
}