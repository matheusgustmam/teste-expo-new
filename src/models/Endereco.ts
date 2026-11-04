export class Endereco {
    private cep: string;
    private logradouro: string;
    private numero: string;

    constructor(dados?: any) {
        this.cep = dados?.cep || '';
        this.logradouro = dados?.logradouro || '';
        this.numero = dados?.numero || '';
    }

    toFirestore(): any {
        const { ...dados } = this;
        return dados
    }
    getCep() {
        return this.cep
    }
    getLogradouro() {
        return this.logradouro
    }
    getNumero() {
        return this.numero
    }
}