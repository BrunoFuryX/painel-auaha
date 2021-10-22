import app from "./firebase"
import { getFirestore, collection, deleteDoc , getDoc, getDocs, setDoc, addDoc , doc, query, orderBy } from "firebase/firestore"

const db = getFirestore(app)
const temasRef = collection(db, "theme")

const getTemasbyId = async (id) => {
    const querySnapshot = await getDoc(doc(temasRef, id));

    let response
    
    if (querySnapshot.exists()) {
        response = querySnapshot.data();
    } else {
        console.log("No such document!");
    }

    return response
}


const getTemasbyName = async () => {
    const querySnapshot = await getDocs(query(temasRef, orderBy("nome")));

    var response = []

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        response.push(
            doc.data()
        );
    });

    return response
}

const getTemasbyPrice = async () => {
    const querySnapshot = await getDocs(query(temasRef, orderBy("precoVista")));

    var response = []

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        response.push(doc.data());
    });

    return response
}


const setTema = async (data) => {
    var identificador
    if(data.id){
        await setDoc(doc(db, "theme" , data.id), data);
        identificador = data.id
    }else{
        const docRef = await addDoc(temasRef, data);
        identificador = docRef
    }

    return { msg: "pronto", id: identificador}
    
}


const deleteTema = async (id) => {
    await deleteDoc(doc(db, "theme" , id));

    return { msg: "pronto"}
}

export { getTemasbyId, getTemasbyName, getTemasbyPrice, setTema, deleteTema }