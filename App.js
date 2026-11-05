import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-init";
import LoginStackNavigator from "./src/components/LoginStackNavigator";
import DrawerNavigator from "./src/components/DrawerNavigator"

export default function App() {
  
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  async function registerOnAuthStateChanged() {
    onAuthStateChanged(auth, (usuario) => {
      setUsuarioLogado(usuario)
    })
  }
  
  useEffect(() => {
    registerOnAuthStateChanged();
  }, [])

  async function deslogar(){
    try {
      await signOut(auth)
    } catch (err) {
      alert("Erro ao deslogar: " + err.message)
    }
  }

  return (
    <NavigationContainer>
      <PaperProvider>
        {usuarioLogado ?<DrawerNavigator deslogar={deslogar} /> : <loginStackNavigator />}
      </PaperProvider>
    </NavigationContainer>
  );
}

