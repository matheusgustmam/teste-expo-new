import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Avatar,
    Card,
    List,
    Text
} from "react-native-paper";
import { ScrollView } from "react-native";

import { auth } from "../../firebase-init";
import { UsuarioRepository } from "../repositories/UsuarioRepository";

const usuarioRepository = new UsuarioRepository();

export default function PagePerfil() {

    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function carregarPerfil() {
            try {
                const usuarioAtual = auth.currentUser;

                if (!usuarioAtual) {
                    throw new Error("Nenhum usuário autenticado.");
                }

                const dadosUsuario = await usuarioRepository.buscarId(
                    usuarioAtual.uid
                );

                if (!dadosUsuario) {
                    throw new Error("Dados do usuário não encontrados.");
                }

                setUsuario(dadosUsuario);

            } catch (error) {
                console.log("Erro ao carregar perfil:", error);
                alert(error.message);

            } finally {
                setLoading(false);
            }
        }

        carregarPerfil();

    }, []);

    if (loading) {
        return (
            <ActivityIndicator
                animating={true}
                size="large"
                style={{ flex: 1 }}
            />
        );
    }

    if (!usuario) {
        return (
            <Text style={{ margin: 20 }}>
                Não foi possível carregar o perfil.
            </Text>
        );
    }

    return (
        <ScrollView>
            <Card style={{ margin: 16 }}>
                <Card.Content>

                    <Avatar.Icon
                        size={90}
                        icon="account"
                        style={{ alignSelf: "center", marginBottom: 16 }}
                    />

                    <Text
                        variant="headlineSmall"
                        style={{ textAlign: "center", marginBottom: 20 }}
                    >
                        Meu Perfil
                    </Text>

                    <List.Item
                        title="Nome completo"
                        description={usuario.getNome() || "Não informado"}
                        left={(props) => (
                            <List.Icon {...props} icon="account" />
                        )}
                    />

                    <List.Item
                        title="E-mail"
                        description={usuario.getEmail() || "Não informado"}
                        left={(props) => (
                            <List.Icon {...props} icon="email" />
                        )}
                    />

                    <List.Item
                        title="Telefone"
                        description={usuario.getTelefone() || "Não informado"}
                        left={(props) => (
                            <List.Icon {...props} icon="phone" />
                        )}
                    />

                    <List.Item
                        title="Logradouro"
                        description={
                            usuario.getEndereco()?.getLogradouro()
                            || "Não informado"
                        }
                        left={(props) => (
                            <List.Icon {...props} icon="map-marker" />
                        )}
                    />

                    <List.Item
                        title="UID do Firebase"
                        description={auth.currentUser?.uid || "Não disponível"}
                        left={(props) => (
                            <List.Icon {...props} icon="identifier" />
                        )}
                    />

                </Card.Content>
            </Card>
        </ScrollView>
    );
}