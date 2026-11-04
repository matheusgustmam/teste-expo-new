import Usuario from "../models/Usuario";
import { BaseRepository } from "./BaseRepository";

export class UsuarioRepository extends BaseRepository<Usuario> {
    constructor() {
        super('Usuarios', Usuario);
    }

    async buscarPorEmail(email: string): Promise<Usuario[]> {
        const resultado = await this.buscarPorCampo('email', '==', email);
        return resultado
    }

}    