import app from "./firebase"
import { getFirestore, collection, deleteDoc , getDoc, getDocs, setDoc, addDoc , doc, query, orderBy, limit } from "firebase/firestore"

const db = getFirestore(app)

const storesRef = collection(db, "store")

const getStorebyId = async (id) => {
    const querySnapshot = await getDoc(doc(storesRef, id));

    let response
    
    if (querySnapshot.exists()) {
        response = {  ...querySnapshot.data()};
    } else {
        response = {StoreName: "Auaha" }
    }


    return response
}

const getStores = async (order) => {
    const querySnapshot = await getDocs(storesRef)

    var response = []

    querySnapshot.forEach((doc) => {
        let objectAdicional = {  ...doc.data(), ...{id: doc.id}  }
        response.push(objectAdicional);
    });


    return response
}

const getStoresbyOrder = async (order) => {
    const querySnapshot = await getDocs(query(storesRef, orderBy(order)));

    var response = []

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        response.push(
            doc.data()
        );
    });

    return response
}

const getStoresbyWhere = async (campo, valor) => {
    const querySnapshot = await getDocs(query(storesRef, where(campo, valor)));

    var response = []

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        response.push(
            doc.data()
        );
    });

    return response
}

const getRecentStores = async ( valor) => {
    const querySnapshot = await getDocs(query(storesRef, limit(4)));
    var response = []

    querySnapshot.forEach( (doc) => {
        response.push({
            id: doc.id,
            info: doc.data().StoreName,
        });
        
    });

    return response
}

const setStore = async (data) => {
    var identificador
    if(data.id){
        var aa = await setDoc(doc(db, "store" , data.id), data);
        identificador = data.id
    }else{
        const docRef = await addDoc(storesRef, data);
        identificador = docRef
    }


    return { msg: "pronto", id: identificador}
    
}


const deleteStore = async (id) => {
    await deleteDoc(doc(db, "Store" , id));

    return { msg: "pronto"}
}

export { getStorebyId, getStoresbyOrder, setStore, deleteStore, getStoresbyWhere, getStores, getRecentStores }