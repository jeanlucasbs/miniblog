import {useState, useEffect} from 'react';
import {db} from '../firebase/firestore'
import {
    collection, //definir a coleçã
    query, // realizar um sql para pegar o dado
    orderBy, //ordenar os posts
    onSnapshot,
    where, //fazer um filtro
} from "firebase/firestore"

export const useFetchDocuments = (docCollection, search = null, uid= null) => {
    const [ documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setloading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
  
    useEffect(() => {
        async function loadData(){
            if(cancelled) return;

            setloading(true);

            const collectionRef = await collection(db, docCollection)
        }
    },[docCollection, search, uid, cancelled])
}