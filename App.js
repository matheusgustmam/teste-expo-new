
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
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

    const { buscarUsuario } = useAuthService();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
            if (usuario && usuario.emailVerified) {
                try {
                    const usuarioBusca = await buscarUsuario(usuario.uid);

                    if (usuarioBusca) {
                        dispatch(setUsuarioLogado(usuarioBusca));
                    } else {
                        alert("Dados não localizados no banco. Tente novamente mais tarde.");
                        dispatch(removerUsuarioLogado());
                    }
                } catch (error) {
                    console.log("Erro ao buscar usuário:", error);
                    dispatch(removerUsuarioLogado());
                }
            } else {
                dispatch(removerUsuarioLogado());
            }
        });

        return unsubscribe;
    }, [dispatch]);

    async function deslogar() {
        try {
            await signOut(auth);
        } catch (err) {
            alert("Erro ao deslogar: " + err.message);
        }
    }

    return (
        <NavigationContainer>
            <PaperProvider>
                {usuarioLogado ? (
                    <DrawerNavigator deslogar={deslogar} />
                ) : (
                    <LoginStackNavigator />
                )}
            </PaperProvider>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}
