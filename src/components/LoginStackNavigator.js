import{ createNativeStackNavigator } from "@react-navigation/native-stack";
import PageLogin from "../pages/PageLogin";
import PageCadastro from "../pages/PageCadastro";

const Stack = createNativeStackNavigator();

function LoginStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={PageLogin} />
            <Stack.Screen name="Cadastro" component={PageCadastro} />
        </Stack.Navigator>
    )
}
export default LoginStackNavigator