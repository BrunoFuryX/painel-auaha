import app from "./firebase"
import { getFirestore, collection, deleteDoc , getDoc, getDocs, setDoc, addDoc , doc, query, orderBy, where, limit } from "firebase/firestore"

const db = getFirestore(app)
const usersRef = collection(db, "user")
const storesRef = collection(db, "store")

const Login = async (email, senha) => {
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let response = {logged: false, user: {}, store:{}, msg: "E-mail ou senha incorretos!"}
    
    querySnapshot.forEach((document) => {
        if(document.data().email == email && document.data().password == senha){
            response.logged = true
            response.store = {}
            response.user = {
                email: document.data().email,
                lvl: document.data().lvl,
                name: document.data().name,
                store: document.data().store,
                foto: document.data().foto ? document.data().foto : false
            }
            response.msg = false 
        }
    });


    if(response.user.store != "" && response.user.store){
        const docRef = doc(storesRef, response.user.store);
        var docSnap = await getDoc(docRef);
        console.log(docSnap)
        if (docSnap.exists()) {
            response.store = docSnap.data();
        } else {
            // doc.data() will be undefined in this case
        }
        
    }

    return response
}

export { Login }