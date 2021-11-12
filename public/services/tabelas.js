import app from "./firebase"
import { getFirestore, collection, deleteDoc , getDoc, getDocs, setDoc, addDoc , doc, query, orderBy, where, limit } from "firebase/firestore"
import { getStorebyId, getStoresbyOrder, setStore, deleteStore, getStoresbyWhere, getStores } from '/public/services/lojas';

const db = getFirestore(app)

const tablesRef = collection(db, "table")


const storesRef = collection(db, "store")

const getTablebyId = async (id) => {
    const querySnapshot = await getDoc(doc(tablesRef, id));

    let response
    
    if (querySnapshot.exists()) {
        response = querySnapshot.data();
    } else {
    }

    return response
}

const getTables = async (lojaUser) => {
    var querySnapshot
    if(lojaUser){
        querySnapshot = await getDocs(query(tablesRef, where("store", "==", lojaUser)))
    }else{
        querySnapshot = await getDocs(tablesRef)
    }
      

    var response = []

    querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots

        const resposta = await getStorebyId(doc.data().store != "" ? doc.data().store : "Auaha")

        if(resposta){
            var loja = resposta.StoreName
            response.push({
                id: doc.id,
                tabela: doc.data().tabela,
                title: doc.data().title,
                productId: doc.data().productId,
                store: loja
            });
        }else{
            var loja = "Auaha"

            response.push({
                id: doc.id,
                tabela: doc.data().tabela,
                title: doc.data().title,
                productId: doc.data().productId,
                store: loja
            });
        }

    })

    return response
}

const getTablesbyOrder = async (order) => {


    var querySnapshot
    if(lojaUser){
        querySnapshot = await getDocs(query(tablesRef, where("store", "==", lojaUser), orderBy(order)))
    }else{
        querySnapshot = await getDocs(query(tablesRef), orderBy(order));
    }
      
    var response = []

    querySnapshot.forEach( async(doc) => {
        const resposta = await getStorebyId(doc.data().store != "" ? doc.data().store : "Auaha")

        if(resposta){
            var loja = resposta.StoreName
            response.push({
                id: doc.id,
                tabela: doc.data().tabela,
                productId: doc.data().productId,
                store: loja
            });
        }else{
            var loja = "Auaha"

            response.push({
                id: doc.id,
                tabela: doc.data().tabela,
                title: doc.data().title,
                productId: doc.data().productId,
                store: loja
            });
        }
    });

    return response
}
const getRecentTables = async ( lojaUser) => {
    var querySnapshot = await getDocs(query(tablesRef, where("store", "==", lojaUser), limit(4)))

    var response = []

    querySnapshot.forEach( (doc) => {
        response.push({
            id: doc.id,
            info: doc.data().name,
        });
        
    });

    return response
}

const getTablesbyWhere = async (campo, valor, lojaUser) => {
    var querySnapshot
    if(lojaUser){
        querySnapshot = await getDocs(query(tablesRef, where("store", "==", lojaUser), where(campo, '>=', valor), where(campo, '<=', valor +'\uf8ff')))
    }else{
        querySnapshot = await getDocs(query(tablesRef, where(campo, '>=', valor), where(campo, '<=', valor +'\uf8ff')));
    }

    var response = []

    querySnapshot.forEach( async (doc) => {
        const resposta = await getStorebyId(doc.data().store != "" ? doc.data().store : "Auaha")

        if(resposta){
            var loja = resposta.StoreName
            response.push({
                id: doc.id,
                tabela: doc.data().tabela,
                title: doc.data().title,
                productId: doc.data().productId,
                store: loja
            });
        }else{
            var loja = "Auaha"

            response.push({
                id: doc.id,
                tabela: doc.data().tabela,
                title: doc.data().title,
                productId: doc.data().productId,
                store: loja
            });
        }
    });

    return response
}

const setTable = async (data) => {
    var identificador
    if(data.id && data.id!= ""){
        await setDoc(doc(db, "table" , data.id), data);
        identificador = data.id
    }else{
        const docRef = await addDoc(tablesRef, data);
        identificador = docRef
    }


    return { msg: "pronto", id: identificador}
    
}


const deleteTable = async (id) => {
    await deleteDoc(doc(db, "table" , id));

    return { msg: "pronto"}
}

export { getTablebyId, getTablesbyOrder, setTable, deleteTable, getTablesbyWhere, getTables, getRecentTables }