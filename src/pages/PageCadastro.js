import { ScrollView } from "react-native";
import {Button, Card, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import useAuthService from "../services/loginService";
import { useNavigation } from "@react-navigation/nitive";
import Usuario from "../models/Usuario";
import { Endereco } from "../models/Endereco";

function PageCadastro() {
    const [usuario, setUsuario] = useState(new Usuario())
    const [endereco, setEndereco] = useState(new Endereco())

    const [secureText, setSecureText] = useState(true)
    const [loading, setLoading] = useState(false)
    const { cadastrarEmailSenha } = useAuthService();
    const navigation = useNavigation();

    function handleOnChangeTextUsuario(campo, texto){
        const novoUsuario = new Usuario({
            ...usuario, [campo]: texto
        })
        setUsuario(novoUsuario)
    }

    function handleOnChangeTextEndereco(campo, texto){
        const novoEndereco = new Endereco({
            ...endereco, [campo]: texto
        })
        setEndereco(novoEndereco)
    }

    async function cadastrarUsuario(){
        try {
            setLoading(true)
            const usuarioCompleto = new Usuario({
                ...usuario, endereco: endereco
            })
            await cadastrarEmailSenha(usuarioCompleto)
            alert("Cadastro realizado com sucesso!")
        } catch (error) {
            console.error(err)
            alert("Erro ao cadastrar usuário: ")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <ScrollView>
            <Card>
                <Card.Content>
                    <TextInput 
                        label="Nome Completo" 
                        placeholder="Insira seu nome completo"
                        value={usuario.getNome()} 
                        onChangeText={(text) => handleOnChangeTextUsuario("nome", text)} 
                    />
                    <TextInput 
                        label="E-mail" 
                        placeholder="Insira seu e-mail" 
                        value={usuario.getEmail()} 
                        onChangeText={(text) => handleOnChangeTextUsuario("email",text)}
                    />
                    <TextInput 
                        label="Senha"
                        placeholder="Insira sua senha." 
                        value={usuario.getSenha()} 
                        secureTextEntry={secureText} 
                        onChangeText={(text) => handleOnChangeTextUsuario("senha", text)}
                        right={<TextInput.Icon icon="eye" onPress={() => setSecureText(!secureText)} 
                        /> 
                    }
                    />
                    <TextInput
                        label="Logradouro"
                        placeholder="Insira o nome do seu logradouro."
                        value={endereco.getLogradouro()}
                        onChange={(text) => handleOnChangeTextEndereco("logradouro",text)}
                    />    
                    <Button loading={loading} onPress={() => cadastrarUsuario()}>Cadastrar</Button>
                    <Text>Já possui uma conta?</Text>
                    <Button onPress={() => navigation.navigate("Login")} >Entrar</Button>   
                </Card.Content>
            </Card>
        </ScrollView>
    )
    
    }

    export default PageCadastro;