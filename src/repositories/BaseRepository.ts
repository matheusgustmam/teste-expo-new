import { addDoc, collection, CollectionReference, deleteDoc, doc, getDoc,  getDocs, query, setDoc, where, WhereFilterOp } from "firebase/firestore"
import BaseModel from "../models/BaseModel";
import firebaseConverter from "../converters/firebaseConveter";
import { db } from "../../firebase-init";

export abstract class BaseRepository<T extends BaseModel> {
    private collectionRef: CollectionReference;

    constructor(collectionName: string, ModelClass: new () => T) {
        const converter = firebaseConverter(ModelClass)
        this.collectionRef = collection(db, collectionName).withConverter(converter)
    }
    
    async salvar(entidade: T): Promise<void> {
        if (entidade.getId()) {
            const docRef = doc(this.collectionRef, entidade.getId())
            await setDoc(docRef, entidade)
            return entidade
        }else {
            const docRef = addDoc(this.collectionRef, entidade)
            return entidade
        }

    }

    async listarTodos(): Promise<T[]> {
        const snapshot = await getDocs(this.collectionRef)
        return snapshot.docs.map(doc => doc.data()) as T[]
    }    

    async deletar(id: string): Promise<void> {
        const docRef = doc(this.collectionRef, id)
        return deleteDoc(docRef)

    }

    async buscarId(id: string): Promise<T | null> {
        const docRef = doc(this.collectionRef, id)
        const snapshot = await getDoc(docRef)
        return snapshot.exists() ? snapshot.data() as T : null

    }

    async buscarPorCampo(campo: string, operador: WhereFilterOp, valor: any): Promise<T[]> {
        const q = query(this.collectionRef, where(campo, operador, valor));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => doc.data()) as T[];
    }

}