import app from "./firebase"
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"

const db = getFirestore(app)
const usersRef = collection(db, "user")
const storesRef = collection(db, "store")


const Login = async (email, senha) => {
    // const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(usersRef);

    let response = {logged: false, user: {}, msg: "E-mail ou senha incorretos!"}
    
    querySnapshot.forEach((doc) => {
        if(doc.data().email == email && doc.data().password == senha){
            response.logged = true
            response.store = {}
            response.user = {
                email: doc.data().email,
                lvl: doc.data().lvl,
                name: doc.data().name,
                store: doc.data().store,
                foto: doc.data().foto ? doc.data().foto : false
            }
            response.msg = false 
            if(doc.data().store != "" && doc.data().store){
                const docRef = doc(db, "store", doc.data().store);
                getDoc(docRef).then((response) =>{
                    if (response.exists()) {
                        response.store = docSnap.data();
                    } else {
                        // doc.data() will be undefined in this case
                    }
                });
                
            }
        }
    });

    return response
}

export { Login }