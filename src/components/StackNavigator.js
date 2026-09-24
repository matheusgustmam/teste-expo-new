import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PageContador from "../pages/PageContador";
import PageTarefas from "../pages/PageTarefas";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Contador"
                component={PageContador}
                options={{
                    title: "Contador",
                }}
            />

            <Stack.Screen
                name="Tarefas"
                component={PageTarefas}
                options={{
                    title: "Tarefas",
                }}
            />
        </Stack.Navigator>
    );
}