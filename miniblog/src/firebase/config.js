import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDW3c69XpFZm8wfczDRbQYwNN_x0Cc7DxQ",
  authDomain: "miniblog-cb4f1.firebaseapp.com",
  projectId: "miniblog-cb4f1",
  storageBucket: "miniblog-cb4f1.appspot.com",
  messagingSenderId: "460090833378",
  appId: "1:460090833378:web:f406849e58d8c3883c21bb"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};