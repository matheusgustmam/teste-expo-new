import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BotaoContador from "../components/BotaoContador";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function PageContador() {
    const navigation = useNavigation();

    const [contador, setContador] = useState(0);

    function aumentarContador() {
        setContador(contador + 1);
    }

    function aumentarContador1000() {
        setContador(contador + 1000);
    }

    function irParaTarefas() {
        navigation.navigate("Tarefas");
    }

    function voltar() {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.titulo}>
                CONTADOR:
            </Text>

            <Text style={styles.numero}>
                {contador}
            </Text>

            <BotaoContador
                onPress={aumentarContador}
                onLongPress={aumentarContador1000}
            >
                Aumentar Contador
            </BotaoContador>

            <Button
                mode="contained"
                onPress={irParaTarefas}
                style={styles.botao}
            >
                Tarefas
            </Button>

            <Button
                onPress={voltar}
                style={styles.botao}
            >
                Voltar
            </Button>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },

    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },

    numero: {
        fontSize: 40,
        marginBottom: 20,
    },

    botao: {
        marginTop: 15,
        width: 200,
    },
});

export default PageContador;