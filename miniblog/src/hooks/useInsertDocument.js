import {useState, useEffect, useReducer} from 'react';
import {db} from '../firebase/config';
/*Cada lugar que salvamos um dado no firebase é chamada de collection
AddDoc faz o insert do documento no banco
Timestamp marca o horario que foi criado*/
import {collection, addDoc, Timestamp} from 'firebase/firestore';

const initialState = {
    loading: null,
    error: null
};

const insertReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading: true, erro:null};
        case "INSERTED_DOC":
            return {loading: false, erro:null};
        case "ERROR":
            return {loading: false, erro: action.payload};
        default:
            return state;
    }
};

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState);
  
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
  
    const checkCancelBeforeDispatch = (action) => {
      if (!cancelled) {
        dispatch(action);
      }
    };
  
    const insertDocument = async (document) => {
      checkCancelBeforeDispatch({ type: "LOADING" });
  
      try {
        const newDocument = { ...document, createdAt: Timestamp.now() };
  
        const insertedDocument = await addDoc(
          collection(db, docCollection),
          newDocument
        );
  
        checkCancelBeforeDispatch({
          type: "INSERTED_DOC",
          payload: insertedDocument,
        });
      } catch (error) {
        checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
      }
    };
  
    useEffect(() => {
      return () => setCancelled(true);
    }, []);
  
    return { insertDocument, response };
  };