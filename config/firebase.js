// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp9JRI7knpvb2tcp7Ia9VK8xhW9WFv-cU",
  authDomain: "expenses-c0ebf.firebaseapp.com",
  projectId: "expenses-c0ebf",
  storageBucket: "expenses-c0ebf.appspot.com",
  messagingSenderId: "624009508388",
  appId: "1:624009508388:web:5553fb73bc2e840c804ab1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, "trips");
export const expensesRef = collection(db, "expenses");

export default app;
