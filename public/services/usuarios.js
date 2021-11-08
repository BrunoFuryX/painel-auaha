import app from "./firebase"
import { getFirestore, collection, deleteDoc , getDoc, getDocs, setDoc, addDoc , doc, query, orderBy, where, limit } from "firebase/firestore"
import { getStorebyId, getStoresbyOrder, setStore, deleteStore, getStoresbyWhere, getStores } from '/public/services/lojas';

const db = getFirestore(app)

const usersRef = collection(db, "user")


const storesRef = collection(db, "store")

const getUserbyId = async (id) => {
    const querySnapshot = await getDoc(doc(usersRef, id));

    let response
    
    if (querySnapshot.exists()) {
        response = querySnapshot.data();
    } else {
        console.log("No such document!");
    }

    return response
}

const getUsers = async (lojaUser) => {
    var querySnapshot
    if(lojaUser){
        querySnapshot = await getDocs(query(usersRef, where("store", "==", lojaUser)))
    }else{
        querySnapshot = await getDocs(usersRef)
    }
      

    var response = []

    querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots

        const resposta = await getStorebyId(doc.data().store != "" ? doc.data().store : "Auaha")

        if(resposta){
            var loja = resposta.StoreName
            response.push({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                lvl: doc.data().lvl,
                store: loja
            });
        }else{
            var loja = "Auaha"

            response.push({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                lvl: doc.data().lvl,
                store: loja
            });
        }

    })

    return response
}

const getUsersbyOrder = async (order) => {


    var querySnapshot
    if(lojaUser){
        querySnapshot = await getDocs(query(usersRef, where("store", "==", lojaUser), orderBy(order)))
    }else{
        querySnapshot = await getDocs(query(usersRef), orderBy(order));
    }
      
    var response = []

    querySnapshot.forEach( async(doc) => {
        const resposta = await getStorebyId(doc.data().store != "" ? doc.data().store : "Auaha")

        if(resposta){
            var loja = resposta.StoreName
            response.push({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                lvl: doc.data().lvl,
                store: loja
            });
        }else{
            var loja = "Auaha"

            response.push({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                lvl: doc.data().lvl,
                store: loja
            });
        }
    });

    return response
}
const getRecentUsers = async ( lojaUser) => {
    var querySnapshot = await getDocs(query(usersRef, where("store", "==", lojaUser), limit(4)))

    var response = []

    querySnapshot.forEach( (doc) => {
        response.push({
            id: doc.id,
            info: doc.data().name,
        });
        
    });

    return response
}

const getUsersbyWhere = async (campo, valor, lojaUser) => {
    var querySnapshot
    if(lojaUser){
        querySnapshot = await getDocs(query(usersRef, where("store", "==", lojaUser), where(campo, '>=', valor), where(campo, '<=', valor +'\uf8ff')))
    }else{
        querySnapshot = await getDocs(query(usersRef, where(campo, '>=', valor), where(campo, '<=', valor +'\uf8ff')));
    }

    var response = []

    querySnapshot.forEach( async (doc) => {
        const resposta = await getStorebyId(doc.data().store != "" ? doc.data().store : "Auaha")

        if(resposta){
            var loja = resposta.StoreName
            response.push({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                lvl: doc.data().lvl,
                store: loja
            });
        }else{
            var loja = "Auaha"

            response.push({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                lvl: doc.data().lvl,
                store: loja
            });
        }
    });

    return response
}

const setUser = async (data) => {
    var identificador
    if(data.id){
        await setDoc(doc(db, "user" , data.id), data);
        identificador = data.id
    }else{
        const docRef = await addDoc(usersRef, data);
        identificador = docRef
    }


    return { msg: "pronto", id: identificador}
    
}


const deleteUser = async (id) => {
    await deleteDoc(doc(db, "user" , id));

    return { msg: "pronto"}
}

export { getUserbyId, getUsersbyOrder, setUser, deleteUser, getUsersbyWhere, getUsers, getRecentUsers }