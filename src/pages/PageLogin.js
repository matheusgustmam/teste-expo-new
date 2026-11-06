import { ScrollView } from "react-native";
import { Button , Text, TextInput, Card } from "react-native-paper";
import useAuthService from "../services/loginService";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Usuario from "../models/Usuario";

function PageLogin() {
    const [usuario, setUsuario] = useState(new Usuario())
    const [secureText, setSecureText] = useState(true)
    const [loading, setLoading] = useState(false)
    const { loginEmailSenha, recuperarSenha } = useAuthService();
    const navigation = useNavigation()

    function handleChangeText(campo, texto) {
        const novoUsuario = new Usuario({
            ...usuario,
            [campo]: texto
        })
        setUsuario(novoUsuario)
    }

    async function logarUsuario() {
        try {
            setLoading(true)
            await loginEmailSenha(usuario)
            alert("Login realizado com sucesso!")
        } catch (error) {
            alert("Erro ao logar usuário: " + error.message)
        } finally {
            setLoading(false)
        }
    }
    
    async function recuperarSenhaUsuario() {
    try {
        if (!usuario.getEmail()) {
            alert("Digite seu e-mail primeiro!");
            return;
        }

        setLoading(true);

        await recuperarSenha(usuario.getEmail());

        alert("E-mail de recuperação enviado com sucesso!");

    } catch (error) {
        alert("Erro ao enviar e-mail de recuperação: " + error.message);
    } finally {
        setLoading(false);
    }
}
    
    return (
        <ScrollView>
            <Card>
                <Card.Content>
                    <TextInput 
                        label="E-mail"
                        placeholder="Insira seu e-mail" 
                        value={usuario.getEmail()}
                        autoCapitalize="none"
                        onChangeText={(text) => handleChangeText("email", text)} />
                    <TextInput 
                        label="Senha" 
                        placeholder="Insira sua senha."
                        value={usuario.getSenha()}
                        secureTextEntry={secureText}
                        autoCapitalize="none"
                        onChangeText={(text) => handleChangeText("senha", text)}
                        right={<TextInput.Icon icon="eye" onPress={() => setSecureText(!secureText)} />}
                        />
                    <Button loading={loading} disabled={loading} onPress={() => logarUsuario()}>Entrar</Button>
                    <Text>Esqueceu sua senha?</Text>
                    <Button loading={loading} onPress={() => recuperarSenhaUsuario()}>Recuperar senha</Button>
                    <Text>Não tem cadastro? </Text>
                    <Button onPress={() => navigation.navigate("Cadastro")}>Cadastrar</Button>
                </Card.Content>        
            </Card>
        </ScrollView>
    )
}

export default PageLogin;