import app from "./firebase"
import { getFirestore, collection, deleteDoc , getDoc, getDocs, setDoc, addDoc , doc, query, orderBy, where, limit } from "firebase/firestore"
import { getStorebyId, getStoresbyOrder, setStore, deleteStore, getStoresbyWhere, getStores } from '/public/services/lojas';

const db = getFirestore(app)

const logRef = collection(db, "log")

const options = {
    hourCycle: 'h23'
}
const getLogById = async (id) => {
    const querySnapshot = await getDoc(doc(logRef, id));

    let response
    
    if (querySnapshot.exists()) {
        response = querySnapshot.data();
    } else {
    }

    return response
}
const getLogs = async () => {
    const querySnapshot = await getDocs(logRef)

    var response = []

    querySnapshot.forEach( async (doc) => {
        const resposta = await getStorebyId(doc.data().loja != "" ? doc.data().loja : "Auaha")

        if(resposta){
            var loja = resposta.StoreName
            response.push({
                id: doc.id,
                data: new Date(parseInt(doc.data().data)).toLocaleString('pt-BR', options),
                info: doc.data().info,
                usuario: doc.data().usuario,
                loja: loja
            });
        }else{
            var loja = "Auaha"

            response.push({
                id: doc.id,
                data: new Date(parseInt(doc.data().data)).toLocaleString('pt-BR', options),
                info: doc.data().info,
                usuario: doc.data().usuario,
                loja: loja
            });
        }
    });


    return response
}
const getRecentLogs = async (valor) => {
    const querySnapshot = await getDocs(query(logRef, where("loja", '>=', valor), where("loja", '<=', valor +'\uf8ff'), limit(4)))

    var response = []

    querySnapshot.forEach( async (doc) => {
        
        response.push({
            id: doc.id,
            data: new Date(parseInt(doc.data().data)).toLocaleString('pt-BR', options),
            info: doc.data().info,
            usuario: doc.data().usuario
        });
        
    });


    return response
}

const getLogsbyOrder = async (order) => {
    const querySnapshot = await getDocs(query(logRef, orderBy(order)));

    var response = []

    querySnapshot.forEach( async (doc) => {
        
        response.push({
            id: doc.id,
            data: new Date(parseInt(doc.data().data)).toLocaleString('pt-BR', options),

            info: doc.data().info,
        });
        
    });

    return response
}

const getLogbyWhere = async (campo, valor) => {
    const querySnapshot = await getDocs(query(logRef, where(campo, '>=', valor), where(campo, '<=', valor +'\uf8ff')));

    var response = []

    querySnapshot.forEach( async (doc) => {
        
        response.push({
            id: doc.id,
            data: new Date(parseInt(doc.data().data)).toLocaleString('pt-BR', options),
            info: doc.data().info,
            usuario: doc.data().usuario
        });
        
    });

    return response
}

const setLog = async (data) => {
    var identificador
    if(data.id){
        await setDoc(doc(db, "log" , data.id), data);
        identificador = data.id
    }else{
        const docRef = await addDoc(logRef, data);
        identificador = docRef
    }

    await addDoc(logRef, data);

    return { msg: "pronto", id: identificador}
    
}


const deleteLog = async (id) => {
    await deleteDoc(doc(db, "log" , id));

    return { msg: "pronto"}
}

export { getLogbyWhere, getLogs, getLogsbyOrder, setLog, deleteLog, getLogById,getRecentLogs }