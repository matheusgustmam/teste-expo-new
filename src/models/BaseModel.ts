export default abstract class BaseModel {
    private id: string | null; 
    private criadoEm: Date;
    private atualizadoEm: Date;

    constructor(dados?: any) {
        this.id = dados?.id || null
        this.criadoEm = dados?.criadoEm || new Date();
        this.atualizadoEm = dados?.atualizadoEm || new Date();
    }

    toFirestore(): any {
        const { id, ...dados } = this;
        return dados;
    }

    fromFirestore(snapshot: any, options?: any): BaseModel {
    const dados = snapshot.data(options);
    const converterData = (valor: any): Date => {
        if (valor?.toDate) {
            return valor.toDate();
        }

        return valor instanceof Date ? valor : new Date();
    };
    this.id = snapshot.id;
    this.criadoEm = converterData(dados.criadoEm);
    this.atualizadoEm = converterData(dados.atualizadoEm);
    return this;
    }

    getId() {
        return this.id
    }

    getCriadoEm() {
        return this.criadoEm
    }

    getAtualizadoEm() {
        return this.atualizadoEm
    }

    setId(id: string) {
        this.id = id
    }

    setAtualizadoEm(atualizadoEm: Date) {
        this.atualizadoEm = atualizadoEm
    }

}