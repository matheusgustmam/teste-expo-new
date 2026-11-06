import { useEffect, useState } from "react";

import { ActivityIndicator, PaperProvider } from "react-native-paper";
import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-init";

import LoginStackNavigator from "./src/components/LoginStackNavigator";
import DrawerNavigator from "./src/components/DrawerNavigator";

import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";

import {
    removerUsuarioLogado,
    setUsuarioLogado
} from "./src/slices/usuarioLogadoSlice";

import useAuthService from "./src/services/loginService";

function AppContent() {

    const dispatch = useDispatch();

    const usuarioLogado = useSelector(
        (state) => state.usuarioLogado?.usuarioLogado
    );

    const [carregando, setCarregando] = useState(true);

    const { buscarUsuario } = useAuthService();

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(
            auth,
            async (usuario) => {
                try {
                    if (usuario && usuario.emailVerified) {

                        const usuarioBusca = await buscarUsuario(
                            usuario.uid
                        );

                        if (usuarioBusca) {
                            dispatch(setUsuarioLogado(usuarioBusca));
                        } else {
                            dispatch(removerUsuarioLogado());
                            await signOut(auth);
                        }
                    } else {
                        dispatch(removerUsuarioLogado());
                    }
                } catch (error) {
                    console.log(
                        "Erro ao verificar autenticação:",
                        error
                    );
                    dispatch(removerUsuarioLogado());
                    await signOut(auth);
                } finally {
                    setCarregando(false);
                }
            }
        );
        return unsubscribe;

    }, [dispatch]);

    async function deslogar() {
        try {
            await signOut(auth);
        } catch (error) {
            alert("Erro ao deslogar: " + error.message);
        }
    }

    if (carregando) {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {usuarioLogado ? (
                <DrawerNavigator deslogar={deslogar} />
            ) : (
                <LoginStackNavigator />
            )}
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <AppContent />
            </PaperProvider>
        </Provider>
    );
}