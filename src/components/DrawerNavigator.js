import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import StackNavigator from "./StackNavigator";
import PageIFPR from "../pages/PageIFPR";
import PageReactNative from "../pages/PageReactNative";
import PageExpo from "../pages/PageExpo";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator>

            <Drawer.Screen
                name="Início"
                component={StackNavigator}
                options={{
                    drawerIcon: () => (
                        <Ionicons
                            name="home"
                            size={24}
                            color="blue"
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="IFPR"
                component={PageIFPR}
                options={{
                    drawerIcon: () => (
                        <Ionicons
                            name="school"
                            size={24}
                            color="blue"
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="React Native"
                component={PageReactNative}
                options={{
                    drawerIcon: () => (
                        <Ionicons
                            name="logo-react"
                            size={24}
                            color="blue"
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="Expo"
                component={PageExpo}
                options={{
                    drawerIcon: () => (
                        <Ionicons
                            name="phone-portrait"
                            size={24}
                            color="blue"
                        />
                    ),
                }}
            />

        </Drawer.Navigator>
    );
}