import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut
} from "firebase/auth";

import { auth } from "../../firebase-init";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import Usuario from "../models/Usuario";

const usuarioRepository = new UsuarioRepository();

function useAuthService() {

    // CADASTRAR USUÁRIO
    const cadastrarEmailSenha = async (usuario: Usuario) => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        usuario.getEmail(),
        usuario.getSenha()
    );

        try {
        usuario.setId(userCredential.user.uid);

        await usuarioRepository.salvar(usuario);

        await sendEmailVerification(userCredential.user);
        await signOut(auth);

        } catch (error) {
        console.error("Erro no cadastro:", error);
        throw error;
        }
    };

    // REALIZAR LOGIN
    const loginEmailSenha = async (usuario: Usuario) => {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            usuario.getEmail(),
            usuario.getSenha()
        );

        if (!userCredential.user.emailVerified) {
            await signOut(auth);
            throw new Error(
                "Você precisa confirmar seu e-mail antes de entrar."
            );
        }

        const usuarioBusca = await usuarioRepository.buscarId(
            userCredential.user.uid
        );

        if (!usuarioBusca) {
            await signOut(auth);
            throw new Error("Dados do usuário não encontrados.");
        }

        return usuarioBusca;
    };

    // RECUPERAR SENHA
    const recuperarSenha = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
    };

    // BUSCAR USUÁRIO PELO UID
    const buscarUsuario = async (id: string) => {
        return await usuarioRepository.buscarId(id);
    };

    return {
        cadastrarEmailSenha,
        loginEmailSenha,
        recuperarSenha,
        buscarUsuario
    };
}

export default useAuthService;
