import app from "./firebase"
import { getFirestore, collection, deleteDoc , getDoc, getDocs, setDoc, addDoc , doc, query, orderBy, where, limit } from "firebase/firestore"
import { getStorebyId, getStoresbyOrder, setStore, deleteStore, getStoresbyWhere, getStores } from '/public/services/lojas';

const db = getFirestore(app)

const logRef = collection(db, "log")

const caseRef = collection(db, "case")

const getCasebyId = async (id) => {
    const querySnapshot = await getDoc(doc(caseRef, id));

    let response
    
    if (querySnapshot.exists()) {
        response = querySnapshot.data();
    } else {
        console.log("No such document!");
    }

    return response
}

const getCases = async () => {
    const querySnapshot = await getDocs(caseRef)

    var response = []

    querySnapshot.forEach( async (doc) => {
        const resposta = await getStorebyId(doc.data().loja != "" ? doc.data().loja : "Auaha")

        if(resposta){
            var loja = resposta.StoreName
            response.push({
                id: doc.id,
                productId: doc.data().productId,
                image1: doc.data().image1,
                image2: doc.data().image2,
                loja: loja
            });
        }else{
            var loja = "Auaha"

            response.push({
                id: doc.id,
                productId: doc.data().productId,
                image1: doc.data().image1,
                image2: doc.data().image2,
                loja: loja
            });
        }
    });

    return response
}

const getCasesbyOrder = async (order) => {
    const querySnapshot = await getDocs(query(caseRef, orderBy(order)));

    var response = []

    querySnapshot.forEach( async (doc) => {
        const resposta = await getStorebyId(doc.data().loja != "" ? doc.data().loja : "Auaha")

        if(resposta){
            var loja = resposta.StoreName
            response.push({
                id: doc.id,
                productId: doc.data().name,
                image1: doc.data().email,
                image2: doc.data().lvl,
                loja: loja
            });
        }else{
            var loja = "Auaha"

            response.push({
                id: doc.id,
                productId: doc.data().name,
                image1: doc.data().email,
                image2: doc.data().lvl,
                loja: loja
            });
        }
    });

    return response
}

const getCasebyWhere = async (campo, valor) => {
    const querySnapshot = await getDocs(query(caseRef, where(campo, '>=', valor), where(campo, '<=', valor +'\uf8ff')));

    var response = []

    querySnapshot.forEach( async (doc) => {
        const resposta = await getStorebyId(doc.data().loja != "" ? doc.data().loja : "Auaha")

        if(resposta){
            var loja = resposta.StoreName
            response.push({
                id: doc.id,
                productId: doc.data().productId,
                image1: doc.data().image1,
                image2: doc.data().image2,
                loja: loja
            });
        }else{
            var loja = "Auaha"

            response.push({
                id: doc.id,
                productId: doc.data().productId,
                image1: doc.data().image1,
                image2: doc.data().image2,
                loja: loja
            });
        }
    });

    return response
}

const setCase = async (data) => {
    var identificador
    if(data.id){
        await setDoc(doc(db, "case" , data.id), data);
        identificador = data.id
    }else{
        const docRef = await addDoc(caseRef, data);
        identificador = docRef
    }

    await addDoc(logRef, data);

    return { msg: "pronto", id: identificador}
    
}


const deleteCase = async (id) => {
    await deleteDoc(doc(db, "case" , id));

    return { msg: "pronto"}
}

export { setCase, getCasebyWhere , deleteCase, getCasebyId, getCases, getCasesbyOrder }