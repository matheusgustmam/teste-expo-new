
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import StackNavigator from "./StackNavigator";
import PageIFPR from "../pages/PageIFPR";
import PageReactNative from "../pages/PageReactNative";
import PageExpo from "../pages/PageExpo";
import PagePerfil from "../pages/PagePerfil";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({
    deslogar
}: {
    deslogar: () => void
}) {
    return (
        <Drawer.Navigator
            drawerContent={(props) => (
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="Sair"
                        icon={() => (
                            <Ionicons
                                name="log-out-outline"
                                size={24}
                                color="red"
                            />
                        )}
                        onPress={deslogar}
                    />
                </DrawerContentScrollView>
            )}
        >
            <Drawer.Screen
                name="Início"
                component={StackNavigator}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="home" size={24} color="blue" />
                    ),
                }}
            />

            <Drawer.Screen
                name="Meu Perfil"
                component={PagePerfil}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="person-circle" size={24} color="blue" />
                    ),
                }}
            />

            <Drawer.Screen
                name="IFPR"
                component={PageIFPR}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="school" size={24} color="blue" />
                    ),
                }}
            />

            <Drawer.Screen
                name="React Native"
                component={PageReactNative}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="logo-react" size={24} color="blue" />
                    ),
                }}
            />

            <Drawer.Screen
                name="Expo"
                component={PageExpo}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="phone-portrait" size={24} color="blue" />
                    ),
                }}
            />

        </Drawer.Navigator>
    );
}
