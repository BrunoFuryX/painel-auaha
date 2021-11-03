import app from "./firebase"
import { getFirestore, collection, deleteDoc , getDoc, getDocs, setDoc, addDoc , doc, query, orderBy, where, limit } from "firebase/firestore"
import { getStorebyId, getStoresbyOrder, setStore, deleteStore, getStoresbyWhere, getStores } from '/public/services/lojas';

const db = getFirestore(app)


const fileRef = collection(db, "photo")
const options = {
    hourCycle: 'h23'
}
const getArquivoById = async (id) => {
    const querySnapshot = await getDoc(doc(fileRef, id));

    let response
    
    if (querySnapshot.exists()) {
        response = querySnapshot.data();
    } else {
        console.log("No such document!");
    }

    return response
}

const getArquivos = async () => {
    const querySnapshot = await getDocs(query(fileRef, orderBy("data", "desc")))

    var response = []

    querySnapshot.forEach( async (doc) => {
        const resposta = await getStorebyId(doc.data().loja != "" ? doc.data().loja : "Auaha")

        if(resposta){
            var loja = resposta.StoreName
            response.push({
                id: doc.id,
                data: new Date(parseInt(doc.data().data)).toLocaleString('pt-BR', options),

                tipo: doc.data().tipo,
                url: doc.data().url,
                loja: loja
            });
        }else{
            var loja = "Auaha"

            response.push({
                id: doc.id,
                data: new Date(parseInt(doc.data().data)).toLocaleString('pt-BR', options),

                tipo: doc.data().tipo,
                url: doc.data().url,
                loja: loja
            });
        }
    });

    return response
}

const getArquivosbyOrder = async (order) => {
    const querySnapshot = await getDocs(query(fileRef, orderBy(order)));

    var response = []

    querySnapshot.forEach( async (doc) => {
        const resposta = await getStorebyId(doc.data().loja != "" ? doc.data().loja : "Auaha")

        if(resposta){
            var loja = resposta.StoreName
            response.push({
                id: doc.id,
                data: new Date(parseInt(doc.data().data)).toLocaleString('pt-BR', options),

                tipo: doc.data().tipo,
                url: doc.data().url,
                loja: loja
            });
        }else{
            var loja = "Auaha"

            response.push({
                id: doc.id,
                data: new Date(parseInt(doc.data().data)).toLocaleString('pt-BR', options),

                tipo: doc.data().tipo,
                url: doc.data().url,
                loja: loja
            });
        }
    });

    return response
}

const getArquivobyWhere = async (campo, valor) => {
    const querySnapshot = await getDocs(query(fileRef, where(campo, '>=', valor), where(campo, '<=', valor +'\uf8ff')));

    var response = []

    querySnapshot.forEach( async (doc) => {
        const resposta = await getStorebyId(doc.data().loja != "" ? doc.data().loja : "Auaha")

        if(resposta){
            var loja = resposta.StoreName
            response.push({
                id: doc.id,
                data: new Date(parseInt(doc.data().data)).toLocaleString('pt-BR', options),

                tipo: doc.data().tipo,
                url: doc.data().url,
                loja: loja
            });
        }else{
            var loja = "Auaha"

            response.push({
                id: doc.id,
                data: new Date(parseInt(doc.data().data)).toLocaleString('pt-BR', options),

                tipo: doc.data().tipo,
                url: doc.data().url,
                loja: loja
            });
        }
    });

    return response
}

const setArquivo = async (data) => {
    var identificador
    if(data.id){
        await setDoc(doc(db, "photo" , data.id), data);
        identificador = data.id
    }else{
        const docRef = await addDoc(fileRef, data);
        identificador = docRef
    }


    return { msg: "pronto", id: identificador}
    
}


const deleteArquivo = async (id) => {
    await deleteDoc(doc(db, "photo" , id));

    return { msg: "pronto"}
}

export { getArquivobyWhere, getArquivos, getArquivoById, getArquivosbyOrder, setArquivo, deleteArquivo }