import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut
} from "firebase/auth";
import { auth } from "../firebase";

function useAuthService() {

    const cadastrarEmailSenha = async (usuario) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, usuario.email, usuario.senha);
            await sendEmailVerification(userCredential.user);
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    }
    
    const loginEmailSenha = async (usuario) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, usuario.email, usuario.senha);
            return userCredential
        } catch (error) {
            throw error;
        }
    }
    
    const recuperarSenha = async (usuario) => {
        try {
            await sendPasswordResetEmail(auth, usuario.email);
        } catch (error) {
            throw error;
        }
    }

    return { cadastrarEmailSenha, loginEmailSenha, recuperarSenha };
}

export default useAuthService;