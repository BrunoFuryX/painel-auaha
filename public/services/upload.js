import app from "./firebase"
import { getFirestore, collection, deleteDoc , getDoc, getDocs, setDoc, addDoc , doc, query, orderBy, limit } from "firebase/firestore"
import {  getStorage } from "firebase/storage"

const db = getFirestore(app)
const storage = getStorage(app);

const uploadImage = async (id) => {
    
}

export {  }